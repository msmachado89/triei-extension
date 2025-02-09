import {
  checkClipboardData,
  filterMovements,
  getUniqueProcesses,
} from "../scripts/objects/processes.js"
import { renderResults } from "../scripts/services/screen.js"

document.getElementById("triage").addEventListener("click", async function () {
  try {
    // Verifica se o conteúdo do clipboard é válido
    const isValidData = await checkClipboardData()

    // Caso o conteúdo não seja válido, mostramos a mensagem de erro na tela
    if (!isValidData) {
      let result = document.getElementById("result")
      result.innerHTML = "Copie a lista de processos triados!"
      result.classList.remove("success", "fail") // Remover classes anteriores
      result.classList.add("fail") // Adicionar classe de falha para o estilo
      return // Sai da função caso os dados não sejam válidos
    }

    // Captura os dados do clipboard novamente após a verificação
    let clipboardText = await navigator.clipboard.readText()

    // Filtra e valida os números de processos
    const movements = filterMovements(clipboardText)

    // Contar o total de registros
    let totalMovements = movements.length

    // Contar o total de processos únicos
    let totalProcesses = getUniqueProcesses(movements)

    // Exibir resultados na tela
    renderResults(totalMovements, totalProcesses)
  } catch (error) {
    console.error("Erro ao processar os dados!", error)
    let result = document.getElementById("result")
    result.innerHTML = "Erro ao acessar!"
    result.classList.remove("success", "fail")
  }
})


