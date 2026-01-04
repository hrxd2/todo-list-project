import { closeDialog, collectData, showDialog } from "./modals";
import { allTaskDialog, projectTaskDialog } from "./populateDialog";
import { clearDisplay, populateProjects, populateTasks} from "./screenController";
import { editAllTask, getProjectArray, getTaskArray, isDone, removeProject, removeProjectTask, removeTasks, submitEditedTaskMain, takeProjectInput, takeTodoInput} from "./taskController";

export {mainListener, asideListener, dialogListener, updateMain}

const projectArray = getProjectArray();
const sectionTitle = document.querySelector(".section-title");

// main side render of all tasks.
function updateMain(){
    const mappedTasks = [];

    sectionTitle.textContent = 'All Tasks';
    getTaskArray().forEach(item => mappedTasks.push(item));

    // getTaskArray().forEach(item => populateTasks(item));

    projectArray.forEach(item => {
        item.tasks.forEach(obj => {
              mappedTasks.push(obj);
        })
    });

    mappedTasks.forEach(item => populateTasks(item));
}

function findId(id){
let projectId;

projectArray.forEach(item => {
    item.tasks.forEach(obj => {
    if(obj.uid === id){
        projectId = item.uid;
    }
    })
})
return projectId;
}

//localStorage updatition.
function setStorage(){
    localStorage.setItem("allTasks", JSON.stringify(getTaskArray()));
    localStorage.setItem("projects", JSON.stringify(getProjectArray()));
}

//main side render of project tasks.
function projectRender(id){

    clearDisplay();
    const prjArray = getProjectArray();

        prjArray.forEach(obj => {
            if(obj.uid === id){
            
            const title = obj.getTitle();
            sectionTitle.textContent = obj.getTitle();

            let task = obj.tasks;
            task.forEach(obj => populateTasks(obj, true, title));
            }
    });
}

function mainListener(){

    const main = document.querySelector(".main");

    main.addEventListener("click", e => {
        if(e.target.classList.contains("delete-btn")){
            const id = e.target.dataset.uid;
            removeTasks(id);

            setStorage();

            clearDisplay();            

            updateMain();
        }

        if(e.target.classList.contains("projectTask-del-btn")){
            const id = e.target.dataset.uid ;
            const title = e.target.dataset.title;
            removeProjectTask(id, title);

            setStorage();

            clearDisplay();
            const prjArray = getProjectArray();

                prjArray.forEach(obj => {
                    if(obj.title === title){
                    
                    sectionTitle.textContent = obj.getTitle();

                    let task = obj.tasks;
                    task.forEach(obj => populateTasks(obj, true, title));
                    }
           });
        }

    if(e.target.classList.contains("projectTask-edit-btn")){
        const id = e.target.dataset.uid ;
        const title = e.target.dataset.title;
        
        projectArray.forEach(item => {
        if(item.title === title){
          item.editTask(id);
        }
        })

        showDialog();
    }

        if(e.target.classList.contains("edit-btn")){
            const id = e.target.dataset.uid;
            editAllTask(id);
            showDialog();
        }

        if(e.target.classList.contains("isDoneBox")){
            const id = e.target.id;
            isDone(id);

            setStorage();

            clearDisplay();
            updateMain();
        }

        if(e.target.classList.contains("isDoneBoxFromPrj")){
            const id = e.target.id;
            isDone(id);

            setStorage();

            const pId = findId(id);
            projectRender(pId);
        }

        populateProjects(projectArray);
    }

);


};

function asideListener(){

    const aside = document.querySelector(".aside");
    const projectAdd = document.querySelector(".project-add");

    aside.addEventListener("click", e => {

        if(e.target.classList.contains("all-tasks")){
            clearDisplay();
            sectionTitle.textContent = 'All Tasks';
            updateMain()
        };


        if(e.target.classList.contains("project-title-button")){
            const id = e.target.dataset.uid;
            projectRender(id);
        };

        if(e.target.classList.contains("add-button")){
            allTaskDialog();
            showDialog();
        };

        if(e.target.classList.contains("project-add-button")){
            projectAdd.classList.toggle("project-title-input");
        };

        if(e.target.classList.contains("project-title-add-btn")){
            const inputVal = document.querySelector("#project-title-input").value;

            if(!inputVal) return;

            takeProjectInput(inputVal);

            setStorage();

            populateProjects(projectArray);
            projectAdd.classList.toggle("project-title-input");
        };

        if(e.target.classList.contains("projectTask-add-button")){
            const id = e.target.dataset.uid;
            projectTaskDialog(id);
            showDialog();
        };

        if(e.target.classList.contains('project-delete-button')){
            const id = e.target.dataset.uid;
            clearDisplay();
            removeProject(id);

            setStorage();

            populateProjects(projectArray);
            updateMain();
        }

    });


};

function dialogListener(){
    const dialog = document.querySelector(".dialog");

    dialog.addEventListener("click", e => {
        if(e.target.classList.contains("modal-close")){
            closeDialog();
        }
        
        if(e.target.classList.contains("submit-task-btn")){

            const res = collectData();
            if(!res)return;

            takeTodoInput(res);
            clearDisplay();
            updateMain();

            setStorage();

            closeDialog();
        }

        if(e.target.classList.contains("submit-project-task-btn")){

            const id = e.target.dataset.uid;

            const res = collectData();
            if(!res)return;

            projectArray.forEach(item => {
                if(item.uid === id){
                    item.addTasks(res);
                }
            });

            setStorage();

            projectRender(id);
            //aside render of subTasks
            populateProjects(projectArray);
            closeDialog();
        }

        if(e.target.classList.contains("submit-edit-btn")){

            const id = e.target.dataset.uid;
            const res = collectData();
            if(!res) return;
            submitEditedTaskMain(id, res);

            setStorage();

            clearDisplay();
            updateMain();
            //aside render subTasks.
            populateProjects(projectArray);

            closeDialog();
        }

        if(e.target.classList.contains("submit-prj-edit-btn")){

          const id = e.target.dataset.uid;
          const res = collectData();
          if(!res) return;
          
          projectArray.forEach(item => {
            item.tasks.forEach(obj => {
              if(obj.uid === id){
                obj.editTask(res);
              }
            })
          })

        setStorage();
        const pId = findId(id);
        
        projectRender(pId);
        populateProjects(projectArray);
        closeDialog();
      }
    })

};
