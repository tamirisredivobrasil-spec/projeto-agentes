# Automacao Instagram

## Objetivo

Fluxo economico para:

1. gerar os PNGs localmente a partir do HTML
2. montar uma fila de posts
3. publicar automaticamente 1 conteudo por dia
4. sempre rodar no primeiro horario da manha, as 08:00

Sem uso de IA para renderizar imagens.

## 1. Exportar PNGs

```powershell
node .\renderizar_html_para_png.js .\preview_dias_11_a_15_estilo_semana1.html .\exports_dias_11_a_15
```

Ou, para qualquer outro HTML:

```powershell
node .\renderizar_html_para_png.js .\gerador_dias_11_a_30_v2.html .\exports_completos
```

## 2. Criar a fila de publicacao

Copie `plano_posts_instagram.exemplo.json` para `plano_posts_instagram.json` e preencha:

- `id`: identificador unico do post
- `status`: use `pending`
- `publish_on`: data a partir da qual ele pode sair
- `images`: caminhos dos PNGs
- `caption`: legenda completa
- `location`: opcional

O publicador sempre pega o primeiro item `pending` elegivel para a data atual.

Quando publicar de verdade:

- troca o status para `posted`
- grava `posted_at`
- adiciona um registro em `historico_publicacoes_instagram.json`

## 3. Testar sem postar

Dry-run seguro:

```powershell
node .\publicador_instagram.js
```

Ele abre o compositor, envia imagens e legenda, mas nao clica em `Compartilhar`.

## 4. Publicar de verdade

```powershell
$env:IG_DRY_RUN='false'; node .\publicador_instagram.js
```

## 5. Agendar para todos os dias as 08:00

Execute:

```powershell
powershell -ExecutionPolicy Bypass -File .\registrar_agendamento_8h.ps1
```

Isso cria uma tarefa do Windows chamada:

`Opensquad Instagram Diario 8h`

Ela roda o arquivo:

`executar_post_diario.cmd`

## Requisitos

- A conta precisa estar logada no perfil:
  `_opensquad/_browser_profile`
- O computador precisa estar ligado no horario da execucao
- O `plano_posts_instagram.json` precisa existir e ter posts pendentes

## Arquivos

- `publicador_instagram.js`: publica um post por execucao
- `renderizar_html_para_png.js`: exporta PNGs localmente
- `executar_post_diario.cmd`: comando para a tarefa do Windows
- `registrar_agendamento_8h.ps1`: cria o agendamento diario
- `historico_publicacoes_instagram.json`: historico automatico das execucoes
