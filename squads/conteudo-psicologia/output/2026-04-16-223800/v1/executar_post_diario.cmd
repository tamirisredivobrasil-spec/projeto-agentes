@echo off
cd /d "%~dp0"
set IG_DRY_RUN=false
"C:\Program Files\nodejs\node.exe" publicador_instagram.js >> logs_publicador.txt 2>&1
