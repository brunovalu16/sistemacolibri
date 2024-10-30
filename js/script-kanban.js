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

applyDateMask(document.getElementById('dataCriacao'));
applyDateMask(document.getElementById('dataFinalizacao'));

// Função para salvar um card no Firestore
function saveCardToFirestore(cardData, callback) {
    db.collection('kanbanCards').add(cardData)
        .then((docRef) => {
            console.log("Card salvo com ID: ", docRef.id);
            if (callback) callback(docRef.id); // Callback com o ID do documento
        })
        .catch((error) => console.error("Erro ao salvar o card: ", error));
}

// Função para carregar cards do Firestore
function loadCardsFromFirestore() {
    db.collection('kanbanCards').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const cardData = doc.data();
            const card = createCardElement(cardData, doc.id);
            const column = document.querySelector(`.kanban-column[data-id="${cardData.columnId}"] .kanban-cards`);
            column.appendChild(card);
        });
    }).catch((error) => console.error("Erro ao carregar os cards: ", error));
}

// Função para criar um novo card com base nas informações do modal
function createCardFromModal() {
    const nome = document.getElementById('nome').value;
    const departamento = document.getElementById('departamento').value;
    const assunto = document.getElementById('assunto').value;
    const dataCriacao = document.getElementById('dataCriacao').value;
    const dataFinalizacao = document.getElementById('dataFinalizacao').value;
    const responsavel = document.getElementById('responsavel').value;
    const prioridade = document.getElementById('prioridade').value;

    if (!nome || !departamento || !assunto || !dataCriacao || !dataFinalizacao || !responsavel || !prioridade) {
        alert("Preencha todos os campos!");
        return;
    }

    const cardData = { nome, departamento, assunto, dataCriacao, dataFinalizacao, responsavel, prioridade, columnId: 1 };
    saveCardToFirestore(cardData, (docId) => {
        // Cria e exibe o card na interface após salvar no Firestore
        const card = createCardElement(cardData, docId);
        const column = document.querySelector('.kanban-column[data-id="1"] .kanban-cards');
        column.appendChild(card);

        closeModal();
    });
}

// Função para criar o elemento de card baseado nos dados fornecidos
function createCardElement(data, cardId) {
    const card = document.createElement('div');
    card.classList.add('kanban-card');
    card.setAttribute('draggable', 'true');

    let badgeClass, badgeText;
    switch (data.prioridade) {
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

    card.innerHTML = `
        <div class="badge ${badgeClass}">
            <span>${badgeText}</span>
        </div>
        <p class="card-title">${data.assunto}</p>
        <div class="card-content">
            <p><strong>Nome:</strong> ${data.nome}</p>
            <p><strong>Departamento:</strong> ${data.departamento}</p>
            <p><strong>Responsável:</strong> ${data.responsavel}</p>
            <p><strong>Data de Criação:</strong> ${data.dataCriacao}</p>
            <p><strong>Data de Finalização:</strong> ${data.dataFinalizacao}</p>
        </div>
    `;

    addCardEvents(card, cardId);
    addDeleteButton(card, cardId);
    return card;
}

// Função para adicionar eventos de arrastar e soltar aos cards
function addCardEvents(card, cardId) {
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging');
    });

    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging');
        const columnId = card.closest('.kanban-column').getAttribute('data-id');

        // Atualiza a coluna do card no Firestore
        db.collection('kanbanCards').doc(cardId).update({ columnId: columnId })
            .then(() => console.log("Card atualizado com nova coluna no Firestore."))
            .catch((error) => console.error("Erro ao atualizar a coluna do card: ", error));
    });
}

// Função para permitir o drop nas colunas
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
function addDeleteButton(card, cardId) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-card');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    card.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        card.remove();

        // Excluir do Firestore
        if (cardId) {
            db.collection('kanbanCards').doc(cardId).delete()
                .then(() => console.log("Card excluído do Firestore com sucesso!"))
                .catch((error) => console.error("Erro ao excluir o card: ", error));
        }
    });
}

// Carrega os cards salvos no Firestore ao carregar a página
document.addEventListener('DOMContentLoaded', loadCardsFromFirestore);

// Evento de submissão do formulário
document.getElementById('cardForm').addEventListener('submit', function (e) {
    e.preventDefault();
    createCardFromModal();
});

// Botões de abrir e fechar o modal
document.querySelector('.add-card').addEventListener('click', openModal);
document.getElementById('cancelar').addEventListener('click', closeModal);
document.querySelector('.close').addEventListener('click', closeModal);
