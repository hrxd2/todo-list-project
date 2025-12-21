// index.js
import "./styles.css"
import "./modal.css"

import { takeTodoInput,takeProjectInput, showProjects, showTasks, checkTasks, removeTasks, getTaskArray, getProjectArray, Task } from "./taskController.js";

import { clearDisplay, populateTasks, populateProjects, initialRender } from "./screenController.js";
import {asideListener, dialogListener, mainListener } from "./eventListener.js";

//sample inputs;
const task1 = new Task({
title: "Workout", 
description: "i have to workout 2 hours today", 
dueDate: "22/02/2022", 
priority: "High", 
notes: ["planks", "extension" , "leg stretch" , "cat frog etc"], 
checklist: ["2hour", "1 liter water", "15min rest", "protein intake"],
});

const task2 = new Task({
title: "Coding session", 
description: "should code for 4 hours this evening", 
dueDate: "22/01/2026", 
priority: "Medium", 
notes: ["Javascript", "dsa" , "sys design"], 
checklist: ["2hour", "1 liter water", "15min rest", "meditation break"],
});

const task3 = new Task({
title: "Sleep", 
description: "Sleep for 8 hours min", 
dueDate: "15/02/2026", 
priority: "Low", 
notes: ["deep breath and deep sleep"], 
checklist: ["take medicine", "no phone in bed" , "quit screen min 1 hour before"],
});

takeTodoInput(task1);
takeTodoInput(task2);
takeTodoInput(task3);


takeProjectInput("Swimming");
takeProjectInput("Sleep");

// const taskArray = getTaskArray();
// const projectArray = getProjectArray();

// addTaskToProject(taskArray[0], projectArray[0]);
// addTaskToProject(taskArray[3], projectArray[0]);
// addTaskToProject(taskArray[2], projectArray[1]);


initialRender();
showProjects();

asideListener();
mainListener();
dialogListener();