$taskName = "Opensquad Instagram Diario 8h"
$scriptPath = "C:\Users\tamir\projeto agentes\squads\conteudo-psicologia\output\2026-04-16-223800\v1\executar_post_diario.cmd"

schtasks /Create /F /SC DAILY /TN $taskName /TR "`"$scriptPath`"" /ST 08:00

Write-Host "Tarefa agendada criada/atualizada:"
Write-Host $taskName
