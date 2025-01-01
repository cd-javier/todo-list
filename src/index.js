import "./styles.css";
import { format } from "date-fns";

function TodoList() {
  // Array where the To Do items are stored
    let todoArr = []

    // To load the local storage
    //
    // if(localStorage.todoList) {
    //     todoArr = JSON.parse(localStorage.todoList)
    // }


  // To get the list without being able to modify it
  function getList() {
    return [...todoArr]
  }

  // To get a single item of the list and modify it
  function getListItem(index) {
    return todoArr[index]
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
    constructor(name, description, category, priority, notes) {
      this.name = name;
      this.description = description;
      this.category = category || "general";
      this.priority = priority || 0;
      this.notes = notes;
      this.checklist = [];
      this.status = "To do";
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
        this.status = "Doing"
    }

    setDone() {
        this.status = "Done"
    }

    setToDo() {
        this.status = "To do"
    }
  }

  // To create a TodoItem and push it to the todoArr
  function createTodoItem(
    name,
    description,
    dueDate,
    category,
    priority,
    notes
  ) {
    const item = new TodoItem(
      name,
      description,
      dueDate,
      category,
      priority,
      notes
    );
    todoArr.push(item);
  }

  // To remove an item from the list
  function deleteItem(index) {
    todoArr.splice(index, 1)
  }

  return { getList, getListItem, createTodoItem, deleteItem };
}