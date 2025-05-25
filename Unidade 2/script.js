let visor = document.getElementById('visor');
let entradaAtual = '';
let operador = '';
let novaEntrada = '';

function atualizarVisor() { //função para atualizar o visor da calculadora
    if (operador && novaEntrada) {
        const operadorvisor = {
            '/': '÷',
            '*': '×',
            '-': '−',
            '+': '+'
        }[operador] || operador;
        visor.textContent = `${novaEntrada} ${operadorvisor} ${entradaAtual || '0'}`;
    } else {
        visor.textContent = entradaAtual || '0';
    }
}

function adicionarNumero(numero) { //função para adicionar os numéros 
    if (numero === '.' && entradaAtual.includes('.')) return;
    entradaAtual += numero;
    atualizarVisor();
}

function adicionarOperador(op) { // Função para adicionar o operador (+, -, *, /)
    if (entradaAtual === '') return;
    if (novaEntrada !== '') {
        calcular();
    }
    operador = op;
    novaEntrada = entradaAtual;
    entradaAtual = '';
    atualizarVisor();
}

function limparVisor() { // Função para limpar o visor
    entradaAtual = '';
    novaEntrada = '';
    operador = '';
    atualizarVisor();
}

function alternarSinal() { // Função para alternar o sinal do número (positivo ou negativo)
    if (entradaAtual) {
        entradaAtual = (parseFloat(entradaAtual) * -1).toString();
        atualizarVisor();
    }
}

function porcentagem() { // Função para calcular porcentagem
    if (entradaAtual) {
        entradaAtual = (parseFloat(entradaAtual) / 100).toString();
        atualizarVisor();
    }
}

function calcular() { // Função para realizar os cálculos
    if (novaEntrada === '' || entradaAtual === '') return; //O Calculo só é realizado se tiver dois numeros
    let resultado;
    const anterior = parseFloat(novaEntrada);
    const atual = parseFloat(entradaAtual);
    switch (operador) { //Verifica o perador, para fazer a operação correspondente 
        case '+':
            resultado = anterior + atual;
            break;
        case '-':
            resultado = anterior - atual;
            break;
        case '*':
            resultado = anterior * atual;
            break;
        case '/':
            resultado = anterior / atual;
            break;
        default:
            return;
    }

entradaAtual = resultado.toString();
operador = '';
novaEntrada = '';
atualizarVisor();
}