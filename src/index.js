// index.js
import "./styles.css"
import tasksController from "./taskController.js";
import { clearDisplay, populateTasks } from "./screenController.js";


const todo = tasksController();

todo.takeTodoInput("Workout", "i have to workout 2 hours today", "22/02/2022", "High", ["planks", "extension" , "leg stretch" , "cat frog etc"], ["2hour", "1 liter water", "15min rest", "protein intake"]);
todo.takeTodoInput("Coding session", "should code for 4 hours this evening", "22/01/2026", "Medium", ["Javascript", "dsa" , "sys design"], ["2hour", "1 liter water", "15min rest", "meditation break"]);
todo.takeTodoInput("Sleep", "Sleep for 8 hours min", "15/02/2026", "Low", ["deep breath and deep sleep"], ["take medicine", "no phone in bed" , "quit screen min 1 hour before"]);

clearDisplay();

todo.getTaskArray().forEach(item => populateTasks(item));