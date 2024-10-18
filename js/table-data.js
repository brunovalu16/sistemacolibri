import {getCookie} from "./cookie.js"

// função qual a permissão de visualização dos arquivos dos usuários

function viewuser(logeduserrole,targetuserrole){
  const permission = {
    "01": ["01","02","03","04","05"], // diretoria
    "02": ["02","03","04","05"],
    "03": ["03","04"],
    "04": ["04"],
    "05": ["05"]
  }
  return permission[logeduserrole].includes(targetuserrole)
}

// acessar o documento "role" do user logado

const uid = getCookie()
firebase.firestore().collection("user").doc(uid).get().then((doc) =>{
  if(doc.exists){
    const userrole = doc.data().role
    // chamar a função "loaduserdata" passando o role do usuário logado
    laodUserData(userrole)
  }
}) 



// Função que carrega os dados do firestore para a tabela

function laodUserData(logeduserrole) {
  // recupera a tabela do html (document)
  const usertable = document
    .getElementById("usertable")
    .getElementsByTagName("tbody")[0];
  firebase
    .firestore()
    .collection("user")
    .get()
    .then((user) => {
      user.forEach((doc) => {
        const UserData = doc.data();
        if (UserData.file != "" && viewuser(logeduserrole,UserData.role)) {
          UserData.file.forEach((file) => {
            // Adiciona uma linha na tabela html
            const newRow = usertable.insertRow()

            // Adiciona uma célula na tabela ao primeiro elemento da tabela (0)
            const nameCell = newRow.insertCell(0)
            // adicionar um valor a essa célula
            nameCell.textContent = UserData.username

            // segunda célula
            const typefilecell = newRow.insertCell(1)
            typefilecell.textContent = file.tipo_arquivo

            // terceira célula
            const typedata = newRow.insertCell(2)
            typedata.textContent = new Date(file.data.seconds*1000).toLocaleString()

            // quarta célula
            const typeunidade = newRow.insertCell(3)
            typeunidade.textContent = file.unidade

            // quinta célula
            const typeacao = newRow.insertCell(4)
            const button = document.createElement("a")
            button.href = file.link
            button.textContent = "Download"
            button.className = "button red"
            button.target = "_blank"
            button.style.textDecoration = "none"
            typeacao.appendChild(button)

          });
        }
      });
    });
}

window.onload = laodUserData;


