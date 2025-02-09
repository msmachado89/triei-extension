document.getElementById("processarClipboard").addEventListener("click", async function () {
    try {
      // Captura os dados do clipboard
      let clipboardText = await navigator.clipboard.readText()

      // Divide o texto por linhas e filtra as que possivelmente são números de processo
      let processos = clipboardText
        .split("\n")
        .map((line) => line.split("\t")[0].trim()) // Pega apenas a primeira coluna
        .filter((proc) => {
          // Verifica se a string é um número de processo baseado em um formato simples
          return proc.includes("/") && proc.length >= 20 // Simplificado
        })

      console.log(processos)

      // Contar o total de registros
      let totalRegistros = processos.length

      // Contar o total de registros únicos
      let totalRegistrosUnicos = new Set(processos).size

      // Exibir resultados no popup
      let resultadoEl = document.getElementById("resultado")
      resultadoEl.innerHTML = `
            Total de registros: ${totalRegistros} <br>
            Total de registros únicos: ${totalRegistrosUnicos}
        `

      // Remove qualquer classe existente antes de adicionar a correta
      resultadoEl.classList.remove("sucesso", "falha")

      // Adiciona a classe correspondente
      if (totalRegistrosUnicos > 100) {
        resultadoEl.classList.add("sucesso")
      } else {
        resultadoEl.classList.add("falha")
      }
    } catch (error) {
      console.error("Erro ao processar os dados do clipboard:", error)
      let resultadoEl = document.getElementById("resultado")
      resultadoEl.innerHTML = "Erro ao acessar o clipboard!"
      resultadoEl.classList.remove("sucesso", "falha") // Remove classes se erro
    }
  })
