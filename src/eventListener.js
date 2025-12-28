import { closeDialog, collectData, showDialog } from "./modals";
import { allTaskDialog, editTaskDialog, projectTaskDialog } from "./populateDialog";
import { clearDisplay, populateProjects, populateTasks} from "./screenController";
import { editAllTask, getProjectArray, getTaskArray, isDone, removeProject, removeProjectTask, removeTasks, showProjects, submitEditedTaskMain, takeProjectInput, takeTodoInput, Task} from "./taskController";

export {mainListener, asideListener, dialogListener, updateMain}

const projectArray = getProjectArray();
const sectionTitle = document.querySelector(".section-title");

// main side render of all tasks.
function updateMain(){
    console.log(getTaskArray());
    const mappedTasks = [];

    sectionTitle.textContent = 'All Tasks';
    getTaskArray().forEach(item => mappedTasks.push(item));

    // getTaskArray().forEach(item => populateTasks(item));

    console.log(projectArray);

    projectArray.forEach(item => {
        item.tasks.forEach(obj => {
              mappedTasks.push(obj);
        })
    });

    console.log(mappedTasks);
    mappedTasks.forEach(item => populateTasks(item));
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
            console.log(id);
            removeTasks(id);
            clearDisplay();            

            updateMain();
        }

        if(e.target.classList.contains("projectTask-del-btn")){
            const id = e.target.dataset.uid ;
            const title = e.target.dataset.title;
            removeProjectTask(id, title);

            //projectRender(e) id changed to title;
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
            populateProjects(projectArray);
            showProjects();
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
            console.log('alltasks out')

            const res = collectData();
            if(!res)return;

            takeTodoInput(res);
            clearDisplay();
            updateMain();
            console.log(res);
            closeDialog();
        }

        if(e.target.classList.contains("submit-project-task-btn")){
            console.log('projecttask out');

            const id = e.target.dataset.uid;

            const res = collectData();
            if(!res)return;

            projectArray.forEach(item => {
                if(item.uid === id){
                    item.addTasks(res);
                }
            });
            projectRender(id);
            showProjects();
            //aside render of subTasks
            populateProjects(projectArray);
            closeDialog();
        }

        if(e.target.classList.contains("submit-edit-btn")){
            console.log('edited');

            const id = e.target.dataset.uid;
            const res = collectData();
            if(!res) return;
            submitEditedTaskMain(id, res);
            clearDisplay();
            updateMain();
            //aside render subtasks.
            populateProjects(projectArray);

            closeDialog();
        }

        if(e.target.classList.contains("submit-prj-edit-btn")){
          console.log("sub edit task done");


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

          clearDisplay();
         // const id = findId(e);
         // projectRender(id);

         function findId(){
            // const id = e.target.dataset.uid;
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

        const pId = findId();
        
        projectRender(pId);
        populateProjects(projectArray);
        closeDialog();
      }
    })

};
