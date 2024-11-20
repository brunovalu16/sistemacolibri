// Exibir o preloader ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    // Exibe o preloader
    document.getElementById("preloadertwo").style.display = "flex";
    
    // Inicia o carregamento dos dados do Firebase Firestore
    carregarDadosDaTabela();
  });
  
  function carregarDadosDaTabela() {
    const tabelaBody = document.querySelector("#usertable tbody");
  
    // Referência ao Firebase Firestore
    const db = firebase.firestore();
  
    // Supondo que você tenha uma coleção chamada "arquivos"
    db.collection("arquivos").get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        
        // Cria uma nova linha para cada item
        const newRow = document.createElement("tr");
  
        // Coluna do usuário
        const usuarioCell = document.createElement("td");
        usuarioCell.textContent = data.usuario;
        newRow.appendChild(usuarioCell);
  
        // Coluna do tipo de arquivo
        const tipoCell = document.createElement("td");
        tipoCell.textContent = data.tipoArquivo;
        newRow.appendChild(tipoCell);
  
        // Coluna da data
        const dataCell = document.createElement("td");
        const dataFormatada = new Date(data.data.seconds * 1000).toLocaleDateString("pt-BR");
        dataCell.textContent = dataFormatada;
        newRow.appendChild(dataCell);
  
        // Coluna da unidade
        const unidadeCell = document.createElement("td");
        unidadeCell.textContent = data.unidade;
        newRow.appendChild(unidadeCell);
  
        // Coluna da ação (exemplo: botão de download)
        const acaoCell = document.createElement("td");
        const downloadButton = document.createElement("a");
        downloadButton.href = data.linkArquivo; // Supondo que haja um link para o arquivo
        downloadButton.textContent = "Download";
        downloadButton.className = "button red";
        acaoCell.appendChild(downloadButton);
        newRow.appendChild(acaoCell);
  
        // Adiciona a nova linha na tabela
        tabelaBody.appendChild(newRow);
      });
  
      // Esconde o preloader após carregar todos os itens
      esconderPreloader();
    }).catch((error) => {
      console.error("Erro ao carregar os dados: ", error);
      esconderPreloader(); // Esconder o preloader mesmo se ocorrer um erro
    });
  }
  
  function esconderPreloader() {
    // Esconde o preloader após o carregamento
    document.getElementById("preloadertwo").style.display = "none";
  }
  