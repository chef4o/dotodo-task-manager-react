# DOTODO TASK MANAGER

**Created with React + Vite**

Available online* at https://dotodo.dev-apps.eu/

*Due to inactivity, the server-side might be in sleep mode which can delay any initial request by 50 seconds or more.

## Used external services

- [Firebase](https://console.firebase.google.com/) (client-side, database and authentication services)
- [Render](https://render.com/) (server-side cloud service)
- [Cloudinary](https://cloudinary.com/) (file upload cloud service)
- [Mailtrap](https://mailtrap.io/home) (email delivery service)
- [BingMaps](https://www.bingmapsportal.com/) (contact location service)
- [Nager.Date](https://date.nager.at/) (public holidays service)

## Local Installation
To install the app, clone the repository and run npm install to load the necessary dependencies.

`git clone <repository-url>`

`cd <repository-folder>`

`npm install`*

*This will install the dependencies from the root, the client and the server folders. 

## Local Setup
To be able to run the Firebase API on both the server and client locally, you have to add .env files* inside the /client and /server folders and set the following variables with your own firebase profile details:
> /server/.env: 
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_CLIENT_ID`
- `FIREBASE_AUTH_URI`
- `FIREBASE_TOKEN_URI`
- `FIREBASE_AUTH_PROVIDER_CERT_URL`
- `FIREBASE_CLIENT_CERT_URL`
- `MAILTRAP_HOST`
- `MAILTRAP_PORT`
- `MAILTRAP_USER`
- `MAILTRAP_PASS`
- `SUPPORT_EMAIL`

>/client/.env:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`
- `VITE_BING_MAPS_KEY`

Your Firestore database shuld have all collections from `server/configuration/firebaseDb`.

*Note: inside the /server and /client folders there are .env.sample files for reference.

## Local Usage
Start the app* from the root folder using:

`npm run project`  

> The client app will be available at [localhost:5173](http://localhost:5173/)

> The API calls will be accessible at [localhost:5000](http://localhost:5000/)

*Note: The server and client can be started separately.
> To start the server from root navigate to the /server folder and execute `npm start`
> To debug the server** use the Run Script: start configuration

> To start the client from root navigate to the /client folder and execute `npm run dev`
> To start the client tests navigate to the /client folder and execute `npm run test` 
> To debug the client use the Launch Chrome against localhost configuration

**To start the debug the main server connection sholud be killed.  



## Concept

The DOTODO app aims to provide various functionalities for assistance with our everyday personal tasks in three dimensions: 
-	free-hand notes 
-	to-do tasks and checklists
-	calendar events

Each functionality has its own concept and design oriented towards intuitiveness, flexibility and detail. 
Functionalities
1. Core note elements
   - title              // non-mandatory field to give idea of the content
   - content            // mandatory field containing the task details
   - trackProgress      // functionality that will give the option to track the task. On ‘Start’ it sets a start date and starts counting days toward completion. The ‘Start” button changes to ‘Stop’. On pressing Stop it records competedOn date and the ‘Stop’ button changes to ‘Continue’. Pressing it remove the completedOn date. [IN DEVELOPMENT]
   - startDate
   - dueDate            //gives you the option to set a due date which will trigger alerts and styles [IN DEVELOPMENT]
   - completedOn
   - isArchived         //will let you archive the note, blurring its content and putting it in the archive bin. Can be reopened later on. [IN DEVELOPMENT]
   - owner
   - sharedWith         //will let you share the task with friends [IN DEVELOPMENT]

2. Core checklist elements:
   - type                //choose between General to-do and Shopping list [IN DEVELOPMENT]
   - title
   - elements
      - content
      - dueDate
      - status           //Not started/In progress/Done for general tasks; Pending/Done for shopping list
   - sharedWith          //will let you share the task with friends [IN DEVELOPMENT]
   - isArchived
   - dueDate

3. Core event elements:  [IN DEVELOPMENT]
   - type                //choose between Birthday, Name day, Vacation, Event, etc.
   - title
   - icon
   - content
   - date
   - isArchived
