document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();  // Impede que o formulário seja enviado da maneira tradicional
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Verifica se os campos de email e senha estão preenchidos
      if (email && password) {
        // Configura a persistência da sessão para manter o login mesmo após fechar o navegador
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() => {
            // Tenta fazer login com as credenciais fornecidas
            return firebase.auth().signInWithEmailAndPassword(email, password);
          })
          .then((userid) => {
            return userid.user.uid
          })
          .then((idToken) => {
            // armazena o id do usuário logado no cookie token
            document.cookie = `token=${idToken}`
            // Se bem-sucedido, redireciona para a página 'home.html'
            window.location.href = "home.html"; 
          })
          .catch(function (error) {
            // Trata erros de login, como senha incorreta ou usuário não encontrado
            handleLoginError(error);
          });
      } else {
        alert("Por favor, preencha todos os campos.");  // Alerta se algum campo estiver vazio
      }
    });
  }
});

function handleLoginError(error) {
  console.error("Erro ao fazer login:", error);
  let errorMessage = "Ocorreu um erro!";  // Mensagem padrão de erro

  // Ajusta a mensagem de erro com base no código específico retornado pelo Firebase
  switch(error.code) {
    case "auth/wrong-password":
      errorMessage = "Senha incorreta. Tente novamente.";
      break;
    case "auth/user-not-found":
      errorMessage = "Nenhum usuário encontrado com este email.";
      break;
    case "auth/invalid-email":
      errorMessage = "O formato do email é inválido.";
      break;
    default:
      errorMessage = "Erro ao fazer login. Por favor, tente novamente.";
  }

  alert(errorMessage);  // Exibe um alerta com a mensagem de erro específica
}
