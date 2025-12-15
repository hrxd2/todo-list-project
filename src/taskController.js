// greeting.js
export const greeting = "Hello, Odinite!";

const taskArray = [];
const projectArray = [];

function tasksController() {

  function takeTodoInput(title, description, dueDate, priority, notes, checklist) {

    const uid = crypto.randomUUID();

    const taskObj = {
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      notes: [...notes],
      checklist: [...checklist],
      uid: uid,
    }

    taskArray.push(taskObj);

    //return taskObj;
  };

  function takeProjectInput(title){
    const projectObj = {
      title: title,
      tasks: [],
    }
    
    projectArray.push(projectObj);

    //return projectObj;
  };

  function addTaskToProject(task, project){
    project.tasks.push(task);
    //bit confusion here, (what with multiple files);
  };

  function showProjects(title){
    projectArray.forEach(project => console.log(project));
  }

  function showTasks(){
    taskArray.forEach(task => console.log(task));
  }

  function checkTasks(){
    if(!taskArray) return ;
    showTasks();
  }

  function removeTasks(task) {
    //remove the one with specific uid // use splice in array
    console.log("removed ");
  }

  return {
          takeTodoInput, 
          takeProjectInput, 
          addTaskToProject, 
          showProjects, 
          showTasks, 
          checkTasks, 
          removeTasks,
  };
};

const todo = tasksController();

todo.takeTodoInput("Workout", "i have to workout 2 hours today", "22/02/2022", "High", ["planks", "extension" , "leg stretch" , "cat frog etc"], ["2hour", "1 liter water", "15min rest", "protein intake"]);
todo.takeTodoInput("Coding session", "should code for 4 hours this evening", "22/01/2026", "Medium", ["Javascript", "dsa" , "sys design"], ["2hour", "1 liter water", "15min rest", "meditation break"]);
todo.takeTodoInput("Sleep", "Sleep for 8 hours min", "15/02/2026", "Low", ["deep breath and deep sleep"], ["take medicine", "no phone in bed" , "quit screen min 1 hour before"]);

todo.showTasks();
todo.takeProjectInput("Workout");
todo.takeProjectInput("Sleep");

todo.addTaskToProject(taskArray[0], projectArray[0]);
todo.addTaskToProject(taskArray[2], projectArray[1]);

todo.showProjects();

//function screenController(){
   
//}
