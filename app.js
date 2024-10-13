const taskManager = () => {
  let todos = [];
  const $todoInput = document.getElementById("inputTodo");
  const $addTodoButton = document.getElementById("addTodoButton");
  const $todoList = document.getElementById("listTodo");
  const $feedbackMessage = document.getElementById("feedbackMessage");
  function renderTodos() {
    // iterate over the todos list, create specific todos, and insert them in the DOM
    $todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const todoElement = createTodo(todo, index);
      $todoList.appendChild(todoElement);
    });
  }
  function createTodo(todo, index) {
    // responsible for creating a todo element based on the todo object
    const $li = document.createElement("li");
    const $todoText = document.createElement("span");
    $todoText.textContent = todo.title;
    const $editText = document.createElement("input");
    $editText.value = todo.title;
    $editText.style.display = "none";
    const $errorMsg = document.createElement("div");
    $errorMsg.style.display = "none";
    const editButton = createButton("Edit", () =>
      onEditTodo($errorMsg, $todoText, $editText, index)
    );
    const deleteButton = createButton("Delete", () => onDeleteTodo(index));
    $li.appendChild($todoText);
    $li.appendChild($editText);
    $li.appendChild(editButton);
    $li.appendChild(deleteButton);
    $li.appendChild($errorMsg);
    return $li;
  }
  const createButton = (text, onClick) => {
    const $button = document.createElement("button");
    $button.innerText = text;
    $button.onclick = onClick;
    return $button;
  };
  function onAddTodo() {
    // responsible for delegating the work needed to create a todo object
    // for example,
    const inputText = $todoInput.value.trim();
    if (inputText == "") {
      showFeeback($feedbackMessage, "Please Enter a valid Todo item");
      return;
    }
    clearFeedback($feedbackMessage);
    const todo = {
      title: $todoInput.value,
      createdAt: Date.now(),
      isEditing: false,
    };
    todos.push(todo);
    renderTodos();
    $todoInput.value = "";
  }
  function onEditTodo($errorMsg, $todoText, $editText, index) {
    todos[index].isEditing = !todos[index].isEditing;
    if (todos[index].isEditing) {
      $editText.value = todos[index].title;
      $editText.style.display = "inline";
      $todoText.style.display = "none";
      $editText.focus();
    } else {
      const updateText = $editText.value.trim();
      if (updateText) {
        $editText.style.display = "none";
        $todoText.style.display = "inline";
        clearFeedback($errorMsg);
        todos[index].title = updateText;
        $todoText.textContent = updateText;
      } else {
        //show error message that cannot update
        msg = "Write something!";
        showFeeback($errorMsg, msg);
        todos[index].isEditing = true;
      }
    }
  }
  function onDeleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
  }
  function showFeeback(feedbackBlock, msg) {
    feedbackBlock.innerText = msg;
    feedbackBlock.style.color = "red";
    feedbackBlock.style.fontSize = "12px";
    feedbackBlock.style.display = "block";
  }
  function clearFeedback(feedbackBlock) {
    feedbackBlock.innerText = "";
    feedbackBlock.style.display = "none";
  }
  $addTodoButton.addEventListener("click", onAddTodo);
};

document.addEventListener("DOMContentLoaded", taskManager);
