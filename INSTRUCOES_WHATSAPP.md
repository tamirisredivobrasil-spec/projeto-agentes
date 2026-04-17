# 🚀 Guia de Configuração: Agente de Notícias no WhatsApp

Para que o seu agente funcione na nuvem (GitHub Actions) de graça e mande notícias no seu WhatsApp mesmo com seu PC desligado, siga estes 3 passos:

---

## 1️⃣ Obter sua API do CallMeBot (WhatsApp)

O CallMeBot é um serviço gratuito para uso pessoal.
1. Adicione o número do bot aos seus contatos: **+34 621 07 33 86** (ou veja o número atual em [callmebot.com](https://www.callmebot.com/)).
2. Envie a mensagem: `I allow callmebot to send me messages`
3. O bot vai te responder com o seu **API Key**. Guarde esse número.

---

## 2️⃣ Configurar o GitHub (Onde o Agente vai morar)

Se você ainda não tem esse projeto no GitHub:
1. Crie um repositório no GitHub chamado `projeto-agentes`.
2. No seu terminal (aqui no editor), execute:
   ```bash
   git init
   git add .
   git commit -m "Setup Agente de Notícias"
   git remote add origin https://github.com/SEU_USUARIO/projeto-agentes.git
   git push -u origin main
   ```

---

## 3️⃣ Configurar os Segredos (Secrets)

No seu repositório no GitHub:
1. Vá em **Settings** > **Secrets and variables** > **Actions**.
2. Clique em **New repository secret** e adicione estes 3 segredos:

| Nome do Segredo | Valor |
|-----------------|-------|
| `GEMINI_API_KEY` | Sua chave da API do Google Gemini |
| `CALLMEBOT_API_KEY` | A chave que você recebeu no WhatsApp no passo 1 |
| `WHATSAPP_PHONE` | Seu número com DDI e DDD (Ex: `5518991234567`) |

---

## 🛠️ Como funciona agora?

- **Alertas Imediatos:** O GitHub roda o script **toda hora**. Se ele encontrar uma notícia com nota **8 ou mais**, ele te manda na hora no WhatsApp.
- **Resumo Diário:** Todo dia às **08:00 (Brasília)**, o GitHub roda o script com a função de resumo, pegando as melhores notícias das últimas 24h e mandando em uma única mensagem.
- **Deduplicação:** O robô salva as notícias que já viu no arquivo `noticias_vistas.json` e faz o "commit" de volta para o GitHub automaticamente, para nunca repetir notícia.
