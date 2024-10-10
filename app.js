const taskManager = () => {
  const inputTodo = document.getElementById("inputTodo");
  const addTodoButton = document.getElementById("addTodoButton");
  const listTodo = document.getElementById("listTodo");

  const addTodo = () => {
    const inputText = inputTodo.value.trim();
    if (inputText === "") {
      alert("Enter Something!");
      return;
    }
    listTodo.appendChild(addNewTask(inputText));
    inputTodo.value = "";
  };

  const addNewTask = (text) => {
    const li = document.createElement("li");
    li.dataset.index = listTodo.children.length; 
    const newTask = document.createElement("span");
    newTask.innerText = text;
    const editText = document.createElement("input");
    editText.value = text;
    editText.style.display = "none";
    const editButton = createButton("Edit", () =>
      editTodo(newTask, editText, li)
    );
    const deleteButton = createButton("Delete", () => deleteTodo(li));
    li.appendChild(newTask);
    li.appendChild(editText);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    return li;
  };

  const deleteTodo = (li) => {
    listTodo.removeChild(li); 
    updateIndices(); 
  };

  const updateIndices = () => {
    const items = listTodo.children;
    for (let i = 0; i < items.length; i++) {
      items[i].dataset.index = i; 
    }
  };

  const editTodo = (newTask, editText, li) => {
    if (editText.style.display === "none") {
      editText.style.display = "inline";
      newTask.style.display = "none";
      editText.focus();
    } else {
      saveTask(editText.value, li);
    }
  };

  const saveTask = (text, li) => {
    const editedText = text.trim();
    if (editedText === "") {
      alert("Enter something!");
      return;
    }
    li.querySelector("span").innerText = editedText; 
    li.querySelector("input").value = editedText; 
    li.querySelector("input").style.display = "none"; 
    li.querySelector("span").style.display = "inline"; 
  };

  const createButton = (text, onClick) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.onclick = onClick;
    return button;
  };

  addTodoButton.addEventListener("click", addTodo);
  inputTodo.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  });
};

document.addEventListener("DOMContentLoaded", taskManager);
