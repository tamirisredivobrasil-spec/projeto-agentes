#!/usr/bin/env node
/**
 * Gerador de Posts Instagram - @psitamiris.redivo
 * Cria carrosséis em HTML com design elegante baseado no JSON de conteúdo
 */

const fs = require('fs');
const path = require('path');

// Carregar dados dos posts
const jsonPath = 'C:\\Users\\tamir\\projeto agentes\\squads\\conteudo-psicologia\\output\\2026-04-17-160920\\v1\\plano_posts_instagram.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// Mapping de imagens por dia para garantir variedade (sem repetições)
const FOTO_MAPPING = {
    'dia-11': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-13': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-14': 'https://images.unsplash.com/photo-1516528215080-20f2c827c869?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-16': 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-18': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-19': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-21': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-23': 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-24': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-26': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-28': 'https://images.unsplash.com/photo-1516528215080-20f2c827c869?auto=format&fit=crop&w=1080&h=1440&q=80',
    'dia-30': 'https://images.unsplash.com/photo-1551632786-8e9e3bcc0eab?auto=format&fit=crop&w=1080&h=1440&q=80',
};

const CSS_COMMON = `
        .slide {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 72px;
            position: relative;
            z-index: 1;
        }
        
        .content {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            max-width: 936px;
        }
        
        .kicker {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            margin-bottom: 48px;
            line-height: 1.2;
        }
        
        .title {
            font-family: 'Playfair Display', serif;
            font-size: 58px;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 32px;
        }
        
        .subtitle {
            font-family: 'Inter', sans-serif;
            font-size: 34px;
            font-weight: 400;
            line-height: 1.4;
            margin-bottom: 48px;
        }
        
        .text-block {
            font-family: 'Inter', sans-serif;
            font-size: 34px;
            font-weight: 500;
            line-height: 1.6;
            margin-bottom: 32px;
        }
        
        .hl {
            font-weight: 700;
            color: #D4A5A5;
        }
        
        .logo {
            position: absolute;
            bottom: 36px;
            right: 36px;
            z-index: 4;
            font-size: 20px;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            letter-spacing: 1px;
        }
        
        .background-image {
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            z-index: 1;
        }
        
        .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
        }
        
        .slide.photo-quote .content {
            position: relative;
            z-index: 3;
        }
        
        .slide.dark {
            background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
        }
        
        .slide.dark .kicker {
            font-size: 43px;
            color: #8B7355;
        }
        
        .slide.dark .text-block {
            color: #FFFFFF;
        }
        
        .slide.dark .logo {
            color: #D4A5A5;
        }
        
        .slide.light {
            background: linear-gradient(135deg, #F5EFE7 0%, #FAF7F2 100%);
        }
        
        .slide.light .kicker {
            font-size: 43px;
            color: #8B7355;
        }
        
        .slide.light .text-block {
            color: #1A1A2E;
        }
        
        .slide.light .logo {
            color: #8B7355;
        }
        
        .slide.paper {
            background: linear-gradient(135deg, #F5EFE7 0%, #FAF7F2 100%);
        }
        
        .slide.paper .kicker {
            font-size: 43px;
            color: #8B7355;
        }
        
        .slide.paper .text-block {
            color: #1A1A2E;
        }
        
        .slide.paper .logo {
            color: #8B7355;
        }
        
        .slide.photo-quote {
            background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
        }
        
        .slide.photo-quote .overlay {
            background: rgba(26, 26, 46, 0.65);
        }
        
        .slide.photo-quote .title {
            color: #FFFFFF;
        }
        
        .slide.photo-quote .subtitle {
            color: #F5EFE7;
        }
        
        .slide.photo-quote .kicker {
            font-size: 20px;
            color: #D4A5A5;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .slide.photo-quote .logo {
            color: #D4A5A5;
        }
`;

function cleanText(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function createSlideHtml(slideData, slideNumber, postId, fotoUrl = null) {
    const cls = (slideData.cls || 'dark').toLowerCase();
    const kicker = slideData.kicker || '';
    const title = slideData.title || '';
    const texts = slideData.text || [];
    const bg = slideData.bg || fotoUrl;
    
    // Preparar HTML do texto
    let textHtml = '';
    if (title && (cls === 'photo quote' || cls === 'photo')) {
        textHtml += `<p class="subtitle">${title}</p>`;
    }
    
    texts.forEach(text => {
        if (text) {
            textHtml += `<p class="text-block">${text}</p>`;
        }
    });
    
    let slideContent = '';
    const classAttr = cls === 'photo quote' ? 'photo-quote' : cls;
    
    if (cls === 'photo quote' || cls === 'photo') {
        slideContent = `<div class="slide ${classAttr}">
            <div class="background-image" style="background-image: url('${bg || 'https://via.placeholder.com/1080x1440'}');"></div>
            <div class="overlay"></div>
            <div class="content">
                <div class="kicker">${kicker}</div>
                ${cls === 'photo quote' ? `<h1 class="title">${title}</h1>` : ''}
                ${textHtml}
            </div>
            <div class="logo">@psitamiris.redivo</div>
        </div>`;
    } else {
        slideContent = `<div class="slide ${classAttr}">
            <div class="content">
                <h2 class="kicker">${kicker}</h2>
                ${textHtml}
            </div>
            <div class="logo">@psitamiris.redivo</div>
        </div>`;
    }
    
    const fullHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${postId} - Slide ${slideNumber} - ${title || kicker}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            width: 1080px;
            height: 1440px;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
        }
        
        ${CSS_COMMON}
    </style>
</head>
<body>
    ${slideContent}
</body>
</html>`;
    
    return fullHtml;
}

function generateAllPosts(outputDir) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    let totalSlides = 0;
    
    data.posts.forEach(post => {
        const postId = post.id;
        const copyList = post.copy || [];
        const fotoUrl = FOTO_MAPPING[postId];
        
        copyList.forEach((slideData, index) => {
            const slideNum = index + 1;
            const htmlContent = createSlideHtml(slideData, slideNum, postId, fotoUrl);
            
            const filename = `${postId}_slide-${String(slideNum).padStart(2, '0')}.html`;
            const filepath = path.join(outputDir, filename);
            
            fs.writeFileSync(filepath, htmlContent, 'utf-8');
            
            console.log(`✓ ${filename}`);
            totalSlides++;
        });
    });
    
    console.log(`\n✅ Total de ${totalSlides} slides criados em: ${outputDir}`);
}

// Executar
const outputDir = 'C:\\Users\\tamir\\projeto agentes\\squads\\conteudo-psicologia\\output\\posts_instagram';
generateAllPosts(outputDir);
