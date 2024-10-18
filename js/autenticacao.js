document.addEventListener("DOMContentLoaded", function() {
    // Verifica se o Firebase foi inicializado
    const app = firebase.app();
    if (!app) {
      console.error("Firebase não foi inicializado!");
      return;
    }
  
    const auth = firebase.auth();
  
    // Observa mudanças de estado de autenticação
    auth.onAuthStateChanged(user => {
      if (!user) {
        // Se nenhum usuário estiver logado, redireciona para a página de login
        window.location.href = 'index.html';
      }
      // Se um usuário estiver logado, você pode aqui acessar detalhes do usuário ou fazer outras verificações
    });
  });
  