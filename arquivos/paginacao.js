document.addEventListener("DOMContentLoaded", function() {
    const rowsPerPage = 5; // Número de itens por página
    const rows = document.querySelectorAll("tbody tr"); // Seleciona todas as linhas da tabela no tbody
    const totalPages = Math.ceil(rows.length / rowsPerPage); // Calcula o total de páginas
    let currentPage = 1; // Página inicial

    // Função que exibe as linhas da página atual
    function displayRows() {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        rows.forEach((row, index) => {
            if (index >= start && index < end) {
                row.style.display = ""; // Exibe as linhas da página atual
            } else {
                row.style.display = "none"; // Esconde as outras linhas
            }
        });
    }

    // Função que atualiza o estado dos botões de paginação
    function updatePaginationButtons() {
        document.getElementById("anterior").disabled = currentPage === 1;
        document.getElementById("proxima").disabled = currentPage === totalPages;
    }

    // Evento para o botão de "Próxima"
    document.getElementById("proxima").addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            displayRows();
            updatePaginationButtons();
        }
    });

    // Evento para o botão de "Anterior"
    document.getElementById("anterior").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            displayRows();
            updatePaginationButtons();
        }
    });

    // Exibe as primeiras linhas ao carregar a página
    displayRows();
    updatePaginationButtons();
});
