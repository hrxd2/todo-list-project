export {takeTodoInput, takeProjectInput, addTaskToProject, showProjects, showTasks, checkTasks, removeTasks, removeProject, getTaskArray, getProjectArray}


const taskArray = [];
const projectArray = [];

function takeTodoInput(title, description, dueDate, priority, notes=[], checklist=[]) {

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
  const uid = crypto.randomUUID();

  const projectObj = {
    title: title,
    tasks: [],
    uid: uid,
  }
  
  projectArray.push(projectObj);

  //return projectObj;
};

function addTaskToProject(task, project){
  taskArray.push(task);
  project.tasks.push(task);
  //bit confusion here, (what with multiple files);
};

function showProjects(){
  projectArray.forEach(project => console.log(project));
}

function showTasks(){
  taskArray.forEach(task => console.log(task));
}

function checkTasks(){
  if(!taskArray) return ;
  showTasks();
}

function removeTasks(id) {
  taskArray.forEach(obj => {
    if(obj.uid === id){
      const index = taskArray.indexOf(obj);
      taskArray.splice(index, 1);
    }
  })
}

function removeProject(id){
  projectArray.forEach(obj => {
   if(obj.uid === id){
    const index = projectArray.indexOf(obj);
    projectArray.splice(index, 1);
   } 
  });
}

function getTaskArray(){
  return taskArray;
}
function getProjectArray(){
  return projectArray;
}


// todo.showTasks();
// todo.takeProjectInput("Workout");
// todo.takeProjectInput("Sleep");

// //using hardcoded values, change it accordingly
// todo.addTaskToProject(todo.taskArray[0], todo.projectArray[0]);
// todo.addTaskToProject(todo.taskArray[2], todo.projectArray[1]);

// todo.showProjects();
