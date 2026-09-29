function carregarDadosCadastro() {

    const dadosSalvos =
        localStorage.getItem('cadastroONG');

    if (!dadosSalvos) {
        return;
    }

    try {

        const dadosCadastro =
            JSON.parse(dadosSalvos);

        document.getElementById('nome').value =
            dadosCadastro.nome || '';

        document.getElementById('email').value =
            dadosCadastro.email || '';

        document.getElementById('cpf').value =
            dadosCadastro.cpf || '';

        document.getElementById('telefone').value =
            dadosCadastro.telefone || '';

        document.getElementById('cep').value =
            dadosCadastro.cep || '';

        document.getElementById('cidade').value =
            dadosCadastro.cidade || '';

        document.getElementById('endereco').value =
            dadosCadastro.endereco || '';

        if (dadosCadastro.participacao) {

            const opcao =
                document.querySelector(
                    `input[name="participacao"][value="${dadosCadastro.participacao}"]`
                );

            if (opcao) {
                opcao.checked = true;
            }
        }

    } catch (erro) {

        console.error(
            'Erro ao carregar os dados:',
            erro
        );

        localStorage.removeItem('cadastroONG');

    }
}


function validarFormulario() {

    const nome =
        document.getElementById('nome');

    const email =
        document.getElementById('email');

    const cpf =
        document.getElementById('cpf');

    const telefone =
        document.getElementById('telefone');

    const cep =
        document.getElementById('cep');

    const cidade =
        document.getElementById('cidade');

    const endereco =
        document.getElementById('endereco');

    const participacao =
        document.querySelector(
            'input[name="participacao"]:checked'
        );

    const mensagem =
        document.getElementById('form-message');

    mensagem.textContent = '';
    mensagem.className = 'form-message';

    const campos = [
        nome,
        email,
        cpf,
        telefone,
        cep,
        cidade,
        endereco
    ];

    campos.forEach(campo => {
        campo.style.borderColor = '';
        campo.removeAttribute('aria-invalid');
    });


    if (nome.value.trim() === '') {

        mostrarErro(
            nome,
            'Digite seu nome completo.'
        );

        return false;
    }


    if (nome.value.trim().length < 3) {

        mostrarErro(
            nome,
            'Digite um nome válido.'
        );

        return false;
    }


    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {

        mostrarErro(
            email,
            'Digite um e-mail válido.'
        );

        return false;
    }


    const cpfNumeros =
        cpf.value.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) {

        mostrarErro(
            cpf,
            'Digite um CPF válido.'
        );

        return false;
    }


    const telefoneNumeros =
        telefone.value.replace(/\D/g, '');

    if (
        telefoneNumeros.length !== 10 &&
        telefoneNumeros.length !== 11
    ) {

        mostrarErro(
            telefone,
            'Digite um telefone válido.'
        );

        return false;
    }


    const cepNumeros =
        cep.value.replace(/\D/g, '');

    if (cepNumeros.length !== 8) {

        mostrarErro(
            cep,
            'Digite um CEP válido.'
        );

        return false;
    }


    if (cidade.value.trim() === '') {

        mostrarErro(
            cidade,
            'Digite sua cidade.'
        );

        return false;
    }


    if (endereco.value.trim() === '') {

        mostrarErro(
            endereco,
            'Digite seu endereço.'
        );

        return false;
    }


    if (!participacao) {

        const mensagem =
            document.getElementById('form-message');

        mensagem.textContent =
            'Selecione uma forma de participação.';

        mensagem.className =
            'form-message error';

        return false;
    }


    return true;
}


function mostrarErro(campo, mensagem) {

    campo.style.borderColor = '#d9534f';

    campo.setAttribute(
        'aria-invalid',
        'true'
    );

    const formMessage =
        document.getElementById('form-message');

    formMessage.textContent = mensagem;

    formMessage.className =
        'form-message error';

    campo.focus();
}


function configurarFormulario() {

    const cadastroForm =
        document.getElementById('cadastroForm');

    if (!cadastroForm) {
        return;
    }

    if (
        cadastroForm.dataset.configurado === 'true'
    ) {
        return;
    }

    cadastroForm.dataset.configurado = 'true';

    carregarDadosCadastro();

    cadastroForm.addEventListener(
        'submit',
        function(event) {

            event.preventDefault();

            if (!validarFormulario()) {
                return;
            }

            const dadosCadastro = {

                nome:
                    document.getElementById('nome').value,

                email:
                    document.getElementById('email').value,

                cpf:
                    document.getElementById('cpf').value,

                telefone:
                    document.getElementById('telefone').value,

                cep:
                    document.getElementById('cep').value,

                cidade:
                    document.getElementById('cidade').value,

                endereco:
                    document.getElementById('endereco').value,

                participacao:
                    document.querySelector(
                        'input[name="participacao"]:checked'
                    ).value

            };

            localStorage.setItem(
                'cadastroONG',
                JSON.stringify(dadosCadastro)
            );

            const formMessage =
                document.getElementById('form-message');

            formMessage.textContent =
                'Cadastro concluído com sucesso!';

            formMessage.className =
                'form-message success';

            mostrarNotificacao(
                'Cadastro concluído com sucesso!'
            );

            cadastroForm.reset();

        }
    );

}


function mostrarNotificacao(mensagem) {

    const notificacaoExistente =
        document.querySelector(
            '.toast-notification'
        );

    if (notificacaoExistente) {
        notificacaoExistente.remove();
    }

    const container =
    document.createElement('div');

container.innerHTML =
    criarNotificacaoTemplate(mensagem);

const toast =
    container.firstElementChild;

document.body.appendChild(toast);
    setTimeout(() => {

        toast.classList.add('show');

    }, 50);

    setTimeout(() => {

        toast.classList.remove('show');

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}