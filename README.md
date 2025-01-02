# TO DO LIST
JavaScript project for The Odin Project fullstack JavaScript course. 

The goal is to create a todo list application.

## To do items
All to do items should be objects that contain the following:

    Name: String (!)
    Description: String
    Category: String (with a default value)
    Priority: Number (with a default value)
    Notes: String.
    Completed: Boolean (default false) (!)

## Pseudocode
### To Do List Module

    Function TodoList

        Array todoArr

        Function getList:
            returns the todoArr

        Function getListItem:
            Takes one variable index
            Returns the element from the todoArr with that index

        Class ChecklistItem
            Constructor:
                - Name
                - Completed (boolean default false)
            
            Method toggleComplete
                Toggles the complete value


        Class TodoItem extends ChecklistItem
            Constructor:
                - Name
                - Description (default empty)
                - Category (default empty)
                - Priority (default 0)
                - Notes (default empty)
                - Checklist (array)
                - Completed (boolean default false)

            Method set dueDate
                Creates a new dueDate
            
            Method get dueDate
                Returns the dueDate formatted

            Method editProperty
                Takes two variables: key, newValue
                Sets a new value for the key

            Method addChecklistItem
                Takes one variable
                Creates a new ChecklistItem
                Pushes it to the checklist array


        Function createItem
            Takes the same variables as the factory TodoItem

            Creates a TodoItem object
            Pushes it to the todoItems array

        Function deleteItem
            Takes one variable index
            Removes that element from the array

        Return
            getList
            getListItem
            createTooItem
            deleteItem

### UI Module

    IIFE DomNodes
        Selects three different lists from the DOM
        Returns each element

    Variable myToDo
        Calls ToDoList function
    
    Function createDomCard
        Takes one variable object
        Creates an element todoCard
            Assigns class todo-item

        Creates an element heading
            Assigns class .todo-heading
        Creates an element title
            Assigns class .title
            Sets textContent
        Creates an element category
            Assigns class .category
        Appends title and category to heading

        Creates an element subheading
            Assigns class .todo-subheading
        Creates an element priority
            Assigns class .priority
            Sets textContent
        Creates an element dueDate
            Assigns class .due-date
            Sets textContent
        Appends priority and dueDate to subheading

        Creates an element description
            Assigns class .description
            Sets textContent

        Creates an element details
            Assigns class .details
            Assigns class .hidden
            
        <!-- To complete later on -->
        Creates an element checklist
        
        Creates an element notes
            Assigns class notes
            Sets textContent

        Creates an element buttons
            Assigns class buttons
        Creates an element editBtn
            Assigns class editBtn
        Creates an element doingBtn
        Creates an element doneBtn
        Appends three buttons to buttons

        Appends to details
            checklist
            notes
            buttons

        Appends to todoCard
            heading
            subheading
            description
            details

        Returns todoCard