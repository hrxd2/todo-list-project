import { clearDisplay, populateTasks } from "./screenController";
import { getProjectArray, getTaskArray } from "./taskController";

export default function asideListener(){

    const aside = document.querySelector(".aside");
    const sectionTitle = document.querySelector(".section-title");

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
            console.log(id);
                prjArray.forEach(obj => {
                  if(obj.uid === id){
                    let task = obj.tasks;
                    task.forEach(obj => populateTasks(obj));
                  }
            });
        };

        return ;
    });
    
}