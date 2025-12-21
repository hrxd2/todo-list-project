import { closeDialog, collectData, showDialog } from "./modals";
import { allTaskDialog, projectTaskDialog } from "./populateDialog";
import { clearDisplay, populateProjects, populateTasks} from "./screenController";
import { getProjectArray, getTaskArray, removeProject, removeTasks, showProjects, takeProjectInput, takeTodoInput} from "./taskController";

export {mainListener, asideListener, dialogListener, updateMain}

const projectArray = getProjectArray();
const sectionTitle = document.querySelector(".section-title");

// main side render of all tasks.
function updateMain(){
    console.log(getTaskArray());
    sectionTitle.textContent = 'All Tasks';
    getTaskArray().forEach(item => populateTasks(item));
}

//main side render of project tasks.
function projectRender(e){

    clearDisplay();
    const prjArray = getProjectArray();

    const id = e.target.dataset.uid;
        prjArray.forEach(obj => {
            if(obj.uid === id){
            
            const textValue = obj.getTitle();
            sectionTitle.textContent = textValue;

            let task = obj.tasks;
            task.forEach(obj => populateTasks(obj));
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
            // populateTasks(taskArray);
            //some problem here, 
            //when deleted from projects it will render main tasks
            //should fix that
            //maybe  the class of delte button i guess
            //shouldn't do updatemain with projectTasks
            //only with all tasks
            //thats where the updateMain comes in

            updateMain();
        }

        if(e.target.classList.contains("projectTask-del-btn")){
            console.log("clicked");
        }
    })
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
            projectRender(e);
        };

        if(e.target.classList.contains("add-button")){
            allTaskDialog();
            showDialog();
        }

        if(e.target.classList.contains("project-add-button")){
            projectAdd.classList.toggle("project-title-input");
        }

        if(e.target.classList.contains("project-title-add-btn")){
            const inputVal = document.querySelector("#project-title-input").value;

            if(!inputVal) return;

            takeProjectInput(inputVal);
            populateProjects(projectArray);
            showProjects();
            projectAdd.classList.toggle("project-title-input");
        }

        if(e.target.classList.contains("projectTask-add-button")){
            const id = e.target.dataset.uid;
            projectTaskDialog(id);
            showDialog();
        }

        if(e.target.classList.contains('project-delete-button')){
            const id = e.target.dataset.uid;
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
            projectRender(e);
            showProjects();
            // clearDisplay();
            // updateMain();
            //console.log(res);
            closeDialog();
        }
    })

};