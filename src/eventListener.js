import { closeDialog, showDialog } from "./modals";
import { clearDisplay, populateProjects, populateTasks } from "./screenController";
import { getProjectArray, getTaskArray, removeProject, takeProjectInput } from "./taskController";

const projectArray = getProjectArray();

export default function asideListener(){

    const aside = document.querySelector(".aside");
    const sectionTitle = document.querySelector(".section-title");
    const dialog = document.querySelector(".dialog");
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
            e.preventDefault();
            projectAdd.classList.toggle("project-title-input");
            const inputVal = document.querySelector("#project-title-input").value;
            takeProjectInput(inputVal);
            populateProjects(projectArray);
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

    dialog.addEventListener("click", e => {
        if(e.target.classList.contains("modal-close")){
            closeDialog();
        }
    })
    
}