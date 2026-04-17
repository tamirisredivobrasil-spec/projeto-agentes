const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const RUN_DIR = __dirname;
const DEFAULT_PLAN = path.join(RUN_DIR, 'plano_posts_instagram.json');
const DEFAULT_PROFILE = path.resolve(RUN_DIR, '..', '..', '..', '..', '..', '_opensquad', '_browser_profile');
const DEFAULT_HISTORY = path.join(RUN_DIR, 'historico_publicacoes_instagram.json');

function log(message) {
  console.log(`[PUBLISHER] ${message}`);
}

function assertFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo nao encontrado: ${filePath}`);
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function todayLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function nowIso() {
  return new Date().toISOString();
}

function loadPlan(planPath) {
  assertFile(planPath);
  const data = readJson(planPath);

  if (!Array.isArray(data.posts) || data.posts.length === 0) {
    throw new Error('plano_posts_instagram.json precisa ter ao menos um post em "posts".');
  }

  data.posts.forEach((post, index) => {
    if (!Array.isArray(post.images) || post.images.length === 0) {
      throw new Error(`Post ${index + 1} sem imagens.`);
    }
    post.images.forEach(assertFile);
    if (!post.caption || typeof post.caption !== 'string') {
      throw new Error(`Post ${index + 1} sem caption.`);
    }
    if (!post.id || typeof post.id !== 'string') {
      throw new Error(`Post ${index + 1} sem "id".`);
    }
    if (!post.status) {
      post.status = 'pending';
    }
  });

  return data;
}

function selectNextPost(plan, options) {
  if (Number.isInteger(options.onlyIndex)) {
    return plan.posts[options.onlyIndex] || null;
  }

  const today = todayLocalDate();

  return plan.posts.find((post) => {
    if (post.status !== 'pending') {
      return false;
    }

    if (!post.publish_on) {
      return true;
    }

    return post.publish_on <= today;
  }) || null;
}

function markPostAsPosted(plan, postId) {
  const post = plan.posts.find((item) => item.id === postId);
  if (!post) {
    throw new Error(`Post nao encontrado para marcar como publicado: ${postId}`);
  }

  post.status = 'posted';
  post.posted_at = nowIso();
}

function appendHistory(historyPath, post, mode) {
  const history = fs.existsSync(historyPath)
    ? readJson(historyPath)
    : { events: [] };

  history.events.unshift({
    id: post.id,
    title: post.title || '',
    posted_at: nowIso(),
    mode,
    images: post.images
  });

  writeJson(historyPath, history);
}

async function waitForAny(page, selectors, timeout = 15000) {
  for (const selector of selectors) {
    try {
      await page.locator(selector).first().waitFor({ timeout });
      return selector;
    } catch (_) {
      // tenta o proximo
    }
  }
  throw new Error(`Nenhum seletor encontrado: ${selectors.join(' | ')}`);
}

async function clickAny(page, selectors, timeout = 15000) {
  const selector = await waitForAny(page, selectors, timeout);
  await page.locator(selector).first().click();
  return selector;
}

async function fillCaption(page, caption) {
  const selectors = [
    'textarea[aria-label*="legenda"]',
    'textarea[aria-label*="caption"]',
    'div[aria-label*="Escreva uma legenda"]',
    'div[aria-label*="Write a caption"]',
    'textarea[placeholder*="legenda"]',
    'textarea[placeholder*="caption"]'
  ];

  const selector = await waitForAny(page, selectors, 20000);
  const locator = page.locator(selector).first();

  if (selector.startsWith('div[')) {
    await locator.click();
    await locator.fill(caption);
  } else {
    await locator.fill(caption);
  }
}

async function ensureLoggedIn(page) {
  await page.goto('https://www.instagram.com/', { waitUntil: 'domcontentloaded' });

  const loginHints = [
    'input[name="username"]',
    'input[name="password"]',
    'text=Entrar',
    'text=Log in'
  ];

  for (const hint of loginHints) {
    if (await page.locator(hint).first().isVisible().catch(() => false)) {
      throw new Error(
        'A conta do Instagram nao parece estar logada no perfil do navegador do Opensquad. ' +
        'Abra o perfil em _opensquad/_browser_profile e faca login uma vez antes de rodar a publicacao automatica.'
      );
    }
  }
}

async function publishPost(page, post, options) {
  log(`Abrindo compositor para "${post.title || post.day || 'post'}"...`);

  await clickAny(page, [
    'svg[aria-label="Nova publicacao"]',
    'svg[aria-label="Nova publica\\u00e7\\u00e3o"]',
    'svg[aria-label="New post"]',
    'text=Nova publicacao',
    'text=Nova publica\\u00e7\\u00e3o',
    'text=Create',
    'text=Criar'
  ], 20000);

  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(post.images);

  if (post.images.length > 1) {
    await page.waitForTimeout(3000);
  }

  await clickAny(page, ['text=Avancar', 'text=Avan\\u00e7ar', 'text=Next'], 20000);
  await page.waitForTimeout(1500);

  const secondAdvanceVisible = await page.locator('text=Avancar').first().isVisible().catch(() => false)
    || await page.locator('text=Avan\\u00e7ar').first().isVisible().catch(() => false)
    || await page.locator('text=Next').first().isVisible().catch(() => false);

  if (secondAdvanceVisible) {
    await clickAny(page, ['text=Avancar', 'text=Avan\\u00e7ar', 'text=Next'], 10000);
  }

  await fillCaption(page, post.caption);
  await page.waitForTimeout(1200);

  if (post.location) {
    log(`Geotag solicitada para ${post.location}, mas continua opcional/manual para evitar fragilidade.`);
  }

  if (options.dryRun) {
    log(`Dry-run: caption preenchida para "${post.title || post.day}". Nenhuma postagem foi enviada.`);
    return;
  }

  await clickAny(page, ['text=Compartilhar', 'text=Share'], 20000);
  log(`Post enviado: "${post.title || post.day || 'post'}".`);
  await page.waitForTimeout(8000);
}

async function main() {
  const planPath = process.env.IG_PLAN_PATH || DEFAULT_PLAN;
  const profileDir = process.env.IG_PROFILE_DIR || DEFAULT_PROFILE;
  const historyPath = process.env.IG_HISTORY_PATH || DEFAULT_HISTORY;
  const dryRun = process.env.IG_DRY_RUN !== 'false';
  const onlyIndex = process.env.IG_POST_INDEX ? Number(process.env.IG_POST_INDEX) : null;

  if (!fs.existsSync(planPath)) {
    log(`Plano nao encontrado em ${planPath}. Nada a publicar.`);
    return;
  }

  const plan = loadPlan(planPath);
  const post = selectNextPost(plan, { onlyIndex });

  if (!post) {
    log('Nenhum post pendente para hoje. Nada a publicar.');
    return;
  }

  log(`Usando plano: ${planPath}`);
  log(`Usando perfil do navegador: ${profileDir}`);
  log(`Modo atual: ${dryRun ? 'dry-run (preenche tudo, mas nao compartilha)' : 'publicacao real'}`);
  log(`Post selecionado: ${post.id} - ${post.title || post.day || 'sem titulo'}`);

  const context = await chromium.launchPersistentContext(profileDir, {
    headless: false,
    viewport: { width: 1440, height: 960 }
  });

  const page = context.pages()[0] || await context.newPage();

  try {
    await ensureLoggedIn(page);
    await publishPost(page, post, { dryRun });

    if (!dryRun) {
      markPostAsPosted(plan, post.id);
      writeJson(planPath, plan);
      appendHistory(historyPath, post, 'live');
    } else {
      appendHistory(historyPath, post, 'dry-run');
    }

    log('Fluxo concluido.');
  } finally {
    await context.close();
  }
}

main().catch((error) => {
  console.error(`[PUBLISHER] ERRO: ${error.message}`);
  process.exit(1);
});
