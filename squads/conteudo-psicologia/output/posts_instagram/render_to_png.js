#!/usr/bin/env node
/**
 * Renderizador de Posts Instagram
 * Converte HTML em PNG usando Playwright
 */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const outputDir = 'C:\\Users\\tamir\\projeto agentes\\squads\\conteudo-psicologia\\output\\posts_instagram';
const imagesDir = path.join(outputDir, 'images');

// Criar diretório de imagens
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

async function renderHtmlToPng(htmlFile, outputFile) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Setar viewport para Instagram carousel
    await page.setViewportSize({ width: 1080, height: 1440 });
    
    // Carregar HTML local
    const htmlPath = `file://${htmlFile.replace(/\\/g, '/')}`;
    await page.goto(htmlPath);
    
    // Aguardar um pouco para carregar fontes
    await page.waitForTimeout(1000);
    
    // Tirar screenshot
    await page.screenshot({ path: outputFile, fullPage: false });
    
    await browser.close();
    console.log(`✓ ${path.basename(outputFile)}`);
}

async function renderAllSlides() {
    const htmlFiles = fs.readdirSync(outputDir)
        .filter(f => f.endsWith('.html') && f.startsWith('dia-'))
        .sort();
    
    console.log(`🎨 Renderizando ${htmlFiles.length} slides...\n`);
    
    for (const htmlFile of htmlFiles) {
        const htmlPath = path.join(outputDir, htmlFile);
        const pngFile = htmlFile.replace('.html', '.png');
        const pngPath = path.join(imagesDir, pngFile);
        
        try {
            await renderHtmlToPng(htmlPath, pngPath);
        } catch (error) {
            console.error(`✗ Erro ao renderizar ${htmlFile}:`, error.message);
        }
    }
    
    console.log(`\n✅ Renderização concluída! Imagens em: ${imagesDir}`);
}

renderAllSlides().catch(console.error);
