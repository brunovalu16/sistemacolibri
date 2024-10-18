// Função para abrir o modal
function openModal() {
    const modal = document.getElementById("cardModal");
    modal.style.display = "flex";
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("cardModal");
    modal.style.display = "none";
}

// Função para aplicar máscara de data
function applyDateMask(input) {
    input.addEventListener('input', function () {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, '$1/$2');
        if (value.length > 5) value = value.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
        input.value = value;
    });
}

// Chama a máscara para os campos de data
applyDateMask(document.getElementById('dataCriacao'));
applyDateMask(document.getElementById('dataFinalizacao'));

// Seleciona o botão de adicionar na coluna Pendente para abrir o modal
document.querySelector('.kanban-column[data-id="1"] .add-card').addEventListener('click', openModal);

// Função para criar um novo card com base nas informações do modal
function createCardFromModal() {
    const nome = document.getElementById('nome').value;
    const departamento = document.getElementById('departamento').value;
    const assunto = document.getElementById('assunto').value;
    const dataCriacao = document.getElementById('dataCriacao').value;
    const dataFinalizacao = document.getElementById('dataFinalizacao').value;
    const responsavel = document.getElementById('responsavel').value; // Captura o responsável
    const prioridade = document.getElementById('prioridade').value; // Captura a prioridade selecionada

    if (!nome || !departamento || !assunto || !dataCriacao || !dataFinalizacao || !responsavel || !prioridade) {
        alert("Preencha todos os campos!");
        return;
    }

    // Define o rótulo da prioridade e a classe CSS associada
    let badgeClass;
    let badgeText;
    switch (prioridade) {
        case 'high':
            badgeClass = 'high';
            badgeText = 'Alta prioridade';
            break;
        case 'medium':
            badgeClass = 'medium';
            badgeText = 'Média prioridade';
            break;
        case 'low':
            badgeClass = 'low';
            badgeText = 'Baixa prioridade';
            break;
    }

    const card = document.createElement('div');
    card.classList.add('kanban-card');
    card.setAttribute('draggable', 'true');

    card.innerHTML = `
        <div class="badge ${badgeClass}">
            <span>${badgeText}</span>
        </div>
        <p class="card-title">${assunto}</p>
        <div class="card-content">
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Departamento:</strong> ${departamento}</p>
            <p><strong>Responsável:</strong> ${responsavel}</p>
            <p><strong>Data de Criação:</strong> ${dataCriacao}</p>
            <p><strong>Data de Finalização:</strong> ${dataFinalizacao}</p>
        </div>
        
    `;

    // Adiciona eventos de arrastar e soltar ao novo card
    addCardEvents(card);

    // Adiciona o botão de excluir no novo card
    addDeleteButton(card);

    // Adiciona o novo card à coluna Pendente
    const column = document.querySelector('.kanban-column[data-id="1"]');
    column.querySelector('.kanban-cards').appendChild(card);

    // Fecha o modal
    closeModal();
}

// Evento de submissão do formulário para criar o card
document.getElementById('cardForm').addEventListener('submit', function (e) {
    e.preventDefault();
    createCardFromModal();
});

// Botão de cancelar para fechar o modal
document.getElementById('cancelar').addEventListener('click', closeModal);

// Botão para fechar o modal (X)
document.querySelector('.close').addEventListener('click', closeModal);

// Função para adicionar eventos de arrastar e soltar aos cards
function addCardEvents(card) {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging');
    });

    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging');
    });
}

// Seleciona todos os elementos com a classe '.kanban-cards' (as colunas) e adiciona eventos a cada um deles
document.querySelectorAll('.kanban-cards').forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        const draggingCard = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(column, e.clientY);
        if (afterElement == null) {
            column.appendChild(draggingCard);
        } else {
            column.insertBefore(draggingCard, afterElement);
        }
    });

    column.addEventListener('drop', e => {
        e.currentTarget.classList.remove('cards-hover');
    });

    column.addEventListener('dragleave', e => {
        e.currentTarget.classList.remove('cards-hover');
    });
});

// Função para pegar o elemento que está sendo arrastado
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.kanban-card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Função para excluir cards
function addDeleteButton(card) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-card');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    card.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        card.remove();
    });
}

// Aplicando os eventos de arrastar e soltar nos cards existentes
document.querySelectorAll('.kanban-card').forEach(card => {
    addCardEvents(card);
});
