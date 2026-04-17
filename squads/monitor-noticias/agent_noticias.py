import feedparser
import requests
import json
import os
import yaml
import datetime
import time
import google.generativeai as genai
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

# Configuração da IA
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

def load_config():
    with open("config.yaml", "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def load_seen_news():
    path = "noticias_vistas.json"
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_seen_news(seen_list):
    # Mantém apenas as últimas 200 notícias para não crescer infinitamente
    seen_list = seen_list[-200:]
    with open("noticias_vistas.json", "w", encoding="utf-8") as f:
        json.dump(seen_list, f, ensure_ascii=False, indent=4)

def fetch_news(config):
    news_items = []
    for fonte in config['fontes_rss']:
        print(f"Buscando em: {fonte['nome']}...")
        feed = feedparser.parse(fonte['url'])
        for entry in feed.entries:
            news_items.append({
                'id': entry.get('id', entry.link),
                'title': entry.title,
                'link': entry.link,
                'source': fonte['nome'],
                'published': entry.get('published', '')
            })
    return news_items

def analyze_relevance(item, config):
    prompt = f"""
    Você é um assistente especializado em curadoria de conteúdo para uma Psicóloga Clínica (Tamiris).
    O nicho dela é: {config['nicho']['nome']}.
    Palavras-chave importantes: {', '.join(config['nicho']['palavras_chave']['primarias'])}.

    Analise a notícia abaixo e dê uma nota de 0 a 10 de relevância para o público dela (pacientes com ansiedade, profissionais de saúde, interessados em TCC/DBT).
    Notícia: {item['title']}

    Responda APENAS um JSON no formato:
    {{"nota": 8, "resumo": "Breve resumo de 1 frase explicando por que é relevante ou o que a notícia diz"}}
    """
    try:
        response = model.generate_content(prompt)
        # Limpa a resposta para garantir que seja um JSON válido
        text = response.text.strip()
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        return json.loads(text)
    except Exception as e:
        print(f"Erro ao analisar notícia: {e}")
        return {"nota": 0, "resumo": ""}

def send_whatsapp(message):
    api_key = os.getenv("CALLMEBOT_API_KEY")
    phone = os.getenv("WHATSAPP_PHONE")
    if not api_key or not phone:
        print("Erro: CALLMEBOT_API_KEY ou WHATSAPP_PHONE não configurados.")
        return

    url = f"https://api.callmebot.com/whatsapp.php?phone={phone}&text={requests.utils.quote(message)}&apikey={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        print("Mensagem enviada com sucesso!")
    else:
        print(f"Erro ao enviar WhatsApp: {response.text}")

import sys

def send_summary(news_list):
    if not news_list:
        return
    
    header = "🧠 *RESUMO DIÁRIO — PSICOLOGIA*\n"
    header += f"📅 {datetime.datetime.now().strftime('%d/%m/%Y')}\n\n"
    
    body = ""
    for item in news_list:
        body += f"━━━━━━━━━━━━━━━━\n"
        body += f"⭐ *{item['title']}*\n"
        body += f"💡 {item['resumo']}\n"
        body += f"🔗 {item['link']}\n\n"
    
    footer = "🤖 _Gerado por Opensquad para @psitamiris.redivo_"
    send_whatsapp(header + body + footer)

def main():
    config = load_config()
    seen_ids = load_seen_news()
    all_news = fetch_news(config)
    
    is_summary_mode = "--summary" in sys.argv
    relevant_for_summary = []
    
    for item in all_news:
        if item['id'] not in seen_ids:
            analysis = analyze_relevance(item, config)
            item['nota'] = analysis['nota']
            item['resumo'] = analysis['resumo']
            seen_ids.append(item['id'])
            
            # Alerta imediato se for MUITO relevante (nota >= 8)
            if item['nota'] >= config['configuracoes']['min_relevancia_alerta']:
                msg = f"🚨 *ALERTA DE NOTÍCIA RELEVANTE*\n\n📌 *{item['title']}*\n\n💡 {item['resumo']}\n\n🔗 {item['link']}"
                send_whatsapp(msg)
            
            # Guarda para o resumo se tiver nota mínima (nota >= 6)
            if item['nota'] >= config['configuracoes']['min_relevancia_resumo']:
                relevant_for_summary.append(item)

    save_seen_news(seen_ids)
    
    if is_summary_mode and relevant_for_summary:
        send_summary(relevant_for_summary)
        print(f"Resumo diário enviado com {len(relevant_for_summary)} notícias.")
    else:
        print(f"Processamento concluído. {len(relevant_for_summary)} notícias novas relevantes guardadas.")

if __name__ == "__main__":
    main()
