// --- MÁSCARAS --- //
function aplicarMascaraCNPJ(campo) {
  campo.value = campo.value.replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .slice(0, 18);
}

function aplicarMascaraTelefone(campo) {
  campo.value = campo.value.replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})$/, "$1-$2")
    .slice(0, 15);
}

function aplicarMascaraCEP(campo) {
  campo.value = campo.value.replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}

function aplicarMascaraUF(campo) {
  campo.value = campo.value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
}

function aplicarMascaraNumero(campo) {
  campo.value = campo.value.replace(/\D/g, "");
}

// --- VALIDAÇÕES --- //
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenha(senha) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(senha);
}

// Funções de erro visual
function mostrarErro(inputId, erroId) {
  document.getElementById(inputId).classList.add("erro");
  document.getElementById(erroId).style.display = "block";
}

function removerErro(inputId, erroId) {
  document.getElementById(inputId).classList.remove("erro");
  document.getElementById(erroId).style.display = "none";
}

function validarFormularioEtapa1() {
  let valido = true;

  // Razão Social
  if (razaoSocial.value.trim() === "") {
    mostrarErro("razaoSocial", "erro-razao");
    valido = false;
  } else {
    removerErro("razaoSocial", "erro-razao");
  }

  // CNPJ
  if (cnpj.value.trim().length !== 18) {
    mostrarErro("cnpj", "erro-cnpj");
    valido = false;
  } else {
    removerErro("cnpj", "erro-cnpj");
  }

  // Nome
  if (nomeCompleto.value.trim() === "") {
    mostrarErro("nomeCompleto", "erro-nome");
    valido = false;
  } else {
    removerErro("nomeCompleto", "erro-nome");
  }

  // Telefone
  if (telefone.value.trim().length !== 15) {
    mostrarErro("telefone", "erro-telefone");
    valido = false;
  } else {
    removerErro("telefone", "erro-telefone");
  }

  // Setor
  if (setorUsuario.value.trim() === "setor") {
    mostrarErro("setorUsuario", "erro-setor");
    valido = false;
  } else {
    removerErro("setorUsuario", "erro-setor");
  }

  // Cargo
  if (cargoUsuario.value.trim() === "cargo") {
    mostrarErro("cargoUsuario", "erro-cargo");
    valido = false;
  } else {
    removerErro("cargoUsuario", "erro-cargo");
  }

  // Email
  if (!validarEmail(email_input.value)) {
    mostrarErro("email_input", "erro-email");
    valido = false;
  } else {
    removerErro("email_input", "erro-email");
  }

  // Senha
  if (!validarSenha(senha_input.value)) {
    mostrarErro("senha_input", "erro-senha");
    valido = false;
    
  } else {
    removerErro("senha_input", "erro-senha");
  }

  // Confirmar Senha
  if (senha_input.value !== confirmacao_senha_input.value || confirmacao_senha_input.value === "") {
    mostrarErro("confirmacao_senha_input", "erro-confirmar");
    valido = false;
  } else {
    removerErro("confirmacao_senha_input", "erro-confirmar");
  }

  return valido;
}

function validarFormularioEtapa2() {
  let valido = true;

  // CEP
  if (cep.value.trim().length !== 9) {
    cep.classList.add("erro");
    valido = false;
  } else {
    cep.classList.remove("erro");
  }

  // UF
  if (uf.value.trim().length !== 2) {
    uf.classList.add("erro");
    valido = false;
  } else {
    uf.classList.remove("erro");
  }

  // Cidade
  if (cidade.value.trim() === "") {
    cidade.classList.add("erro");
    valido = false;
  } else {
    cidade.classList.remove("erro");
  }

  // Bairro
  if (bairro.value.trim() === "") {
    bairro.classList.add("erro");
    valido = false;
  } else {
    bairro.classList.remove("erro");
  }

  // Logradouro
  if (logradouro.value.trim() === "") {
    logradouro.classList.add("erro");
    valido = false;
  } else {
    logradouro.classList.remove("erro");
  }

  // Número
  if (numero.value.trim() === "") {
    numero.classList.add("erro");
    valido = false;
  } else {
    numero.classList.remove("erro");
    
  }

  return valido;
}

// --- APLICANDO MÁSCARAS --- //
document.getElementById("cnpj").addEventListener("input", function() {
  aplicarMascaraCNPJ(this);
});
document.getElementById("telefone").addEventListener("input", function() {
  aplicarMascaraTelefone(this);
});
document.getElementById("cep").addEventListener("input", function() {
  aplicarMascaraCEP(this);
});
document.getElementById("uf").addEventListener("input", function() {
  aplicarMascaraUF(this);
});
document.getElementById("numero").addEventListener("input", function() {
  aplicarMascaraNumero(this);
});

