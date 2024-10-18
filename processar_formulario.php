<?php
// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta os dados do formulário
    $nome = $_POST["nome"];
    $telefone = $_POST["telefone"];
    $empresa = $_POST["empresa"];
    $mensagem = $_POST["mensagem"];

    // Configurações para o email
    $destinatario = "brunodesigner3@gmail.com"; // Substitua pelo seu endereço de email
    $assunto = "Novo formulário enviado";

    // Constrói o corpo do email
    $corpo_email = "Nome: $nome\n";
    $corpo_email .= "Telefone: $telefone\n";
    $corpo_email .= "Empresa: $empresa\n";
    $corpo_email .= "Mensagem:\n$mensagem";

    // Envia o email
    if (mail($destinatario, $assunto, $corpo_email)) {
        echo "Obrigado! Seu formulário foi enviado com sucesso.";
    } else {
        echo "Desculpe, houve um problema ao enviar seu formulário.";
    }
}
?>
