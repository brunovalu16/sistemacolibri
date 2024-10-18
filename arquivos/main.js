'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')


    const tempClient = {
        usuario: "bruno",
        tipoarquivo: "acoes",
        data: "123456",
        unidade: "goias"
    }

// CRUD  - CRIAR //

const createrClient = (Client) => {
    localStorage.setItem("db_client" , JSON.stringify(Client)) 
}

// EVENTOS //

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)


    createrClient(tempClient)

