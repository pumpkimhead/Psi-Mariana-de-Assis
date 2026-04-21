const nome = document.getElementById('input-nome');
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


telefone.addEventListener('input', (event) => {
    event.target.value = mascararTelefone(event.target.value);
});

nome.addEventListener('input', () => {
    nome.classList.remove('input-erro');
    nome.placeholder = 'Seu nome completo';
});


telefone.addEventListener('input', () => {
    telefone.classList.remove('input-erro');
    telefone.placeholder = '(DDD) 99999-9999';
});


email.addEventListener('input', () => {
    email.classList.remove('input-erro');
    email.placeholder = 'email@exemplo.com';
    resultMensagem.textContent = '';
});


data.addEventListener('input', () => {
    data.classList.remove('input-erro');
});


inputHorario.addEventListener('change', () => {
    inputHorario.classList.remove('input-erro');
});


inputTipoConsulta.addEventListener('change', () => {
    inputTipoConsulta.classList.remove('input-erro');
});

// VALIDAÇÃO DO FORMULÁRIO
form.addEventListener('submit', (event) => {
    let enviarForm = true;

    // VALIDA NOME
    if (!nome.value.trim()) {
        nome.classList.add('input-erro');
        nome.placeholder = 'Nome é obrigatório!';
        enviarForm = false;
    }

    // VALIDA TELEFONE
    const telefoneLimpo = limparTelefone(telefone.value);
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        telefone.classList.add('input-erro');
        telefone.placeholder = 'Número inválido!';
        telefone.value = '';
        enviarForm = false;
    }

    // VALIDA EMAIL
    const eValido = validarEmail(email.value);
    if (eValido) {
        resultMensagem.textContent = 'E-mail válido!';
        resultMensagem.style.color = 'green';
    } else {
        email.classList.add('input-erro');
        resultMensagem.textContent = 'E-mail inválido!';
        resultMensagem.style.color = 'red';
        enviarForm = false;
    }

    // VALIDA DATA
    if (!data.value) {
        data.classList.add('input-erro');
        enviarForm = false;
    } else {
        // VERIFICA SE A DATA NÃO ESTÁ NO PASSADO
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const dataSelecionada = new Date(data.value + 'T00:00:00');
        if (dataSelecionada < hoje) {
            data.classList.add('input-erro');
            enviarForm = false;
            alert('A data selecionada não pode ser no passado!');
        }
    }

    // VALIDA HORÁRIO
    if (inputHorario.value === '') {
        inputHorario.classList.add('input-erro');
        enviarForm = false;
    }

    // VALIDA TIPO CONSULTA
    if (inputTipoConsulta.value === '') {
        inputTipoConsulta.classList.add('input-erro');
        enviarForm = false;
    }

    // VALIDA FORMA DE ATENDIMENTO
    if (!document.querySelector('input[name="tipo"]:checked')) {
        document.querySelector('.radio-group').classList.add('radio-erro');
        enviarForm = false;
    } else {
        document.querySelector('.radio-group').classList.remove('radio-erro');
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


// Mas você também pode bloquear direto no HTML sem precisar de JS, adicionando o atributo min no input de data:
// html<input 
//     type="date"
//     id="input-data"
//     min="" <!-- 👈 vai receber a data de hoje via JS -->
// >
// E no JS, lá no topo junto com as outras variáveis:
// javascript// BLOQUEIA DATAS PASSADAS DIRETO NO INPUT
// const hoje = new Date().toISOString().split('T')[0];
// data.setAttribute('min', hoje);