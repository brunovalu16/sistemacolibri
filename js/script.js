import { getCookie } from "./cookie.js";
const menuContainer = document.getElementById("menuContainer");

// Constante token que recebe os dados da função cookie
const token = getCookie();

// Se o token existir, inicialize o menu com base no perfil do usuário
if (token) {
  inicializarMenu(token);
}

// Carregar o menu de forma assíncrona quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  const lazyLoadMenu = () => {
    if (menuContainer) {
      fetch("menu.html")
        .then((response) => response.text())
        .then((data) => {
          menuContainer.innerHTML = data;

          // Apenas configure o logout e o menu invisível agora
          setupLogout();
          
          // Não mostrar o menu até que o perfil seja processado
          const menu = document.getElementById('menu');
          if (menu) {
            menu.style.display = 'none';
          }
        })
        .catch((error) => console.error('Erro ao carregar o menu:', error));
    }
  };

  // Usar o IntersectionObserver para carregar o menu apenas quando necessário
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lazyLoadMenu();
        observer.disconnect();
      }
    });
  });

  observer.observe(menuContainer);
});

// Função para inicializar o menu com base no perfil do usuário e cache
async function inicializarMenu(uid) {
  let usuario = sessionStorage.getItem("usuarioDados");
  
  if (usuario) {
    usuario = JSON.parse(usuario);
    configurarMenu(usuario); // Configurar o menu com o usuário em cache
  } else {
    try {
      // Certifique-se de que o UID correto está sendo passado aqui
      const doc = await firebase.firestore().collection("user").doc(uid).get();
      if (doc.exists) {
        usuario = doc.data();
        sessionStorage.setItem("usuarioDados", JSON.stringify(usuario)); // Cacheando os dados
        configurarMenu(usuario); // Configurar o menu após obter o perfil
      } else {
        esconderLinksDoMenu();
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  }
}

// Função para configurar o menu com base no perfil do usuário
function configurarMenu(usuario) {
  // Verifica se o menu já foi carregado
  const menu = document.getElementById('menu');
  if (!menu) {
    // Se o menu não estiver carregado, aguarda ele ser inserido
    const observer = new MutationObserver(() => {
      configurarMenu(usuario); // Tenta configurar novamente após o menu ser carregado
      observer.disconnect();
    });
    observer.observe(menuContainer, { childList: true });
    return;
  }

  console.log("Dados do usuário:", usuario);

  // Exibir o nome do usuário na interface
  const loggedInUserSpan = document.getElementById("loggedInUser");
  if (loggedInUserSpan && usuario.username) {
    loggedInUserSpan.textContent = `Olá, ${usuario.username}`;
  }

  // Definir os links de acordo com o perfil do usuário
  const perfil = usuario.role;
  const links = {
    "01": ["linkDiretoria"],
    "02": ["linkGerente"],
    "03": ["linkSupervisor"],
    "04": ["linkVendedor"],
    "05": ["linkIndustria"],
  };

  // Mostrar o link correspondente ao perfil e ocultar os demais
  for (const [key, values] of Object.entries(links)) {
    values.forEach((value) => {
      const linkElement = document.getElementById(value);
      if (linkElement) {
        linkElement.style.display = key === perfil ? "block" : "none";
      }
    });
  }

  // Agora que o menu está configurado, mostrá-lo
  if (menu) {
    menu.style.display = 'block';
  }
}

// Função para esconder todos os links de perfil
function esconderLinksDoMenu() {
  const linksPerfil = document.querySelectorAll('#menu li[id^="link"]');
  linksPerfil.forEach((link) => (link.style.display = "none"));
}

// Função para configurar o logout
function setupLogout() {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      // Certifique-se de limpar corretamente o sessionStorage
      sessionStorage.removeItem("usuarioDados");
      sessionStorage.removeItem("usuarioLogado");
      window.location.href = "index.html";
    });
  }
}















/*

import { getCookie } from "./cookie.js";
const menuContainer = document.getElementById("menuContainer");

// Constante token que recebe os dados da função cookie
const token = getCookie();

// Se o token existir, inicialize o menu com base no perfil do usuário
if (token) {
  inicializarMenu(token);
}

// Carregar o menu de forma assíncrona quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  const lazyLoadMenu = () => {
    if (menuContainer) {
      fetch("menu.html")
        .then((response) => response.text())
        .then((data) => {
          menuContainer.innerHTML = data;

          // Apenas configure o logout e o menu invisível agora
          setupLogout();
          
          // Não mostrar o menu até que o perfil seja processado
          const menu = document.getElementById('menu');
          if (menu) {
            menu.style.display = 'none';
          }
        })
        .catch((error) => console.error('Erro ao carregar o menu:', error));
    }
  };

  // Usar o IntersectionObserver para carregar o menu apenas quando necessário
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lazyLoadMenu();
        observer.disconnect();
      }
    });
  });

  observer.observe(menuContainer);
});

// Função para inicializar o menu com base no perfil do usuário e cache
async function inicializarMenu(uid) {
  let usuario = sessionStorage.getItem("usuarioDados");
  
  if (usuario) {
    usuario = JSON.parse(usuario);
    configurarMenu(usuario); // Configurar o menu com o usuário em cache
  } else {
    try {
      const doc = await firebase.firestore().collection("user").doc(uid).get();
      if (doc.exists) {
        usuario = doc.data();
        sessionStorage.setItem("usuarioDados", JSON.stringify(usuario));
        configurarMenu(usuario); // Configurar o menu após obter o perfil
      } else {
        esconderLinksDoMenu();
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  }
}

// Função para configurar o menu com base no perfil do usuário
function configurarMenu(usuario) {
  // Verifica se o menu já foi carregado
  const menu = document.getElementById('menu');
  if (!menu) {
    // Se o menu não estiver carregado, aguarda ele ser inserido
    const observer = new MutationObserver(() => {
      configurarMenu(usuario); // Tenta configurar novamente após o menu ser carregado
      observer.disconnect();
    });
    observer.observe(menuContainer, { childList: true });
    return;
  }

  console.log("Dados do usuário:", usuario);

  // Exibir o nome do usuário na interface
  const loggedInUserSpan = document.getElementById("loggedInUser");
  if (loggedInUserSpan) {
    loggedInUserSpan.textContent = `Olá, ${usuario.username}`;
  }

  // Definir os links de acordo com o perfil do usuário
  const perfil = usuario.role;
  const links = {
    "01": ["linkDiretoria"],
    "02": ["linkGerente"],
    "03": ["linkSupervisor"],
    "04": ["linkVendedor"],
    "05": ["linkIndustria"],
  };

  // Mostrar o link correspondente ao perfil e ocultar os demais
  for (const [key, values] of Object.entries(links)) {
    values.forEach((value) => {
      const linkElement = document.getElementById(value);
      if (linkElement) {
        linkElement.style.display = key === perfil ? "block" : "none";
      }
    });
  }

  // Agora que o menu está configurado, mostrá-lo
  if (menu) {
    menu.style.display = 'block';
  }
}

// Função para esconder todos os links de perfil
function esconderLinksDoMenu() {
  const linksPerfil = document.querySelectorAll('#menu li[id^="link"]');
  linksPerfil.forEach((link) => (link.style.display = "none"));
}

// Função para configurar o logout
function setupLogout() {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem("usuarioLogado");
      window.location.href = "index.html";
    });
  }
}

*/



























// CÓDIGO ANTIGO COM LENTIDÃO PARA CARREGAR OS ITENS DO MENU



/* 


import { getCookie } from "./cookie.js";
const menuContainer = document.getElementById("menuContainer");




// INÍCIO CÓDIGO ANTIGO

// Função assincrona para recuperar o ID do usário logado pelo Firebase


async function getUser() {
  await firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // Usuário está logado
      inicializarMenu(user.uid);
    } else {
      // Usuário não está logado
      console.log("Nenhum usuário está autenticado.");
    }
  });
}

// FIM CÓDIGO ANTIGO



// Constante token que recebe os dados da função cookie
const token = getCookie();
// se token existir (verdadeiro) ele chama o função inicializar menu
if(token){
  inicializarMenu(token)
}



// Carregar o menu nas páginas que precisam dele
document.addEventListener("DOMContentLoaded", function () {
  if (menuContainer) {
    fetch("menu.html")
      .then((response) => response.text())
      .then((data) => {
        menuContainer.innerHTML = data;
        // Buscar elementos do menu após a inserção do menu na página
        const loggedInUserSpan = document.getElementById("loggedInUser");
        const logoutButton = document.getElementById("logoutButton");
        // Esconder o menu até que o usuário seja identificado
        const menu = document.getElementById('menu');
        if (menu) {
          menu.style.display = 'none';
          console.log("menu: " + menu.style.display);
        }
      });
  }
});

// Inicializar o menu com base no perfil do usuário
async function inicializarMenu(uid) {

  let usuario;
  await firebase
    .firestore()
    .collection("user")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        usuario = doc.data();
        console.log("Dados do usuário:", usuario);

        // Exibir dados do usuário na interface
        const loggedInUserSpan = document.getElementById("loggedInUser");
        if (loggedInUserSpan) {
          loggedInUserSpan.textContent = `Olá, ${usuario.username}`;
        }

        // Mostrar ou esconder links do menu com base no perfil do usuário
        const perfil = usuario.role;
        const links = {
          "01": ["linkDiretoria"],
          "02": ["linkGerente"],
          "03": ["linkSupervisor"],
          "04": ["linkVendedor"],
          "05": ["linkIndustria"],
        };

        // Mostrar o link correspondente ao perfil e ocultar os demais
        for (const [key, values] of Object.entries(links)) {
          values.forEach((value) => {
            const linkElement = document.getElementById(value);
            if (linkElement) {
              linkElement.style.display = key === perfil ? "block" : "none";
            }
          });
        }
        
      } else {
        // Esconder todos os links de perfil se nenhum usuário estiver logado
        const linksPerfil = document.querySelectorAll('#menu li[id^="link"]');
        linksPerfil.forEach((link) => (link.style.display = "none"));
      }
    });
   
    // Exibir o menu após configurar os links
    const menu = document.getElementById('menu');
    if (menu) {
      menu.style.display = 'block';
    }
    
  // Manipular o logout
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem("usuarioLogado");
      window.location.href = "index.html";
    });
  }
  
}

*/