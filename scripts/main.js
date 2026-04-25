const nome = document.getElementById('input-nome');
const telefone = document.getElementById('input-numero');
const email = document.getElementById('input-email');
const data = document.getElementById('input-data');
const inputHorario = document.getElementById('input-horario');
const inputTipoConsulta = document.getElementById('input-tipo-consulta');
const form = document.querySelector("form");
const resultMensagem = document.getElementById('resultMensagem');

// BLOQUEIA DATAS PASSADAS DIRETO NO INPUT
const hoje = new Date().toISOString().split('T')[0];
data.setAttribute('min', hoje);

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

// FUNÇÃO PARA LIMPAR TELEFONE
const limparTelefone = (telefone) => {
    return telefone.replace(/\D/g, '');
}

// FUNÇÃO PARA VALIDAR EMAIL
const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
}

// EVENTOS INPUT
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

// SUBMIT COM ENVIO PRA API
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let enviarForm = true;

    // NOME
    if (!nome.value.trim()) {
        nome.classList.add('input-erro');
        nome.placeholder = 'Nome é obrigatório!';
        enviarForm = false;
    }

    // TELEFONE
    const telefoneLimpo = limparTelefone(telefone.value);
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        telefone.classList.add('input-erro');
        telefone.placeholder = 'Número inválido!';
        telefone.value = '';
        enviarForm = false;
    }

    // EMAIL
    if (!validarEmail(email.value)) {
        email.classList.add('input-erro');
        resultMensagem.textContent = 'E-mail inválido!';
        resultMensagem.style.color = 'red';
        enviarForm = false;
    }

    // DATA
    if (!data.value) {
        data.classList.add('input-erro');
        enviarForm = false;
    } else {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const dataSelecionada = new Date(data.value + 'T00:00:00');

        if (dataSelecionada < hoje) {
            data.classList.add('input-erro');
            alert('A data selecionada não pode ser no passado!');
            enviarForm = false;
        }
    }

    // HORÁRIO
    if (inputHorario.value === '') {
        inputHorario.classList.add('input-erro');
        enviarForm = false;
    }

    // CONSULTA
    if (inputTipoConsulta.value === '') {
        inputTipoConsulta.classList.add('input-erro');
        enviarForm = false;
    }

    // ATENDIMENTO (radio)
    const atendimentoSelecionado = document.querySelector('input[name="tipo"]:checked');
    if (!atendimentoSelecionado) {
        document.querySelector('.radio-group').classList.add('radio-erro');
        enviarForm = false;
    } else {
        document.querySelector('.radio-group').classList.remove('radio-erro');
    }

    if (!enviarForm) return;

    // MONTA JSON
    const dados = {
        nome: nome.value.trim(),
        email: email.value.trim(),
        telefone: telefoneLimpo,
        data: data.value + "T00:00:00.0",
        horario: inputHorario.value,
        consulta: inputTipoConsulta.value,
        atendimento: atendimentoSelecionado.value
    };

    try {
        const response = await fetch('https://api-psi-mariana-de-assis.onrender.com/api/agendamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (response.ok) {
            resultMensagem.textContent = 'Agendamento realizado com sucesso!';
            resultMensagem.style.color = 'green';
            form.reset();
        } else {
            resultMensagem.textContent = resultado.message || 'Erro ao agendar';
            resultMensagem.style.color = 'red';
        }

    } catch (error) {
        console.error(error);
        resultMensagem.textContent = 'Erro ao conectar com a API';
        resultMensagem.style.color = 'red';
    }
});

// MENU HAMBURGUER
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('header nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('ativo');
    nav.classList.toggle('aberto');
});

document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('ativo');
        nav.classList.remove('aberto');
    });
});