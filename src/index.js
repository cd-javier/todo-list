import "./styles.css";
import { TodoList } from "./todolist";

// Selects necessary nodes on the DOM
const DomNodes = (function () {
  const wrapper = document.getElementById("wrapper");
  const todoList = document.getElementById("todo");
  const doingList = document.getElementById("doing");
  const doneList = document.getElementById("done");
  const newBtn = document.getElementById("new-btn");

  return { wrapper, todoList, doingList, doneList };
})();

// Creates a new TodoList and uses methods
const myToDo = TodoList();

// -------------------------------
//          DOM Creation
// -------------------------------
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

  //Details
  const details = createDiv("todo-details");
  details.classList.add("hidden");

  // Description
  if (obj.description) {
    const description = createDiv("description", obj.description);
    details.appendChild(description);
  }
  // Checklist
  if (obj.checklist.length !== 0) {
    const checklist = createDiv("checklist");
    const ul = document.createElement("ul");
    obj.checklist.forEach((item, j) => {
      const li = document.createElement("li");
      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      if (item.completed) {
        input.setAttribute("checked", true);
      }
      input.id = index + "-" + j;
      const label = document.createElement("label");
      label.setAttribute("for", index + "-" + j);
      label.textContent = item.name;
      li.append(input, label);

      ul.appendChild(li);
    });
    checklist.appendChild(ul);
    details.appendChild(checklist);
  }

  if (obj.notes) {
    const notes = createDiv("notes", obj.notes);
    details.appendChild(notes);
  }

  // Buttons
  const buttons = createDiv("buttons");
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "Edit";

  const todoBtn = document.createElement("button");
  todoBtn.textContent = "❎";
  todoBtn.dataset.action = "todo";
  todoBtn.classList.add("action-btn");
  const doingBtn = document.createElement("button");
  doingBtn.textContent = "☑️";
  doingBtn.dataset.action = "doing";
  doingBtn.classList.add("action-btn");
  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✅";
  doneBtn.dataset.action = "done";
  doneBtn.classList.add("action-btn");
  buttons.append(editBtn, todoBtn, doingBtn, doneBtn);
  details.appendChild(buttons);

  todoCard.appendChild(details);

  return todoCard;
}

// Function to clear the display
function clearTodos() {
  DomNodes.todoList.textContent = "";
  DomNodes.doingList.textContent = "";
  DomNodes.doneList.textContent = "";
}

// Function to sort and render the todo items
function renderTodos() {
  // Starts by clearing the display
  clearTodos();

  // Populates the headers
  const todoHeading = document.createElement("h2");
  todoHeading.textContent = "To Do";
  DomNodes.todoList.appendChild(todoHeading);
  const doingHeading = document.createElement("h2");
  doingHeading.textContent = "Doing";
  DomNodes.doingList.appendChild(doingHeading);
  const doneHeading = document.createElement("h2");
  doneHeading.textContent = "Done";
  DomNodes.doneList.appendChild(doneHeading);

  // Creates a "new item" button
  const newItemBtn = document.createElement("button");
  newItemBtn.textContent = "New Item";
  newItemBtn.classList.add("new-btn");
  newItemBtn.id = "new-btn";
  DomNodes.todoList.appendChild(newItemBtn);

  // Creates a new array with the list in DOM elements
  const domArr = myToDo
    .getList()
    .map((elm, index) => createDomCard(elm, index));

  // Sorts the items in their respective column
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

// -------------------------------
//       List Manipulation
// -------------------------------
// Function to open up the card and show the details
function showDetails(targetCard) {
  const cardDetails = targetCard.getElementsByClassName("todo-details");
  cardDetails[0].classList.toggle("hidden");
}

// Applies showDetails in an event listener
function showDetailsListener(e) {
  const targetCard = e.target.closest(".todo-item");
  if (targetCard) {
    showDetails(targetCard);
  }
}

// Function to change the status of the item depending on what button is clicked
function changeStatus(e) {
  const targetCard = e.target.closest(".todo-item");
  const cardIndex = targetCard ? targetCard.dataset.index : null;
  const targetBtn = e.target.closest(".action-btn");

  if (targetBtn && cardIndex !== null) {
    switch (targetBtn.dataset.action) {
      case "todo":
        myToDo.getList()[cardIndex].setToDo();
        break;
      case "doing":
        myToDo.getList()[cardIndex].setDoing();
        break;
      case "done":
        myToDo.getList()[cardIndex].setDone();
        break;
    }
    renderTodos();
  }
}

// -------------------------------
//         Item Creation
// -------------------------------

// ---------------------------------
// Init - Finalize - Event Listeners
// ---------------------------------
// Initializes the application
function init() {
  myToDo.loadList();
  renderTodos();
  EventListeners();
}

// Saves the data in local storage
function finalize() {
  localStorage.todoList = JSON.stringify(myToDo.getList());
}

// Creates all the event listeners
function EventListeners() {
  document.addEventListener("click", showDetailsListener);
  document.addEventListener("click", changeStatus);
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("unload", finalize);
