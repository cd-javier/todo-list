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

Pseudocode

    Array todoItems

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