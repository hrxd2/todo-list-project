// index.js
import "./styles.css"
import { takeTodoInput,takeProjectInput, addTaskToProject, showProjects, showTasks, checkTasks, removeTasks, getTaskArray, getProjectArray } from "./taskController.js";

import { clearDisplay, populateTasks, populateProjects, initialRender } from "./screenController.js";
import asideListener from "./eventListener.js";



takeTodoInput("Workout", "i have to workout 2 hours today", "22/02/2022", "High", ["planks", "extension" , "leg stretch" , "cat frog etc"], ["2hour", "1 liter water", "15min rest", "protein intake"]);
takeTodoInput("Coding session", "should code for 4 hours this evening", "22/01/2026", "Medium", ["Javascript", "dsa" , "sys design"], ["2hour", "1 liter water", "15min rest", "meditation break"]);
takeTodoInput("Sleep", "Sleep for 8 hours min", "15/02/2026", "Low", ["deep breath and deep sleep"], ["take medicine", "no phone in bed" , "quit screen min 1 hour before"]);

takeTodoInput("Workout", "i have to workout 2 hours today", "22/02/2022", "High", ["planks", "extension" , "leg stretch" , "cat frog etc"], ["2hour", "1 liter water", "15min rest", "protein intake"]);
takeTodoInput("Workout", "i have to workout 2 hours today", "22/02/2022", "High",'', ["planks", "extension" , "leg stretch" , "cat frog etc"], ["2hour", "1 liter water", "15min rest", "protein intake"]);
takeTodoInput("Sleep", "Sleep for 8 hours min", "15/02/2026", "Low", ["deep breath and deep sleep"], ["take medicine", "no phone in bed" , "quit screen min 1 hour before"]);
takeTodoInput("Workout", "i have to workout 2 hours today", "22/02/2022", "High", ["2hour", "1 liter water", "15min rest", "protein intake"]);

takeProjectInput("Swimming");
takeProjectInput("Sleep");

const taskArray = getTaskArray();
const projectArray = getProjectArray();

addTaskToProject(taskArray[0], projectArray[0]);
addTaskToProject(taskArray[3], projectArray[0]);
addTaskToProject(taskArray[2], projectArray[1]);


initialRender();
showProjects();

asideListener();