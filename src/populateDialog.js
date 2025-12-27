export {allTaskDialog, projectTaskDialog, editTaskDialog, editProjectTaskDialog};

const form = document.querySelector(".form");

function newElem(elem, classText, textContent='', id='', forText='', type='', val=''){
    const item = document.createElement(elem);
    if(classText) item.classList.add(classText);
    if(textContent) item.textContent = textContent;
    if(elem === "label"){
        item.htmlFor = forText;
    }
    if(elem === "input" ){
        item.type = type;
        item.id = id;
        item.required = true;
        item.value = val;
    }
    if(elem === "textarea"){
        item.name = id;
        item.id = id;
        item.value = val;
    }
    if(elem === 'textarea' && id === 'description-box'){
        item.required = true;
    }
    if(elem === 'textarea' && (id === 'notes')|| (id === 'checklist')){
        item.setAttribute('placeholder', 'comma, seperated, values');
    }
    if(elem === 'button'){
        item.type = type;
    }
    if(elem === 'select'){
        item.name = id;
        item.id = id;
        item.required = true;

        const selectedOption = document.createElement("option");
        selectedOption.textContent = 'select';
        selectedOption.value = '';
        selectedOption.setAttribute('disabled', '');
        item.appendChild(selectedOption);

        const highOption = document.createElement('option');
        highOption.textContent = "High";
        highOption.value = 'High';

        const lowOption = document.createElement('option');
        lowOption.textContent = "Low";
        lowOption.value = 'Low';

        if(val === ''){
            selectedOption.setAttribute('selected', '');
        }

        if(val === 'High'){
            highOption.setAttribute('selected', '');
        }

        if(val === 'Low'){
            lowOption.setAttribute('selected', '');
        }

        item.append(highOption, lowOption);
    }
    if(elem === 'button' && (classText === 'submit-project-task-btn' || classText === 'submit-edit-btn' || classText === 'submit-prj-edit-btn')){
        item.dataset.uid = id;
    }

    return item;
};

function renderFields(obj={}){

    if(obj){

        const {title, description, dueDate, priority, notes=[], checklist=[] } = obj;

        const dialogInputs = newElem("div", "dialog-inputs");

        const titleLabel = newElem("label", '', 'Title: ', '', 'title-label');
        const titleInput = newElem("input", '', '', 'title-label','', 'text', title);
        const descriptionLable = newElem("label", '', 'Description:' , '', 'description-box');
        const descriptionText = newElem("textarea", '','', 'description-box', '', '', description);
        const dateLabel = newElem("label", '', 'Due Date: ', '', 'due-date');
        const dateInput = newElem('input', '', '', 'due-date', '', 'date', dueDate);
        const priorityLabel = newElem("lable", '', 'Priority: ', '', 'priority');
        const selectMenu = newElem("select", '', '', 'priority', '', '', priority);
        const noteLabel = newElem("label", '', 'Notes: ', '', 'notes' );
        const noteArea = newElem("textarea", '', '', 'notes', '', '', notes );
        const chekListLabel = newElem("label", '', 'Checklist: ', '', 'checklist');
        const checkArea = newElem("textarea", '', '', 'checklist', '', '', checklist);

        dialogInputs.append(titleLabel, titleInput, descriptionLable, descriptionText, dateLabel, dateInput, priorityLabel, selectMenu, noteLabel, noteArea, chekListLabel, checkArea);
        form.appendChild(dialogInputs);
    }else{
        const dialogInputs = newElem("div", "dialog-inputs");

        const titleLabel = newElem("label", '', 'Title: ', '', 'title-label');
        const titleInput = newElem("input", '', '', 'title-label','', 'text');
        const descriptionLable = newElem("label", '', 'Description:' , '', 'description-box');
        const descriptionText = newElem("textarea", '','', 'description-box');
        const dateLabel = newElem("label", '', 'Due Date: ', '', 'due-date');
        const dateInput = newElem('input', '', '', 'due-date', '', 'date');
        const priorityLabel = newElem("lable", '', 'Priority: ', '', 'priority');
        const selectMenu = newElem("select", '', '', 'priority');
        const noteLabel = newElem("label", '', 'Notes: ', '', 'notes' );
        const noteArea = newElem("textarea", '', '', 'notes', );
        const chekListLabel = newElem("label", '', 'Checklist: ', '', 'checklist');
        const checkArea = newElem("textarea", '', '', 'checklist');

        dialogInputs.append(titleLabel, titleInput, descriptionLable, descriptionText, dateLabel, dateInput, priorityLabel, selectMenu, noteLabel, noteArea, chekListLabel, checkArea);
        form.appendChild(dialogInputs);
    }
}

function renderButton(submitButtonClass, id=''){
    const buttonDiv = newElem("div", 'control-btns',);
    const subButton = newElem("button", submitButtonClass, 'Submit', id, '', 'submit');
    const closeButton = newElem("button", 'modal-close', 'Close');
    buttonDiv.append(subButton, closeButton);
    form.append(buttonDiv);
}

function allTaskDialog(){
    form.textContent = '';
    renderFields();
    renderButton("submit-task-btn");
}

function projectTaskDialog(id){
    form.textContent = '';
    renderFields();
    renderButton("submit-project-task-btn", id);
}
 function editTaskDialog(obj){
    form.textContent = '';
    renderFields(obj);
    renderButton('submit-edit-btn', obj.uid);
 }

function editProjectTaskDialog(obj){
    form.textContent = '';
    renderFields(obj);
    renderButton("submit-prj-edit-btn", obj.uid);
}
