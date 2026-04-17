#!/usr/bin/env node
/**
 * Renderizador Otimizado - Reutiliza Browser
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outputDir = 'C:\\Users\\tamir\\projeto agentes\\squads\\conteudo-psicologia\\output\\posts_instagram';
const imagesDir = path.join(outputDir, 'images');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

async function renderAllSlides() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Setar viewport uma única vez
    await page.setViewportSize({ width: 1080, height: 1440 });
    
    const htmlFiles = fs.readdirSync(outputDir)
        .filter(f => f.endsWith('.html') && f.startsWith('dia-'))
        .sort();
    
    console.log(`🎨 Renderizando ${htmlFiles.length} slides com browser único...\n`);
    
    let count = 0;
    for (const htmlFile of htmlFiles) {
        const htmlPath = path.join(outputDir, htmlFile);
        const pngFile = htmlFile.replace('.html', '.png');
        const pngPath = path.join(imagesDir, pngFile);
        
        try {
            const htmlUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
            await page.goto(htmlUrl, { waitUntil: 'networkidle' });
            await page.waitForTimeout(500); // Aguarda renderização de fontes
            await page.screenshot({ path: pngPath, fullPage: false });
            
            count++;
            if (count % 5 === 0) {
                process.stdout.write(`✓ ${count}/${htmlFiles.length}\n`);
            } else {
                process.stdout.write('.');
            }
        } catch (error) {
            console.error(`\n✗ Erro em ${htmlFile}:`, error.message);
        }
    }
    
    await browser.close();
    console.log(`\n\n✅ ${count}/${htmlFiles.length} slides renderizados!`);
    console.log(`📁 Imagens salvas em: ${imagesDir}`);
}

renderAllSlides().catch(console.error);
