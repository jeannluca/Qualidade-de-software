document.addEventListener("DOMContentLoaded", () => {

    const valor1Input = document.getElementById("valor1");
    const valor2Input = document.getElementById("valor2");
    const resultadoElemento = document.getElementById("resultado");
    const erroElemento = document.getElementById("erro");
    const botoes = document.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const operacao = botao.getAttribute("data-op");
            calcular(operacao);
        });
    });

    function calcular(operacao) {
        limparErro();

        const valor1 = parseFloat(valor1Input.value);
        const valor2 = parseFloat(valor2Input.value);

        if (!validarEntrada(valor1, valor2)) return;

        const centavos1 = converterParaCentavos(valor1);
        const centavos2 = converterParaCentavos(valor2);

        let resultadoCentavos;

        switch (operacao) {
            case "+":
                resultadoCentavos = centavos1 + centavos2;
                break;
            case "-":
                resultadoCentavos = centavos1 - centavos2;
                break;
            case "*":
                resultadoCentavos = Math.round((centavos1 * centavos2) / 100);
                break;
            case "/":
                if (centavos2 === 0) {
                    mostrarErro("Não é possível dividir por zero.");
                    return;
                }
                resultadoCentavos = Math.round((centavos1 / centavos2) * 100);
                break;
            default:
                mostrarErro("Operação inválida.");
                return;
        }

        atualizarResultado(resultadoCentavos);
    }

    function validarEntrada(v1, v2) {
        if (isNaN(v1) || isNaN(v2)) {
            mostrarErro("Por favor, insira valores válidos.");
            return false;
        }
        return true;
    }

    function converterParaCentavos(valor) {
        return Math.round(valor * 100);
    }

    function atualizarResultado(centavos) {
        const valorFinal = centavos / 100;
        resultadoElemento.textContent = formatarMoeda(valorFinal);
    }

    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function mostrarErro(mensagem) {
        erroElemento.textContent = mensagem;
    }

    function limparErro() {
        erroElemento.textContent = "";
    }

});