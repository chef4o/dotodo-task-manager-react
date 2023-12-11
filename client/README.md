# DOTODO TASK MANAGER

**Initial setup via React + Vite**

## Concept

The DOTODO app aims to provide various functionalities for assistance with our everyday personal tasks in three dimensions: 
-	free-hand notes 
-	to-do tasks and checklists
-	calendar events
Each functionality has its own concept and design oriented towards intuitiveness, flexibility and detail. 
Functionalities
1. Notes elements
   - id
   - position           //defines the position of the element on the screen
   - title              // non-mandatory field to give idea of the content
   - content            // mandatory field containing the task details
   - trackProgress      // functionality that gives the option to track the task. On ‘Start’ it sets a start date and starts counting days toward                                              completion. The ‘Start” button changes to ‘Stop’. On pressing Stop it records competedOn date and the ‘Stop’ button                                                 changes to ‘Continue’. Pressing it remove the completedOn date.
   - startDate
   - dueDate            //gives you the option to set a due date which triggers alerts and styles
   - completedOn
   - isArchived         //lets you archive the note, blurring its content and putting it in the archive bin. Can be reopened later on.
   - owner
   - sharedWith         //lets you share the task with friends 

2. Checklists elements:
   - id
   - position            //defines the position of the element on the screen
   - type                //choose between General to-do and Shopping list
   - title
   - elements
      - position
      - content
      - dueDate
      - status        //Not started/In progress/Done for general tasks; Pending/Done for shopping list
      - note
   - sharedWith
   - isArchived
   - dueDate

3. Events elements:
   - id
   - type                //choose between Birthday, Name day, Vacation, Event, etc.
   - title
   - icon
   - content
   - date
   - sharedWith
   - isArchived
