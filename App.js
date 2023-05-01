//((((((((((((((((((((((((((((((((((   Selecteurs    )))))))))))))))))))))))))))))))))
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

// ((((((((((((((((((((((((((((((((((   Ecouteurs    )))))))))))))))))))))))))))))))))
document.addEventListener("DOMContentLoaded", getTodo )
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener("input", filterTodo);




//((((((((((((((((((((((((((((((((((   Functions    )))))))))))))))))))))))))))))))))
function addTodo(event)
{
  event.preventDefault();
  //To do DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Créer le li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Ajouter la todo
  saveLocalTodo(todoInput.value);
  // Boutton check
  const completeButon = document.createElement("button");
  completeButon.innerHTML = `<i class="fas fa-check"></i>` ;
  completeButon.classList.add("complete-btn");
  todoDiv.appendChild(completeButon);
   // Boutton supprimer
   const trashButon = document.createElement("button");
   trashButon.innerHTML = `<i class="fas fa-trash"></i>` ;
   trashButon.classList.add("trash-btn");
   todoDiv.appendChild(trashButon);
   // Ajouter notre todo à TODO-List
   todoList.appendChild(todoDiv);
   todoInput.value ="";
};

function deleteCheck(e){
      const item = e.target;
      // DELETE TODO
      if(item.classList[0] === "trash-btn"){
            item.parentElement.classList.add("fall");
            removeLocalTods(item.parentElement);
            item.parentElement.addEventListener("transitionend", function(){
            item.parentElement.remove();
            });
            //item.parentElement.remove();
      }
      // CHECK MARK
      if(item.classList[0] === "complete-btn"){
            item.parentElement.classList.toggle("completed");
      }
};

function filterTodo(e){
      const toDos = todoList.childNodes;
      toDos.forEach(function(todo){
            switch(e.target.value){
                  case "all":
                        todo.style.display = "flex";
                        break;
                  case "completed":
                        if (todo.classList.contains("completed")){
                              todo.style.display = "flex";
                        }else{
                              todo.style.display= "none";
                        }
                        break;
                  case "uncompleted":
                        if (!todo.classList.contains("completed")){
                              todo.style.display = "flex";
                        }else{
                              todo.style.display= "none";
                        }
                        break;   
            }
      })
};

function saveLocalTodo(todo){
      //cheker s'il y'a des icons existants
      let todos;
      if (localStorage.getItem("todos")=== null){
            todos = [];
      }else{
            todos= JSON.parse(localStorage.getItem("todos"))
      }
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
};

function getTodo(){
      let todos;
      if (localStorage.getItem("todos")=== null){
            todos = [];
      }else{
            todos= JSON.parse(localStorage.getItem("todos"))
      }
      todos.forEach(function(todo){
            const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
  // Créer le li
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Ajouter la todo

  // Boutton check
  const completeButon = document.createElement("button");
  completeButon.innerHTML = `<i class="fas fa-check"></i>` ;
  completeButon.classList.add("complete-btn");
  todoDiv.appendChild(completeButon);
   // Boutton supprimer
   const trashButon = document.createElement("button");
   trashButon.innerHTML = `<i class="fas fa-trash"></i>` ;
   trashButon.classList.add("trash-btn");
   todoDiv.appendChild(trashButon);
   // Ajouter notre todo à TODO-List
   todoList.appendChild(todoDiv);
   todoInput.value ="";
      })
};

function removeLocalTods(todo){
      let todos;
      if (localStorage.getItem("todos") === null){
            todos = [];
      }else{
            todos= JSON.parse(localStorage.getItem("todos"));
      }
      const todoIndex = todo.children[0].innerText;
      todos.splice(todos.indexOf(todoIndex), 1);
      localStorage.setItem("todos", JSON.stringify(todos));
};