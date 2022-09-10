const inputTarefa = document.querySelector(".input-nova-tarefa")
const btnTarefa = document.querySelector(".btn-add-tarefa")
const tarefas = document.querySelector(".tarefas")

// Cria a tarefa:
const criaTarefa = ((textInput) => {
    const li = criaLi()
    li.innerText = textInput
    tarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas();
})

//Cria uma li
const criaLi = (() => {
    const li = document.createElement("li");
    return li
})

// Cria um botao de apagar
const criaBotaoApagar = ((li) => {
    li.innerText += " ";
    const botaoApagar = document.createElement("button");
    botaoApagar.innerText = "Apagar"
    botaoApagar.setAttribute("class", "apagar")
    botaoApagar.setAttribute("title", "Apagar essa tarefa")
    li.appendChild(botaoApagar)
})

// Limpa o input texto
const limpaInput = (()=>{
    inputTarefa.value = "";
    inputTarefa.focus();
})

// Salva as tarefas e set no localStorage
const salvarTarefas = (() => {
    const liTarefas = tarefas.querySelectorAll("li")
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
        listaDeTarefas.push(tarefaTexto)
    }
    const tarefasJson = JSON.stringify(listaDeTarefas)
    localStorage.setItem("saveTarefas", tarefasJson);
})

// Adiciona as tarefas salvas na nova pagina
const adicionaTarefas = (()=>{
    const tarefas = localStorage.getItem("saveTarefas")
    const listaDeTarefas = JSON.parse(tarefas)
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
})

//  Chamando a funcao acima 
adicionaTarefas()



/////////////////////////////////////////////////////////////////////////

inputTarefa.addEventListener("keypress", (e)=>{
    if(!inputTarefa.value) return;

    if(e.keyCode == 13){
        criaTarefa(inputTarefa.value)
        limpaInput()
    }
})

btnTarefa.addEventListener("click", ()=> {
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
    limpaInput()
})


document.addEventListener("click", (e) => {
    const el = e.target;
    if(el.classList.contains("apagar")){
        el.parentElement.remove()
        salvarTarefas();
    }
})