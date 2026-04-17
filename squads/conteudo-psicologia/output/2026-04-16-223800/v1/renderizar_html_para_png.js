const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const htmlPath = process.argv[2];
const outDir = process.argv[3] || path.join(process.cwd(), 'exports_png');

if (!htmlPath) {
  console.error('Uso: node renderizar_html_para_png.js <arquivo.html> [pasta_saida]');
  process.exit(1);
}

const absoluteHtml = path.resolve(htmlPath);
const absoluteOutDir = path.resolve(outDir);

if (!fs.existsSync(absoluteHtml)) {
  console.error(`HTML nao encontrado: ${absoluteHtml}`);
  process.exit(1);
}

fs.mkdirSync(absoluteOutDir, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });

  await page.goto(`file:///${absoluteHtml.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });

  const slideIds = await page.locator('[id^="slide-d"], [id^="slide-"]').evaluateAll((nodes) =>
    nodes.map((node) => node.id)
  );

  if (!slideIds.length) {
    throw new Error('Nenhum slide encontrado no HTML.');
  }

  for (const id of slideIds) {
    const locator = page.locator(`#${id}`);
    await locator.evaluate((el) => {
      el.style.transform = 'none';
      el.style.marginBottom = '0';
      el.style.marginRight = '0';
    });

    const output = path.join(absoluteOutDir, `${id}.png`);
    await locator.screenshot({ path: output });

    await locator.evaluate((el) => {
      el.style.transform = '';
      el.style.marginBottom = '';
      el.style.marginRight = '';
    });
  }

  await browser.close();
  console.log(`Exportacao concluida em: ${absoluteOutDir}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
