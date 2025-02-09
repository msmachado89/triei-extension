// Função para validar se uma string é um número de processo válido
export function isValidProcessNumber(number) {
  number = number.trim() // Limpa espaços extras

  // Verifica se a string contém "/" e tem pelo menos 20 caracteres
  if (!number.includes("/") || number.length < 20) {
    return false
  }

  // Se passou nas verificações básicas, o número de processo é válido
  return true
}

// Função para filtrar e criar o array de processos
export function filterMovements(text) {
  const movements = text
    .split("\n")
    .map((line) => line.split("\t")[0].trim()) // Pega apenas a primeira coluna
    .filter((number) => {
      // Verifica se a string tem o formato de um número de processo
      return number && isValidProcessNumber(number) // Garante que é um número e válido
    })

  return movements
}

// Função para verificar se o conteúdo da área de transferência é válido
export async function checkClipboardData() {
  try {
    // Captura os dados do clipboard
    let clipboardText = await navigator.clipboard.readText()

    // Filtra os movimentos usando a função filterMovements
    let movements = filterMovements(clipboardText)

    // Verifica se encontramos algum processo válido
    return movements.length > 0
  } catch (error) {
    console.error("Erro ao acessar a área de transferência!", error)
    return false // Caso haja erro ao acessar o clipboard, retornamos false
  }
}

// Função para obter o número total de processos únicos
export function getUniqueProcesses(movements) {
  return new Set(movements).size
}
