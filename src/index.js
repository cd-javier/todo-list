import "./styles.css";
import { format } from "date-fns";

function TodoList() {
  // Array where the To Do items are stored
  const todoArr = [];

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
  class TodoItem extends ChecklistItem {
    constructor(name, description, category, priority, notes) {
      super(name);
      this.description = description;
      this.category = category || "general";
      this.priority = priority || 0;
      this.notes = notes;
      this.checklist = [];
      this.completed = false;
    }

    // Creates a due date
    set dueDate(date) {
      this._dueDate = new Date(date);
    }

    // Returns the due date formatted
    get dueDate() {
      return format(this._dueDate, "dd MMM yyyy");
    }

    addChecklistItem(value) {
      this.checklist.push(new ChecklistItem(value));
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