const nome = document.getElementById('input-nome');
const msgNome = document.getElementById('msgNome'); 
const telefone = document.getElementById('input-numero');
const email = document.getElementById('input-email');
const data = document.getElementById('input-data');
const inputHorario = document.getElementById('input-horario');
const inputTipoConsulta = document.getElementById('input-tipo-consulta');
const form = document.querySelector("form");
const resultMensagem = document.getElementById('resultMensagem');


// MÁSCARA DO TELEFONE
const mascararTelefone = (valor) => {
    let numeros = valor.replace(/\D/g, '');
    numeros = numeros.slice(0, 11);

    if (numeros.length === 0) return ''; 

    if (numeros.length <= 2) {
        return `(${numeros}`;
    } else if (numeros.length <= 6) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else if (numeros.length <= 10) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    } else {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    }
}

// APLICA A MÁSCARA ENQUANTO O USUÁRIO DIGITA
telefone.addEventListener('input', (event) => {
    event.target.value = mascararTelefone(event.target.value);
});

nome.addEventListener('input', () => {
    nome.classList.remove('input-erro');
    nome.placeholder = 'Seu nome completo'; // volta o placeholder original
});

// VALIDAÇÃO DO FORMULÁRIO
form.addEventListener('submit', (event) => {
    let enviarForm = true;

    if (!nome.value.trim()) {
        nome.classList.add('input-erro');
        nome.placeholder = 'Nome é obrigatório!';
        resultMensagem.style.color = 'red';
        console.log('O nome está vazio');
        enviarForm = false;
    }
    
    if (!data.value) {
        console.log('A data está vazia');
        enviarForm = false;
    }

    const telefoneLimpo = limparTelefone(telefone.value);
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        console.log('O número deve conter 10 ou 11 dígitos');
        enviarForm = false;
    }

    const eValido = validarEmail(email.value);

    if (eValido) {
        resultMensagem.textContent = 'E-mail válido!';
        resultMensagem.style.color = 'green';
    } else {
        resultMensagem.textContent = 'E-mail inválido!';
        resultMensagem.style.color = 'red';
        enviarForm = false;
    }

    if (inputHorario.value === '') {
        console.log('O horário não foi selecionado');
        enviarForm = false;
    }

    if (inputTipoConsulta.value === '') {
        console.log('O tipo de consulta não foi selecionado');
        enviarForm = false;
    }

    if (!document.querySelector('input[name="tipo"]:checked')) {
        console.log('Forma de atendimento não selecionada');
        enviarForm = false;
    }

    if (!enviarForm) {
        event.preventDefault();
    }
});

// FUNÇÃO PARA VALIDAR O EMAIL
const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// FUNÇÃO PARA LIMPAR O NÚMERO DE TELEFONE
const limparTelefone = (telefone) => {
    return telefone.replace(/\D/g, '');
}