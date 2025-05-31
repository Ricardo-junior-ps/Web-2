function adicionarTarefa() {
  const input = document.getElementById("tarefaInput");
  const texto = input.value.trim();
  const lista = document.getElementById("listaTarefas");

  if (texto === "") {
    alert("Digite uma tarefa.");
    return;
  }

  // Verifica r tarefas duplicadas
  const tarefas = lista.getElementsByTagName("li");
  for (let tarefa of tarefas) {
    const span = tarefa.querySelector("span");
    if (span.textContent === texto) {
      alert("Essa tarefa já está na lista.");
      return;
    }
  }

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = texto;

  const botoes = document.createElement("div");
  botoes.className = "botoes";

  const btnFinalizar = document.createElement("button");
  btnFinalizar.textContent = "Finalizar";
  btnFinalizar.className = "botaoFinalizar";
  btnFinalizar.onclick = function () {
    li.classList.toggle("finalizada");
  };

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.className = "botaoRemover";
  btnRemover.onclick = function () {
    lista.removeChild(li);
  };

  botoes.appendChild(btnFinalizar);
  botoes.appendChild(btnRemover);

  li.appendChild(span);
  li.appendChild(botoes);
  lista.appendChild(li);

  input.value = ""; 
}
