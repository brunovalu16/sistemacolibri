function showContent(section) {
    // Obter todos os botões da barra lateral e remover a classe 'active'
    var buttons = document.querySelectorAll('#relatoriosApp .sidebar button');
    buttons.forEach(button => button.classList.remove('active'));

    // Adicionar a classe 'active' ao botão clicado
    event.target.classList.add('active');

    // Atualizar o conteúdo com base na seção
    var content = document.getElementById('content');
    content.innerHTML = '';

    if (section === 'vendas') {
        content.innerHTML = `
            <!-- Conteúdo Vendas -->
            <a href="relatorio_geral.html"><button>RELATÓRIO GERAL</button></a>
            <a href="vendas_devolucao.html"><button>VENDAS X DEVOLUÇÃO</button></a>
            <a href="link3.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link4.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link5.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link6.html"><button disabled>EM CONSTRUÇÃO</button></a>
        `;
    } else if (section === 'financeiro') {
        content.innerHTML = `
            <!-- Conteúdo Financeiro -->
            <a href="link7.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link8.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link9.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link10.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link11.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link12.html"><button disabled>EM CONSTRUÇÃO</button></a>
        `;
    } else if (section === 'logistica') {
        content.innerHTML = `
            <!-- Conteúdo Logística -->
            <a href="link13.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link14.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link15.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link16.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link17.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link18.html"><button disabled>EM CONSTRUÇÃO</button></a>
        `;
    } else if (section === 'central') {
        content.innerHTML = `
            <!-- Conteúdo Central de Monitoramento -->
            <a href="link19.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link20.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link21.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link22.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link23.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link24.html"><button disabled>EM CONSTRUÇÃO</button></a>
        `;
    } else if (section === 'trade') {
        content.innerHTML = `
            <!-- Conteúdo Trade -->
            <a href="vendas-devolucao-coordenadortrade.html"><button>VENDAS X DEVOLUÇÃO</button></a>
            <a href="relatoriogeral-coordenadortrade.html"><button>RELATÓRIO GERAL</button></a>
            <a href="link27.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link28.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link29.html"><button disabled>EM CONSTRUÇÃO</button></a>
            <a href="link30.html"><button disabled>EM CONSTRUÇÃO</button></a>
        `;
    }
}
