import { getUniqueProcesses } from "../objects/processes.js" // Importa a função de contar processos únicos

// Função para exibir os resultados no popup
export function renderResults(totalMovements, totalProcesses) {
  const resultElement = document.getElementById("result")

  resultElement.innerHTML = `
        Movimentos: ${totalMovements} <br>
        Processos: ${totalProcesses}
    `

  resultElement.classList.remove("success", "fail")

  if (totalProcesses > 100) {
    resultElement.classList.add("success")
  } else {
    resultElement.classList.add("fail")
  }
}
