import "./styles.css";

  const todoItems = [];

  class ChecklistItem {
    constructor(name) {
      this.name = name;
      this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed
    }
  }

  class TodoItem extends ChecklistItem {
    constructor(name, description, dueDate, category, priority, notes) {
      super(name);
      this.description = description;
      this.dueDate = dueDate;
      this.category = category || "general";
      this.priority = priority || 0;
      this.notes = notes;
      this.checklist = [];
      this.completed = false;
    }

    editProperty(key, value) {
        this[key] = value
    }

    addChecklistItem(value) {
        this.checklist.push(new ChecklistItem(value))
    }
  }

  function createTodoItem(name, description, dueDate, category, priority, notes) {
    const item = new TodoItem(name, description, dueDate, category, priority, notes);
    todoItems.push(item)
  }