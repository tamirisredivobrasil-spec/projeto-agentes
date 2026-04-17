# Design System - @psitamiris.redivo

## Visão Geral
Posts elegantes, minimalistas e aconchegantes para Instagram focados em psicologia clínica e bem-estar emocional.

---

## Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| **Navy Profundo** | #1A1A2E | Fundo principal em slides escuros |
| **Bege Acolhedor** | #F5EFE7 | Fundo em slides claros |
| **Branco** | #FFFFFF | Texto principal, fundo clean |
| **Chocolate** | #8B7355 | Acentos, títulos elegantes |
| **Rose Suave** | #D4A5A5 | Destaques, highlights (spans) |
| **Cinza Neutro** | #6B6B7E | Subtextos, captions |

---

## Tipografia

### Fontes Google
- **Títulos (Hero/Heading):** Playfair Display (Bold 700)
- **Corpo (Body):** Inter (Medium 500)
- **Captions:** Inter (Regular 400)

### Escala de Tamanho (Instagram Carousel 1080x1440)

| Nível | Tamanho | Peso | Uso |
|-------|---------|------|-----|
| **Hero** | 58px | 700 | Títulos principais dos carrosséis |
| **Heading** | 43px | 700 | Subtítulos, kicker |
| **Body** | 34px | 500 | Texto principal |
| **Caption** | 24px | 400 | Detalhes, legendas |
| **Mínimo** | 20px | 400 | Apenas como último recurso |

---

## Espaçamento

- **Base Unit:** 24px
- **Content Margin:** 72px (3x base) das bordas
- **Section Gap:** 48px (2x base)
- **Linha Gap:** 16px entre parágrafos

---

## Componentes de Slide

### 1. Slide Photo Quote (com imagem de fundo)
- Fundo: Imagem com overlay escuro 0.4 opacity
- Título: 58px Playfair Display, branco
- Kicker: 24px Inter, rose suave, uppercase
- Contraste: WCAG AA mínimo

### 2. Slide Dark
- Fundo: #1A1A2E (navy profundo)
- Texto: #FFFFFF ou #F5EFE7
- Kicker: 43px Playfair Display, chocolate
- Body: 34px Inter, branco

### 3. Slide Light / Paper
- Fundo: #F5EFE7 (bege acolhedor)
- Texto: #1A1A2E ou #8B7355
- Kicker: 43px Playfair Display, chocolate
- Body: 34px Inter, navy profundo

### 4. Highlights
- Spans com `hl` class: cor rose suave (#D4A5A5)
- Peso: Bold (700)

---

## Logo / Branding

- **Posição:** Bottom right ou center bottom
- **Texto:** @psitamiris.redivo
- **Tamanho:** 20-24px
- **Cor:** Varia conforme fundo (contraste WCAG AA)
- **Margin:** 36px dos cantos

---

## Estrutura de Carrosséis

1. **Slide 1 (Hook):** Photo quote com título impactante
2. **Slides 2-n:** Mix de dark, light, paper com conteúdo educativo
3. **Último Slide:** CTA com chamada forte + logo branding
4. **Nunca:** Slide counter ("1/5"), repetição de fotos

---

## Fotos Base (9 total, sem repetições)

| Dia | Foto | URL |
|-----|------|-----|
| 11 | Mãos ansiosas | https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b |
| 12 | - | (sem foto) |
| 13 | Mulher pensativa | https://images.unsplash.com/photo-1573496359142-b8d87734a5a2 |
| 14 | Pessoa meditando | https://images.unsplash.com/photo-1516528215080-20f2c827c869 |
| 15 | - | (sem foto) |
| 16 | Mulher confiante | https://images.unsplash.com/photo-1531346878377-a5be20888e57 |
| 17 | - | (sem foto) |
| 18 | Workspace produtivo | https://images.unsplash.com/photo-1495474472287-4d71bcdd2085 |
| 19 | Meditação praia | https://images.unsplash.com/photo-1455390582262-044cdead277a |
| 20 | - | (sem foto) |
| 21 | Cérebro pensando | https://images.unsplash.com/photo-1552664730-d307ca884978 |
| 22 | - | (sem foto) |
| 23 | Espelho reflexão | https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6 |
| 24 | Mulher calma | https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d |
| 25 | - | (sem foto) |
| 26 | Meditação serena | https://images.unsplash.com/photo-1507525428034-b723cf961d3e |
| 27 | - | (sem foto) |
| 28 | Terapia | https://images.unsplash.com/photo-1516528215080-20f2c827c869 |
| 29 | - | (sem foto) |
| 30 | Vitória esperança | https://images.unsplash.com/photo-1551632786-8e9e3bcc0eab |

---

## Padrão de Alternância

✓ Sem repetição de fotos em nenhum post  
✓ Mix de fotos em tons naturais/aconchegantes  
✓ Todas focam em pessoas, bem-estar, emoção

