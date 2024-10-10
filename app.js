const taskManager = () => {
  let todo = [];
  const inputTodo = document.getElementById("inputTodo");
  const addTodoButton = document.getElementById("addTodoButton");
  const listTodo = document.getElementById("listTodo");
  const addTodo = () => {
    const inputText = inputTodo.value.trim();
    if (inputText == "") {
      inputTodo.value = "";
      alert("Enter Something!");
      return;
    }
    todo.push(inputText);
    listTodo.appendChild(addNewTask(inputText, todo.length - 1));
    inputTodo.value = "";
  };
  const addNewTask = (text, index) => {
    const li = document.createElement("li");
    const newTask = document.createElement("span");
    newTask.innerText = text;
    const editText = document.createElement("input");
    editText.value = text;
    editText.style.display = "none";
    const editButton = createButton("Edit", () =>
      editTodo(newTask, editText, index)
    );
    li.appendChild(newTask);
    li.appendChild(editText);
    li.appendChild(editButton);
    return li;
  };
  const editTodo = (newTask, editText, index) => {
    if (editText.style.display == "none") {
      editText.style.display = "inline";
      newTask.style.display = "none";
      editText.focus();
    } else {
      saveTask(editText.value, index);
    }
  };
  const saveTask = (text, index) => {
    const editedText = text.trim();
    if (editedText == "") {
      alert("Enter something!");
      return;
    }
    todo[index] = editedText;
    const editedElement = listTodo.children[index];
    editedElement.querySelector("span").innerText = editedText;
    editedElement.querySelector("input").value = editedText;
    editedElement.querySelector("input").style.display = "none";
    editedElement.querySelector("span").style.display = "inline";
  };
  const createButton = (text, onClick) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.onclick = onClick;
    return button;
  };
  addTodoButton.addEventListener("click", addTodo);
};
document.addEventListener("DOMContentLoaded", taskManager);
