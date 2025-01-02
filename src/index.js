import "./styles.css";
import { TodoList } from "./todolist";

const DomNodes = (function () {
  const wrapper = document.getElementById("wrapper");
  const todoList = document.getElementById("todo");
  const doingList = document.getElementById("doing");
  const doneList = document.getElementById("done");

  return { wrapper, todoList, doingList, doneList };
})();

const myToDo = TodoList();
myToDo.createTodoItem(
  "Submit Project Report",
  "Complete and submit the final project report to the team leader. Ensure all data is accurate and conclusions are clear.",
  "01-05-25",
  "Work",
  2,
  "Double-check for any last-minute feedback from the team before submitting.",
  [
    { name: "Review all data and conclusions", completed: false },
    {
      name: "Proofread the document for grammar and clarity",
      completed: false,
    },
    {
      name: "Format report according to company guidelines",
      completed: false,
    },
    {
      name: "Submit to team leader",
      completed: false,
    },
    {
      name: "Confirm submission is received",
      completed: false,
    },
  ]
);
myToDo.createTodoItem(
  "Buy Groceries for the Week",
  "Purchase all the groceries needed for the upcoming week. Focus on fresh produce, meat, and pantry essentials.",
  "01-03-2025",
  "Home",
  0,
  "Use the grocery list app to check off items as you buy them.",
  [
    { name: "Apples and bananas", completed: false },
    { name: "Chicken breasts", completed: false },
    { name: "Spinach and lettuce", completed: false },
    { name: "Bread and pasta", completed: false },
    { name: "Milk and eggs", completed: false },
  ]
);
myToDo.createTodoItem(
  "Call the Doctor's Office",
  "Call to schedule an appointment for a routine check-up and to get a prescription refill.",
  "01-04-25",
  "Health",
  1,
  "Be sure to mention the need for a prescription refill during the call."
);

myToDo.getList()[1].setDoing();
myToDo.getList()[2].setDone();

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

// Function to sort and render the todo items
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

// Function to clear the display
function clearTodos() {
  DomNodes.todoList.textContent = "";
  DomNodes.doingList.textContent = "";
  DomNodes.doneList.textContent = "";
}
function showDetails(targetCard) {
  const cardDetails = targetCard.getElementsByClassName("todo-details");
  cardDetails[0].classList.toggle("hidden");
}

function showDetailsListener(e) {
  const targetCard = e.target.closest(".todo-item");
  if (targetCard) {
    showDetails(targetCard);
  }
}

function changeStatus(e) {
  const targetCard = e.target.closest(".todo-item");
  const cardIndex = targetCard.dataset.index;
  const targetBtn = e.target.closest(".action-btn");

  if (targetBtn) {
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
    clearTodos();
    renderTodos();
  }
}

renderTodos();

document.addEventListener("click", showDetailsListener);
document.addEventListener("click", changeStatus);