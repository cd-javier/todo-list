import { format } from "date-fns";

function TodoList() {
  // Array where the To Do items are stored
  let todoArr = [];

  // To load the local storage
  //
  // if(localStorage.todoList) {
  //     todoArr = JSON.parse(localStorage.todoList)
  // }

  // To get the list without being able to modify it
  function getList() {
    return [...todoArr];
  }

  // To get a single item of the list and modify it
  function getListItem(index) {
    return todoArr[index];
  }

  // All items that are checklists
  class ChecklistItem {
    constructor(name) {
      this.name = name;
      this.completed = false;
    }

    toggleComplete() {
      this.completed = !this.completed;
    }
  }

  // To Do items
  class TodoItem {
    constructor(name, description, dueDate, category, priority = 0, notes, checklist = []) {
      this.name = name;
      this.description = description;
      this._dueDate = new Date(dueDate);
      this.category = category || "general";
      this.priority = priority;
      this.notes = notes;
      this.checklist = checklist;
      this.status = "todo";
    }

    // Creates a due date
    set dueDate(date) {
      this._dueDate = new Date(date);
    }

    // Returns the due date formatted
    get dueDate() {
      return format(this._dueDate, "eee dd MMM yyyy");
    }

    // Adds an item to the checklist
    addChecklistItem(value) {
      this.checklist.push(new ChecklistItem(value));
    }

    // Modifies the status of the item
    setDoing() {
      this.status = "doing";
    }

    setDone() {
      this.status = "done";
    }

    setToDo() {
      this.status = "todo";
    }
  }

  // To create a TodoItem and push it to the todoArr
  function createTodoItem(
    name,
    description,
    dueDate,
    category,
    priority,
    notes,
    checklist
  ) {
    const item = new TodoItem(
      name,
      description,
      dueDate,
      category,
      priority,
      notes,
      checklist
    );
    todoArr.push(item);
  }

  // To remove an item from the list
  function deleteItem(index) {
    todoArr.splice(index, 1);
  }

  return { getList, getListItem, createTodoItem, deleteItem };
}

export { TodoList };
