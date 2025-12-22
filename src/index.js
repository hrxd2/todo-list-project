// index.js
import "./styles.css"
import "./modal.css"
import "./hover.css"

import { takeTodoInput,takeProjectInput, showProjects, getProjectArray, Task } from "./taskController.js";

import { initialRender } from "./screenController.js";
import {asideListener, dialogListener, mainListener } from "./eventListener.js";

//sample inputs;
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

const task2 = new Task(
    {
    "title": "Project UI",
    "description": "Create the basic layout and components for the todo app.",
    "dueDate": "2025-12-26",
    "priority": "High",
    "checklist": ["Header", "Sidebar", "Task list", "Footer"]
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
takeTodoInput(task2);
takeTodoInput(task3);


takeProjectInput("Swimming");
takeProjectInput("Sleep");

const pArray = getProjectArray();
pArray[0].addTasks(
    {
    "title": "Evening Session",
    "description": "Swim continuously focusing on breathing technique and endurance.",
    "dueDate": "2025-12-23",
    "priority": "High",
    "notes": ["Freestyle laps", "Controlled breathing"],
    "checklist": ["Warm-up stretches", "30 laps", "Cool down"]
  }
);
pArray[0].addTasks(
    {
    "title": "Morning Swim",
    "description": "Practice stroke technique and improve efficiency with slow, controlled laps.",
    "dueDate": "2025-12-24",
    "priority": "Medium",
    "notes": ["Focus on form over speed", "Bilateral breathing"],
    "checklist": ["5 warm-up laps", "20 technique laps", "Stretch shoulders"]
  }
)
pArray[1].addTasks(
    {
    "title": "Maintain Sleep ",
    "description": "Go to bed early and get at least 7–8 hours of uninterrupted sleep.",
    "dueDate": "2025-12-23",
    "priority": "High",
    "notes": ["No phone after 10 PM", "Dark room"],
    "checklist": ["Set alarm", "Turn off screens", "Lights out by 10:30 PM"]
  }
)
pArray[1].addTasks(
    {
    "title": "Wind-Down",
    "description": "Follow a calm night routine to improve sleep quality and recovery.",
    "dueDate": "2025-12-24",
    "priority": "Medium",
    "notes": ["Light reading", "No caffeine after evening"],
    "checklist": ["Prepare clothes for tomorrow", "Dim lights", "Sleep by 10:30 PM"]
  }
)

initialRender();
showProjects();

asideListener();
mainListener();
dialogListener();