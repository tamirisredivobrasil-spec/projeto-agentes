#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador de Posts Instagram - @psitamiris.redivo
Cria carrosséis em HTML com design elegante baseado no JSON de conteúdo
"""

import json
import os
from pathlib import Path
from datetime import datetime

# Carregar dados dos posts
with open('/mnt/c/Users/tamir/projeto agentes/squads/conteudo-psicologia/output/2026-04-17-160920/v1/plano_posts_instagram.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Mapping de imagens por dia para garantir variedade (sem repetições)
FOTO_MAPPING = {
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
}

BASE_HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;700&display=swap');
        
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            width: 1080px;
            height: 1440px;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
        }}
        
        {css_content}
    </style>
</head>
<body>
    {html_content}
</body>
</html>"""

SLIDE_PHOTO_QUOTE_TEMPLATE = """        <div class="slide photo-quote">
            <div class="background-image" style="background-image: url('{bg_image}');"></div>
            <div class="overlay"></div>
            <div class="content">
                <div class="kicker">{kicker}</div>
                <h1 class="title">{title}</h1>
                {text_html}
            </div>
            <div class="logo">@psitamiris.redivo</div>
        </div>"""

SLIDE_DARK_TEMPLATE = """        <div class="slide dark">
            <div class="content">
                <h2 class="kicker">{kicker}</h2>
                {text_html}
            </div>
            <div class="logo">@psitamiris.redivo</div>
        </div>"""

SLIDE_LIGHT_TEMPLATE = """        <div class="slide light">
            <div class="content">
                <h2 class="kicker">{kicker}</h2>
                {text_html}
            </div>
            <div class="logo">@psitamiris.redivo</div>
        </div>"""

SLIDE_PAPER_TEMPLATE = """        <div class="slide paper">
            <div class="content">
                <h2 class="kicker">{kicker}</h2>
                {text_html}
            </div>
            <div class="logo">@psitamiris.redivo</div>
        </div>"""

CSS_COMMON = """
        .slide {{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 72px;
            position: relative;
            z-index: 1;
        }}
        
        .content {{
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            max-width: 936px;
        }}
        
        .kicker {{
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            margin-bottom: 48px;
            line-height: 1.2;
        }}
        
        .title {{
            font-family: 'Playfair Display', serif;
            font-size: 58px;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 32px;
        }}
        
        .subtitle {{
            font-family: 'Inter', sans-serif;
            font-size: 34px;
            font-weight: 400;
            line-height: 1.4;
            margin-bottom: 48px;
        }}
        
        .text-block {{
            font-family: 'Inter', sans-serif;
            font-size: 34px;
            font-weight: 500;
            line-height: 1.6;
            margin-bottom: 32px;
        }}
        
        .hl {{
            font-weight: 700;
            color: #D4A5A5;
        }}
        
        .logo {{
            position: absolute;
            bottom: 36px;
            right: 36px;
            z-index: 4;
            font-size: 20px;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            letter-spacing: 1px;
        }}
        
        .background-image {{
            position: absolute;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            z-index: 1;
        }}
        
        .overlay {{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 2;
        }}
        
        .slide.photo-quote .content {{
            position: relative;
            z-index: 3;
        }}
        
        .slide.dark {{
            background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
        }}
        
        .slide.dark .kicker {{
            font-size: 43px;
            color: #8B7355;
        }}
        
        .slide.dark .text-block {{
            color: #FFFFFF;
        }}
        
        .slide.dark .logo {{
            color: #D4A5A5;
        }}
        
        .slide.light {{
            background: linear-gradient(135deg, #F5EFE7 0%, #FAF7F2 100%);
        }}
        
        .slide.light .kicker {{
            font-size: 43px;
            color: #8B7355;
        }}
        
        .slide.light .text-block {{
            color: #1A1A2E;
        }}
        
        .slide.light .logo {{
            color: #8B7355;
        }}
        
        .slide.paper {{
            background: linear-gradient(135deg, #F5EFE7 0%, #FAF7F2 100%);
        }}
        
        .slide.paper .kicker {{
            font-size: 43px;
            color: #8B7355;
        }}
        
        .slide.paper .text-block {{
            color: #1A1A2E;
        }}
        
        .slide.paper .logo {{
            color: #8B7355;
        }}
        
        .slide.photo-quote {{
            background: linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%);
        }}
        
        .slide.photo-quote .overlay {{
            background: rgba(26, 26, 46, 0.65);
        }}
        
        .slide.photo-quote .title {{
            color: #FFFFFF;
        }}
        
        .slide.photo-quote .subtitle {{
            color: #F5EFE7;
        }}
        
        .slide.photo-quote .kicker {{
            font-size: 20px;
            color: #D4A5A5;
            text-transform: uppercase;
            letter-spacing: 2px;
        }}
        
        .slide.photo-quote .logo {{
            color: #D4A5A5;
        }}
"""

def clean_text(text):
    """Remove HTML tags e limpa texto"""
    if not text:
        return ""
    text = text.replace('<span class="hl">', '<span class="hl">')
    text = text.replace('</span>', '</span>')
    return text

def create_slide_html(slide_data, slide_number, post_id, foto_url=None):
    """Cria HTML de um slide individual"""
    
    cls = slide_data.get('cls', 'dark').lower()
    kicker = slide_data.get('kicker', '')
    title = slide_data.get('title', '')
    texts = slide_data.get('text', [])
    bg = slide_data.get('bg', foto_url)
    
    # Preparar HTML do texto
    text_html = ""
    if title and cls == "photo quote":
        text_html = f'<p class="subtitle">{clean_text(title)}</p>'
    
    for text in texts:
        if text:
            text_html += f'<p class="text-block">{clean_text(text)}</p>'
    
    # Selecionar template apropriado
    if cls in ['photo quote', 'photo']:
        template = SLIDE_PHOTO_QUOTE_TEMPLATE
        slide_content = template.format(
            bg_image=bg or 'https://via.placeholder.com/1080x1440',
            kicker=kicker,
            title=title if cls == 'photo' else '',
            text_html=text_html
        )
    elif cls == 'dark':
        template = SLIDE_DARK_TEMPLATE
        slide_content = template.format(
            kicker=kicker,
            text_html=text_html
        )
    elif cls in ['light', 'paper']:
        template = SLIDE_LIGHT_TEMPLATE if cls == 'light' else SLIDE_PAPER_TEMPLATE
        slide_content = template.format(
            kicker=kicker,
            text_html=text_html
        )
    else:
        template = SLIDE_DARK_TEMPLATE
        slide_content = template.format(
            kicker=kicker,
            text_html=text_html
        )
    
    full_html = BASE_HTML_TEMPLATE.format(
        title=f"{post_id} - Slide {slide_number} - {title or kicker}",
        css_content=CSS_COMMON,
        html_content=slide_content
    )
    
    return full_html

def generate_all_posts(output_dir):
    """Gera todos os posts em HTML"""
    
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    total_slides = 0
    
    for post in data['posts']:
        post_id = post['id']
        titulo = post['titulo']
        copy_list = post['copy']
        formato = post['formato']
        
        foto_url = FOTO_MAPPING.get(post_id)
        
        # Gerar slides
        for slide_num, slide_data in enumerate(copy_list, 1):
            html_content = create_slide_html(slide_data, slide_num, post_id, foto_url)
            
            filename = f"{post_id}_slide-{slide_num:02d}.html"
            filepath = output_path / filename
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(html_content)
            
            total_slides += 1
            print(f"✓ {filename}")
    
    print(f"\n✅ Total de {total_slides} slides criados em: {output_dir}")

if __name__ == '__main__':
    output_dir = '/mnt/c/Users/tamir/projeto agentes/squads/conteudo-psicologia/output/posts_instagram'
    generate_all_posts(output_dir)
