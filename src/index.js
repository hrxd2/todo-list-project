// index.js
import "./styles.css"
import "./modal.css"
import "./hover.css"

import { takeTodoInput,takeProjectInput, getProjectArray, Task, storagePush } from "./taskController.js";

import { initialRender } from "./screenController.js";
import {asideListener, dialogListener, mainListener } from "./eventListener.js";

//sample inputs;
function dummyInput(){
  const task1 = new Task(
      {
      "title": "Workout",
      "description": "Complete a full body workout focusing on core and mobility.",
      "dueDate": "2025-12-23",
      "priority": "High",
      "notes": ["Planks", "Push-ups", "Stretching"],
      "checklist": ["Warm up", "Workout", "Cool down"]
    }
  );

  const task3 = new Task(
      {
      "title": "Clean Workspace",
      "description": "Organize desk and remove distractions before coding.",
      "dueDate": "2025-12-22",
      "priority": "Low"
    }
  );

  takeTodoInput(task1);
  takeTodoInput(task3);


  takeProjectInput("Swimming");
  takeProjectInput("Sleep");

  const pArray = getProjectArray();
  pArray[0].addTasks(
      {
      "title": "Morning Swim",
      "description": "Practice stroke technique and improve efficiency with slow, controlled laps.",
      "dueDate": "2025-12-24",
      "priority": "High",
      "notes": ["Focus on form over speed", "Bilateral breathing"],
      "checklist": ["5 warm-up laps", "20 technique laps", "Stretch shoulders"]
    }
  )
  pArray[0].addTasks(
      {
      "title": "Evening Session",
      "description": "Swim continuously focusing on breathing technique and endurance.",
      "dueDate": "2025-12-23",
      "priority": "Low",
      "notes": ["Freestyle laps", "Controlled breathing"],
      "checklist": ["Warm-up stretches", "30 laps", "Cool down"],
      "isDone": true,
    }
  );
  pArray[1].addTasks(
      {
      "title": "Maintain Sleep ",
      "description": "Go to bed early and get at least 7–8 hours of uninterrupted sleep.",
      "dueDate": "2025-12-23",
      "priority": "High",
      "notes": ["No phone after 10 PM", "Dark room"],
      "checklist": ["Set alarm", "Turn off screens", "Lights out by 10:30 PM"],
    }
  )
};

if(!localStorage.getItem("allTasks")){
  dummyInput();
}else{
  const defaultTasks = JSON.parse(localStorage.getItem("allTasks"));
  const storedProjects = JSON.parse(localStorage.getItem("projects"));

  storagePush(defaultTasks, storedProjects);
}

initialRender();
asideListener();
mainListener();
dialogListener();
