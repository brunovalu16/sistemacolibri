import { getCookie } from "../js/cookie.js";
const token = getCookie();
console.log(token);

const storage = firebase.storage();
document.addEventListener('DOMContentLoaded', () => {
    const dropdownInput = document.getElementById('dropdown-input');
    const dropdownBox = document.getElementById('dropdown-box');

    const inputfile = document.getElementById('inputfile');
    const buttonsave = document.getElementById('buttonsave');
    const modalclose = document.getElementById('modalclose');

    

    // fazer o upload do arquivo
    inputfile.addEventListener('change', (event)=>{
        const file = event.target.files[0]
        console.log(file);
        
        // quando clicar no botão de salvar
    buttonsave.addEventListener('click', () => {
        uploadfile(file);
        console.log("Arquivo enviado com sucesso. Pode fechar a janela");
        alert("Arquivo enviado com sucesso. Pode fechar a janela");
        });
        
    });

    


    // Alternar a visibilidade do dropdown
    dropdownInput.addEventListener('click', () => {
        dropdownBox.classList.toggle('show');
    });

    // Fechar o dropdown se clicar fora dele
    window.addEventListener('click', (event) => {
        if (!event.target.matches('#dropdown-input') && !event.target.matches('#dropdown-box') && !event.target.matches('#dropdown-box *')) {
            if (dropdownBox.classList.contains('show')) {
                dropdownBox.classList.remove('show');
            }
        }
    });

    // Gerenciar seleção única
    dropdownBox.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            const checkboxes = dropdownBox.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox !== event.target) {
                    checkbox.checked = false;
                }
            });

            // Atualizar o texto do campo de entrada
            dropdownInput.value = event.target.nextSibling.textContent.trim();
            dropdownBox.classList.remove('show');
        }
    });
    
    async function uploadfile(file) {
        try{
            const storageref = storage.ref('arquivos/' + file.name)
            const storageupload = await storageref.put(file)
            const linkdownload = await storageupload.ref.getDownloadURL()
            /*
            const userid = getUserId()
            console.log(userid);
            */

            // Recuperando os inputs do html (index-gerente)
           const arquivo = document.getElementById("dropdown-input").value
           const unidade = document.getElementById("Unidade").value
           
           // Acessa o firebase/coleção/pasta user e atualiza as informações do user conectado (uid)
            await firebase.firestore().collection("user").doc(token).update({
                file: firebase.firestore.FieldValue.arrayUnion({
                    link: linkdownload,
                    tipo_arquivo: arquivo,
                    data: firebase.firestore.Timestamp.now(),
                    unidade: unidade
                })
                    
            })
        }
        catch(error){
            console.log(error);
        }
    }

});


