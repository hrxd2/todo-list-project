
export {clearDisplay, populateTasks, populateProjects, initialRender, newElem};
import { updateMain } from "./eventListener";
import { getTaskArray, getProjectArray } from "./taskController";

const main = document.querySelector(".main");
const projectTitles = document.querySelector(".project-titles");

function clearDisplay(){
    main.textContent = '';
};

function newElem(elem, classText, textContent='', id='', prjTitle){
    const item = document.createElement(elem);
    if(classText) item.classList.add(classText);
    if(textContent) item.textContent = textContent;
    if(elem === "input"){
        //hardcode
        item.type = 'checkbox';
        item.id = id;
    }
    if(classText === 'project-title-button' || classText === 'project-title-div'|| classText === 'delete-btn'|| classText === 'project-delete-button'|| classText === 'projectTask-add-button'){
        item.dataset.uid = id;
    }
    if(classText === 'projectTask-del-btn'){
        item.dataset.uid = id;
        item.dataset.title = prjTitle;
    }
    return item;
};

//main side render
function populateTasks(obj, isProject = false, prjTitle = ''){

    const {title, description, dueDate, priority, notes=[], checklist=[], uid} = obj;

    const section = newElem("section", "section");
    const taskHead = newElem("div", "task-head");
    const titleH2 = newElem("h2", '', `${title}`);
    const buttonsDiv = newElem("div", 'btn-div');
    let dltBtn ;

    if(isProject){
        dltBtn = newElem("button", 'projectTask-del-btn', 'x', uid, prjTitle);
    }else{
        dltBtn = newElem("button", 'delete-btn', 'x', uid);
    }
    const isDoneCheckbox = newElem("input", '', '', uid);

    buttonsDiv.append(isDoneCheckbox, dltBtn );
    taskHead.append(titleH2, buttonsDiv );
    section.append(taskHead);

    const mainTaskDiv = newElem("div", "task-main");
    const descriptionPara = newElem("code", 'description-text', `> ${description}`);
    const datePara = newElem("p", 'date', `Due: ${dueDate}`);
    const priorityPara = newElem("p", 'priority', `Priority: ${priority}`);

    mainTaskDiv.append(descriptionPara, datePara, priorityPara);

    if(notes.length !== 0){
        const noteDiv = newElem('div', 'notes-div');
        const noteText = newElem('p', 'note-text', 'Notes: ');

        const notesUl = newElem("ul", 'notes');

        for(let note of notes){
            const li = newElem("li", 'note-li', `${note}`);
            notesUl.appendChild(li); 
        }
        noteDiv.append(noteText, notesUl);
        mainTaskDiv.append(noteDiv);
    }
    if(checklist.length !== 0){
        const checkDiv = newElem("div", 'checklist-div');
        const checklistText = newElem('p', 'checklist-text', 'Checklists: ');
        checkDiv.appendChild(checklistText);

        for(let list of checklist){
            let id = crypto.randomUUID();
            const input = newElem("input", '', '', id);
            
            const label = document.createElement("label");
            label.htmlFor = `${id}`;
            label.textContent = `${list}`;

            checkDiv.appendChild(input);
            checkDiv.appendChild(label);
        }
        mainTaskDiv.append(checkDiv);
    }

    section.append(mainTaskDiv);

    main.append(section);
};

//aside render
function populateProjects(projectArray){

    projectTitles.textContent = '';

	projectArray.forEach(obj => {
        const titleDiv = newElem('div', 'project-title-div', '', `${obj.uid}`);

		const titleButton = newElem('button', 'project-title-button', `${obj.title}`, `${obj.uid}`);
        const addBtn = newElem('button', 'projectTask-add-button', '+', `${obj.uid}`);
        const delBtn = newElem('button', 'project-delete-button', 'x', `${obj.uid}`);

        titleDiv.append(titleButton, addBtn, delBtn);
        projectTitles.appendChild(titleDiv);
	});
};

function initialRender(){
    clearDisplay();
    updateMain(); 
    const projectArray = getProjectArray();
    populateProjects(projectArray);
};
