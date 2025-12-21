export {takeTodoInput, takeProjectInput, showProjects, showTasks, checkTasks, removeTasks, removeProject, getTaskArray, getProjectArray}

const taskArray = [];
const projectArray = [];

class Task {
  constructor(obj){

    const {title, description, dueDate, priority, notes=[], checklist=[]} = obj;

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;

    const uid = crypto.randomUUID();
    this.uid = uid;
  }
}

function takeTodoInput(obj){

  const newTask = new Task(obj);
  taskArray.push(newTask);
};

class ProjectTask{
  constructor(title){
    this.title = title;
    this.tasks = [];

    const uid = crypto.randomUUID();
    this.uid = uid;
  }

  getTitle(){
    return this.title;
  }
   
  addTasks(obj){
    const task = new Task(obj);
    this.tasks.push(task);
  }
}

function takeProjectInput(title){

  const newProject = new ProjectTask(title);
  projectArray.push(newProject);
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
  //
  //should moidfy this function to remove the tasks if it is on 
  //project arrays, now this one wont splice the task from projectarray
  //also update the logic for all tasks to get all from projects too
  // 
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

