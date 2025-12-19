import { closeDialog, collectData, showDialog } from "./modals";
import { clearDisplay, populateProjects, populateTasks } from "./screenController";
import { getProjectArray, getTaskArray, removeProject, removeTasks, takeProjectInput } from "./taskController";

export {mainListener, asideListener, dialogListener}

const projectArray = getProjectArray();
const form = document.querySelector("form");

function mainListener(){

    const main = document.querySelector(".main");
    main.addEventListener("click", e => {
        if(e.target.classList.contains("delete-btn")){
            const id = e.target.dataset.uid;
            console.log(id);
            removeTasks(id);
            clearDisplay();            
            getTaskArray().forEach(item => populateTasks(item));
        }
    })
};

function asideListener(){

    const aside = document.querySelector(".aside");
    const sectionTitle = document.querySelector(".section-title");
    const projectAdd = document.querySelector(".project-add");

    aside.addEventListener("click", e => {
        if(e.target.classList.contains("all-tasks")){
            clearDisplay();
            sectionTitle.textContent = 'All Tasks';
            getTaskArray().forEach(item => populateTasks(item));
        };

        if(e.target.classList.contains("project-title-button")){
            clearDisplay();
            const prjArray = getProjectArray();
            const textValue = e.target.textContent;
            sectionTitle.textContent = textValue;

            const id = e.target.dataset.uid;
                prjArray.forEach(obj => {
                  if(obj.uid === id){
                    let task = obj.tasks;
                    task.forEach(obj => populateTasks(obj));
                  }
            });
            console.log(prjArray);
        };

        if(e.target.classList.contains("add-button")){
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
            projectAdd.classList.toggle("project-title-input");
        }

        if(e.target.classList.contains("projectTask-add-button")){
            showDialog();
        }

        if(e.target.classList.contains('project-delete-button')){
            const id = e.target.dataset.uid;
            removeProject(id);
            populateProjects(projectArray);
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
            //function to takeinput

            const res = collectData();
            if(!res)return;

            console.log(res);
            closeDialog();
        }
    })


};