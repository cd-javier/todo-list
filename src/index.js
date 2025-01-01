import "./styles.css";
import { format } from "date-fns";

const todoItems = [];

class ChecklistItem {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

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

  set dueDate(date) {
    this._dueDate = new Date(date);
  }

  get dueDate() {
    return format(this._dueDate, "dd MMM yyyy");
  }

  addChecklistItem(value) {
    this.checklist.push(new ChecklistItem(value));
  }
}

function createTodoItem(name, description, dueDate, category, priority, notes) {
  const item = new TodoItem(
    name,
    description,
    dueDate,
    category,
    priority,
    notes
  );
  todoItems.push(item);
}
