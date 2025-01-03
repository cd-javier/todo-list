import { format } from "date-fns";

function TodoList() {
  // Array where the To Do items are stored
  let todoArr = [];

  // To load the local storage
  function loadList() {
    if (localStorage.todoList && JSON.parse(localStorage.todoList).length > 0) {
      todoArr = JSON.parse(localStorage.getItem("todoList"));
      todoArr.forEach((item) => {
        Object.setPrototypeOf(item, new TodoItem());
        item.checklist.forEach((item => {
          Object.setPrototypeOf(item, new ChecklistItem());
        }))
      });
    } else {
      // If there isn't local storage, gives sample items
      createTodoItem(
        "Submit Project Report",
        "Complete and submit the final project report to the team leader. Ensure all data is accurate and conclusions are clear.",
        "01-05-2025",
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
      createTodoItem(
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
      createTodoItem(
        "Call the Doctor's Office",
        "Call to schedule an appointment for a routine check-up and to get a prescription refill.",
        "01-04-2025",
        "Health",
        1,
        "Be sure to mention the need for a prescription refill during the call."
      );
    }
  }

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
    constructor(
      name,
      description,
      dueDate,
      category,
      priority = 0,
      notes,
      checklist = []
    ) {
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

  function getCounter() {
    const todo = getList().filter((item) => item.status === "todo").length;
    const doing = getList().filter((item) => item.status === "doing").length;
    const done = getList().filter((item) => item.status === "done").length;

    return { todo, doing, done };
  }

  return { loadList, getList, getListItem, createTodoItem, deleteItem, getCounter };
}

export { TodoList };
