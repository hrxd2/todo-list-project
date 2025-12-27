import { editTaskDialog } from "./populateDialog";

export {Task, takeTodoInput, takeProjectInput, showProjects, showTasks, checkTasks, removeTasks, removeProject, removeProjectTask, getTaskArray, getProjectArray, editAllTask, submitEditedTaskMain}

const taskArray = [];
const projectArray = [];

class Task {
  constructor(obj){

    const {title, description, dueDate, priority, notes=[], checklist=[], isDone=false} = obj;

    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.isDone = isDone;

    const uid = crypto.randomUUID();
    this.uid = uid;
  }

  editTask(res){
    const {title, description, dueDate, priority, notes=[], checklist=[], isDone=false} = res;
    
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.isDone = isDone;
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

  deleteTask(id){
    this.tasks.forEach(item => {
      if(item.uid === id){
        const index = this.tasks.indexOf(item);
        this.tasks.splice(index, 1);
      }
    });
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
  let isAlltask = false;
  taskArray.forEach(obj => {
    if(obj.uid === id){
      isAlltask = true;
      const index = taskArray.indexOf(obj);
      taskArray.splice(index, 1);
    }
  });
  
  if(isAlltask) return 0;

  projectArray.forEach(obj => {
    obj.tasks.forEach(item => {
      if(item.uid == id){
        obj.deleteTask(id);
      }
    })
  })

}

function removeProjectTask(id, title){
  projectArray.forEach(obj => {
    if(obj.title === title){
      obj.deleteTask(id);
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

function editAllTask(id){
  let editAllFlag = false;
  taskArray.forEach(item => {
    if(item.uid === id){
      editAllFlag = true;
      console.log(item);
      editTaskDialog(item);
    }
  
  if(editAllFlag) return 0;
  projectArray.forEach(item => {
    item.tasks.forEach(obj => {
      if(obj.uid === id){
        console.log(obj);
        editTaskDialog(obj);
      }
    })
  })
  })
};

function submitEditedTaskMain(id, res){
  let flag = false;
  taskArray.forEach(item => {
    if(item.uid === id){
      flag = true;
      item.editTask(res);
    }
  })
  if(flag) return 0;

  projectArray.forEach(item => {
    item.tasks.forEach(obj => {
      if(obj.uid === id){
        obj.editTask(res);
      }
    })
  })
};

function getTaskArray(){
  return taskArray;
}
function getProjectArray(){
  return projectArray;
}

