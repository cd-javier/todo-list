import "./styles.css";
import { TodoList } from "./todolist";

const DomNodes = (function () {
  const todoList = document.getElementById("todo");
  const doingList = document.getElementById("doing");
  const doneList = document.getElementById("done");

  return { todoList, doingList, doneList };
})();

const myToDo = TodoList();
myToDo.createTodoItem(
  "do something",
  "you have to do something",
  "10-20-20",
  "work",
  0,
  "no notes"
);
myToDo.createTodoItem(
  "do something 2",
  "you have to do something",
  "10-20-20",
  "play",
  1,
  "no notes"
);
myToDo.createTodoItem(
  "do something 2",
  "you have to do something",
  "10-20-20",
  "home",
  2,
  "no notes"
);
myToDo.getList()[1].addChecklistItem("do something");
myToDo.getList()[1].addChecklistItem("do something 2");

// Helper function to create divs more easily
function createDiv(cssClass, text) {
  const div = document.createElement("div");
  div.classList.add(cssClass);
  div.textContent = text;
  return div;
}

// Function to create each To Do item card
function createDomCard(obj, index) {
  const todoCard = createDiv("todo-item");
  todoCard.dataset.status = obj.status;
  todoCard.dataset.index = index;

  // Heading
  const heading = createDiv("todo-heading");
  const title = createDiv("title", obj.name);
  heading.appendChild(title);
  if (obj.category) {
    const category = createDiv("category", obj.category);
    heading.appendChild(category);
  }
  todoCard.appendChild(heading);

  // Subheading
  const subheading = createDiv("todo-subheading");
  const priority = createDiv("priority");
  switch (obj.priority) {
    case 1:
      priority.textContent = "Medium";
      todoCard.classList.add("priority-medium");
      break;
    case 2:
      priority.textContent = "High";
      todoCard.classList.add("priority-high");
      break;
    default:
      priority.textContent = "Low";
      todoCard.classList.add("priority-low");
      break;
  }
  subheading.appendChild(priority);
  if (obj.dueDate) {
    const dueDate = createDiv("due-date", obj.dueDate);
    subheading.appendChild(dueDate);
  }
  todoCard.appendChild(subheading);

  // Description
  if (obj.description) {
    const description = createDiv("description", obj.description);
    todoCard.appendChild(description);
  }

  //Details
  const details = createDiv("todo-details");
  // details.classList.add("hidden")

  // Checklist
  if (obj.checklist.length !== 0) {
    const checklist = createDiv("checklist");
    const ul = document.createElement("ul");
    obj.checklist.forEach((item, j) => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      input.id = index + "-" + j
      const label = document.createElement("label");
      label.setAttribute("for", index + "-" + j);
      label.textContent = item.name;
      li.append(input, label)

      ul.appendChild(li);
    });
    checklist.appendChild(ul)
    details.appendChild(checklist);
  }

  const notes = createDiv("notes", obj.notes);
  details.appendChild(notes);

  // Buttons
  const buttons = createDiv("buttons");
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "edit";
  // ** Need to edit this logic **
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "<<";
  const nextBtn = document.createElement("button");
  nextBtn.textContent = ">>";
  buttons.append(editBtn, prevBtn, nextBtn);
  details.appendChild(buttons);

  todoCard.appendChild(details);

  return todoCard;
}

function renderTodos() {
  const domArr = myToDo
    .getList()
    .map((elm, index) => createDomCard(elm, index));

  domArr.forEach((card) => {
    switch (card.dataset.status) {
      case "todo":
        DomNodes.todoList.appendChild(card);
        break;
      case "doing":
        DomNodes.doingList.appendChild(card);
        break;
      case "done":
        DomNodes.doneList.appendChild(card);
        break;
    }
  });
}

renderTodos();
