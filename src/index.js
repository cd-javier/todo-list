import "./styles.css";
import { TodoList } from "./todolist";
import { format } from "date-fns";

// Selects necessary nodes on the DOM
const DomNodes = (function () {
  const todoList = document.getElementById("todo");
  const doingList = document.getElementById("doing");
  const doneList = document.getElementById("done");
  const newModal = document.getElementById("new-item-modal");
  const newForm = document.forms["new-item-form"];
  const newFormChecklist = document.getElementById("checklist-items");
  const newCancelBtn = document.getElementById("new-cancel-btn");
  const todoCounter = document.getElementById("todo-counter");
  const doingCounter = document.getElementById("doing-counter");
  const doneCounter = document.getElementById("done-counter");

  return {
    todoList,
    doingList,
    doneList,
    newModal,
    newForm,
    newFormChecklist,
    newCancelBtn,
    todoCounter,
    doingCounter,
    doneCounter,
  };
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

// Function to create Todo Do Item card contents
function createCardContent(obj, index) {
  // Heading
  const heading = createDiv("todo-heading");
  const title = createDiv("title", obj.name);
  heading.appendChild(title);
  if (obj.category) {
    const category = createDiv("category", obj.category);
    heading.appendChild(category);
  }

  // Subheading
  const subheading = createDiv("todo-subheading");
  const priority = createDiv("priority");
  switch (obj.priority) {
    case 1:
      priority.textContent = "🟡 Medium";
      break;
    case 2:
      priority.textContent = "🔴 High";
      break;
    default:
      priority.textContent = "🟢 Low";
      break;
  }
  subheading.appendChild(priority);

  if (obj.dueDate) {
    const dueDate = createDiv("due-date", obj.dueDate);
    subheading.appendChild(dueDate);
  }

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
        input.checked = true;
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

  const expand = createDiv("expand-collapse", "see more");

  return [heading, subheading, details, expand];
}

// Function to create each To Do item card
function createDomCard(obj, index) {
  const todoCard = createDiv("todo-item");
  todoCard.dataset.status = obj.status;
  todoCard.dataset.index = index;

  // Sets a different class depending on the priority
  switch (obj.priority) {
    case 1:
      todoCard.classList.add("priority-medium");
      break;
    case 2:
      todoCard.classList.add("priority-high");
      break;
    default:
      todoCard.classList.add("priority-low");
      break;
  }

  const todoContent = createCardContent(obj, index);
  todoContent.forEach((item) => {
    todoCard.appendChild(item);
  });

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

  // Populates the counters
  renderCounters();

  // Adds checklist input
  renderChecklistInput();

  // Adds event listener for checkboxes
  checkboxEventListener()
}

function checkboxEventListener() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      let j, i;
      [i, j] = checkbox.id.split("-")
      myToDo.getList()[i].checklist[j].toggleComplete()
    })
  })
}

function renderCounters() {
  DomNodes.todoCounter.textContent = myToDo.getCounter().todo;
  DomNodes.doingCounter.textContent = myToDo.getCounter().doing;
  DomNodes.doneCounter.textContent = myToDo.getCounter().done;
}

function renderChecklistInput() {
  DomNodes.newFormChecklist.textContent = "";
  DomNodes.newFormChecklist.appendChild(
    createChecklistInput("new-checklist-item")
  );
}

function createChecklistInput(id = 0, name = 0, textContent = "", buttonContent = "+") {
  const checklistInputWrapper = document.createElement("li");
  const checklistInput = document.createElement("input");
  if (name) {
    checklistInput.setAttribute("name", name);
  }
  if (id) {
    checklistInput.id = id;
  }
  if (textContent) {
    checklistInput.value = textContent;
  }
  checklistInputWrapper.appendChild(checklistInput);

  const addButton = createDiv("checklist-button", buttonContent);
  checklistInputWrapper.appendChild(addButton);

  return checklistInputWrapper;
}

// -------------------------------
//       List Manipulation
// -------------------------------
// Function to open up the card and show the details
function showDetails(targetCard) {
  const cardDetails = targetCard.querySelector(".todo-details");
  const expandCollapse = targetCard.querySelector(".expand-collapse");
  if (cardDetails.classList.contains("hidden")) {
    expandCollapse.textContent = "see less";
  } else {
    expandCollapse.textContent = "see more";
  }
  cardDetails.classList.toggle("hidden");
}

// Applies showDetails in an event listener
function showDetailsListener(e) {
  const targetCard = e.target.closest(".todo-item");
  const targetExpandCollapse = e.target.closest(".expand-collapse");
  const heading = e.target.closest(".todo-heading");
  if (
    targetCard &&
    !targetCard.dataset.editing &&
    (targetExpandCollapse || heading)
  ) {
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
    showDetails(document.querySelector(`[data-index="${cardIndex}"]`));
  }
}

// -------------------------------
//         Item Creation
// -------------------------------
function toggleNewItemModal() {
  DomNodes.newModal.classList.toggle("hidden");
}

function showNewItemModal(e) {
  const target = e.target.closest("#new-btn");
  if (target) {
    toggleNewItemModal();
  }
}

function createNewItem(e) {
  e.preventDefault();
  const form = DomNodes.newForm;

  const name = form["item-name"].value;
  const description = form["description"].value;
  const dueDate = form["due-date"].value || new Date();
  const category = form["category"].value;
  const priority = Number(form["priority"].value);
  const notes = form["notes"].value;

  myToDo.createTodoItem(name, description, dueDate, category, priority, notes);

  form.reset();
  toggleNewItemModal();
  renderTodos();
}

// -------------------------------
//          Item Editing
// -------------------------------
function enableEditing(e) {
  const targetBtn = e.target.closest(".edit-btn");
  if (targetBtn) {
    const targetCard = e.target.closest(".todo-item");
    const cardIndex = targetCard ? targetCard.dataset.index : null;
    if (cardIndex !== null) {
      const item = myToDo.getList()[cardIndex];
      renderEditingForm(targetCard, item, cardIndex);
    }
  }
}

// Creates a form inside of the card to edit it
function renderEditingForm(targetCard, item, index) {
  targetCard.textContent = "";
  targetCard.dataset.editing = true;

  const editForm = document.createElement("form");
  editForm.id = "edit-item-form";
  const ul = document.createElement("ul");

  // Item name
  const editName = document.createElement("li");
  const editNameLabel = document.createElement("label");
  editNameLabel.setAttribute("for", "edit-item-name");
  editNameLabel.textContent = "Item Name";
  editName.appendChild(editNameLabel);
  const editNameInput = document.createElement("input");
  editNameInput.id = "edit-item-name";
  editNameInput.setAttribute("name", "item-name");
  editNameInput.setAttribute("required", true);
  editNameInput.value = item.name;
  editName.appendChild(editNameInput);
  const editNameSpan = document.createElement("span");
  editName.appendChild(editNameSpan);
  ul.appendChild(editName);

  // Description
  const editDescription = document.createElement("li");
  const editDescriptionLabel = document.createElement("label");
  editDescriptionLabel.setAttribute("for", "edit-description");
  editDescriptionLabel.textContent = "Description";
  editDescription.appendChild(editDescriptionLabel);
  const editDescriptionInput = document.createElement("textarea");
  editDescriptionInput.id = "edit-description";
  editDescriptionInput.setAttribute("name", "description");
  editDescriptionInput.textContent = item.description;
  editDescription.appendChild(editDescriptionInput);
  ul.appendChild(editDescription);

  // Category
  const editCategory = document.createElement("li");
  const editCategoryLabel = document.createElement("label");
  editCategoryLabel.setAttribute("for", "edit-category");
  editCategoryLabel.textContent = "Category";
  editCategory.appendChild(editCategoryLabel);
  const editCategoryInput = document.createElement("input");
  editCategoryInput.id = "edit-category";
  editCategoryInput.setAttribute("name", "category");
  editCategoryInput.value = item.category;
  editCategory.appendChild(editCategoryInput);
  ul.appendChild(editCategory);

  // Priority
  const editPriority = document.createElement("li");
  editPriority.classList.add("select-wrapper");
  const editPriorityLabel = document.createElement("label");
  editPriorityLabel.setAttribute("for", "edit-priority");
  editPriorityLabel.textContent = "Priority";
  editPriority.appendChild(editPriorityLabel);

  const editPrioritySelection = document.createElement("select");
  editPrioritySelection.id = "edit-priority";
  editPrioritySelection.setAttribute("name", "priority");
  const optionPriorityLow = document.createElement("option");
  optionPriorityLow.setAttribute("value", 0);
  optionPriorityLow.textContent = "Low";
  const optionPriorityMedium = document.createElement("option");
  optionPriorityMedium.setAttribute("value", 1);
  optionPriorityMedium.textContent = "Medium";
  const optionPriorityHigh = document.createElement("option");
  optionPriorityHigh.setAttribute("value", 2);
  optionPriorityHigh.textContent = "High";
  switch (item.priority) {
    case 0:
      optionPriorityLow.setAttribute("selected", "selected");
      break;
    case 1:
      optionPriorityMedium.setAttribute("selected", "selected");
      break;
    case 2:
      optionPriorityHigh.setAttribute("selected", "selected");
      break;
  }
  editPrioritySelection.append(
    optionPriorityLow,
    optionPriorityMedium,
    optionPriorityHigh
  );
  editPriority.appendChild(editPrioritySelection);
  ul.appendChild(editPriority);

  // Due date
  const editDueDate = document.createElement("li");
  const editDueDateLabel = document.createElement("label");
  editDueDateLabel.setAttribute("for", "edit-due-date");
  editDueDateLabel.textContent = "Due Date";
  editDueDate.appendChild(editDueDateLabel);
  const editDueDateInput = document.createElement("input");
  editDueDateInput.setAttribute("type", "date");
  editDueDateInput.id = "edit-due-date";
  editDueDateInput.setAttribute("name", "due-date");
  editDueDateInput.valueAsDate = new Date(format(item.dueDate, "yyyy-MM-dd"));
  editDueDate.appendChild(editDueDateInput);
  ul.appendChild(editDueDate);

  const editChecklist = document.createElement("li");
  const editChecklistLabel = document.createElement("label");
  editChecklistLabel.textContent = "Checklist";
  editChecklist.append(editChecklistLabel);
  const editChecklistList = document.createElement("ul");
  editChecklistList.classList.add("checklist-items");

  item.checklist.forEach((item, itemIndex) => {
    editChecklistList.appendChild(createChecklistInput(0, `${index}-${itemIndex}`, item.name, "-"));
  });

  editChecklist.appendChild(editChecklistList);
  ul.appendChild(editChecklist)

  // Notes
  const editNotes = document.createElement("li");
  const editNotesLabel = document.createElement("label");
  editNotesLabel.setAttribute("for", "edit-notes");
  editNotesLabel.textContent = "Notes";
  editNotes.appendChild(editNotesLabel);
  const editNotesInput = document.createElement("textarea");
  editNotesInput.id = "edit-notes";
  editNotesInput.setAttribute("name", "notes");
  editNotesInput.textContent = item.notes;
  editNotes.appendChild(editNotesInput);
  ul.appendChild(editNotes);

  // Buttons
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.textContent = "Delete";
  ul.appendChild(deleteBtn);
  const cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.textContent = "Cancel";
  ul.appendChild(cancelBtn);
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  ul.appendChild(saveBtn);

  editForm.appendChild(ul);
  targetCard.appendChild(editForm);
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    submitEditForm(item, index);
  });

  cancelBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    cancelEditForm(index);
  });

  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    deleteItem(index);
  });
}

function submitEditForm(item, index) {
  const form = document.forms["edit-item-form"];

  const name = form["edit-item-name"].value;
  const description = form["edit-description"].value;
  const category = form["edit-category"].value;
  const priority = Number(form["priority"].value);
  const dueDate = form["edit-due-date"].value;
  const notes = form["edit-notes"].value;

  item.name = name;
  item.description = description;
  item.category = category;
  item.priority = priority;
  item.dueDate = dueDate;
  item.notes = notes;

  renderTodos();
  showDetails(document.querySelector(`[data-index="${index}"]`));
}

function cancelEditForm(index) {
  renderTodos();
  showDetails(document.querySelector(`[data-index="${index}"]`));
}

function deleteItem(index) {
  if (confirm("Are you sure you want to delete this?")) {
    myToDo.deleteItem(index);
    renderTodos();
  }
}

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
  document.addEventListener("click", showNewItemModal);
  DomNodes.newForm.addEventListener("submit", createNewItem);
  DomNodes.newCancelBtn.addEventListener("click", toggleNewItemModal);
  document.addEventListener("click", enableEditing);
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("visibilitychange", finalize);
