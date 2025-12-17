import { clearDisplay, populateTasks } from "./screenController";
import { getProjectArray, getTaskArray } from "./taskController";

export default function asideListener(){

    const aside = document.querySelector(".aside");

    aside.addEventListener("click", e => {
        if(e.target.classList.contains("all-tasks")){
            clearDisplay();
            getTaskArray().forEach(item => populateTasks(item));
        };

        if(e.target.classList.contains("project-title-button")){
            clearDisplay();
            const prjArray = getProjectArray();
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