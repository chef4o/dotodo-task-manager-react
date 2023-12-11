DOTODO TASK MANAGER

# Initial setup via React + Vite

**Concept**

The DOTODO app aims to provide various functionalities for assistance with our everyday personal tasks in three dimensions: 
-	free-hand notes 
-	to-do tasks and checklists
-	calendar events
Each functionality has its own concept and design oriented towards intuitiveness, flexibility and detail. 
Functionalities
1)	Notes elements
      "_id": 1,
      "position": 1, 			            //defines the position of the element on the screen
      "title": "Title",			          // non-mandatory field to give idea of the content
      "content": "Some random text", 	// mandatory field containing the task details
      "trackProgress": "",	          // functionality that gives the option to track the task. On ‘Start’ it sets a start date and starts counting days toward                                              completion. The ‘Start” button changes to ‘Stop’. On pressing Stop it records competedOn date and the ‘Stop’ button                                                 changes to ‘Continue’. Pressing it remove the completedOn date. 
      "startDate": "21/01/2024",
      "dueDate": "26/01/2024",	      //gives you the option to set a due date which triggers alerts and styles
      "completedOn": "",
      "isArchived": true,	            //lets you archive the note, blurring its content and putting it in the archive bin. Can be reopened later on.  
      "owner": "07f260f4-466c-4607-9a33-f7273b24f1b4",
      "sharedWith": ["07f260f4-466c-4607-9a33-f7273b24f132"] //lets you share the task with friends 

2)	Checklists elements:
    "_id": 1,
    "position": 1,			              //defines the position of the element on the screen
    "type": " Shopping list",	        //choose between General to-do and Shopping list
    "title": "Title",
    "elements": [
    {
        "position": 1,
        "content": "element 1",
        "dueDate": "26/01/2024", 
        "status": " Pending", 	       //Not started/In progress/Done for general tasks; Pending/Done for shopping list
        "note": "additional info"
      }
    ],
    "sharedWith": ["07f260f4-466c-4607-9a33-f7273b24f132"],
    "isArchived": true,
    "dueDate": "26/01/2024"
  }

4)	Events elements:
    "_id": 1,
    "type": " Birthday",	             //choose between Birthday, Name day, Vacation, Event, etc.
    "title": "Title",
     "icon": "cake",
     "content": "element 1",
     "date": "26/01/2024",
    "sharedWith": ["07f260f4-466c-4607-9a33-f7273b24f132"],
    "isArchived": true

