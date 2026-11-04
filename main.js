// 1° PASSO - CAPTURANDO OS ELEMENTO DO HTML

/*
O document representa a página html
getElementById() procura um elemento pelo seu ID
aqui guardamos o formulário em uma variável para conseguir
trabalhar com ele utilizando Javascript
*/
let formCep = document.getElementById("form-cep");

let inputCep = document.getElementById("input-cep");

let resultado = document.getElementById("resultado");

formCep.addEventListener("submit", function (event) {

    event.preventDefault();
    const cep = inputCep.value.trim();
    const validarCep = /^[0-9]{8}$/
    if (!validarCep.test(cep)) {
        resultado.innerHTML = '<p class="erro"> Por favor digite um Cep válido com 8 números. </p>'
        return

    }
    resultado.innerHTML = "<p>Buscando...</p>"
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultado.innerHTML = '<p class="erro"> CEP não encontrado</p>'
                return
            }
            resultado.innerHTML = `
<h2>Resultado</h2>
<p><strong>CEP:</strong>${data.cep}</p>
<p><strong>logradouro:</strong>${data.logradouro || "não informado"}</p>
<p><strong>Bairro:</strong>${data.bairro || "não informado"}</p>
<p><strong>Cidade:</strong>${data.localidade || "não informado"}</p>
<p><strong>Estado:</strong>${data.estado || "não informado"}</p>
`
        })
        .catch(() => {
            resultado.innerHTML = '<p class="erro"> Erro ao buscar o CEP. Tente novamente mais tarde </p>'
        })
});
