export {allTaskDialog, projectTaskDialog};

const form = document.querySelector(".form");

function newElem(elem, classText, textContent='', id='', forText='', type=''){
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
    }
    if(elem === "textarea"){
        item.name = id;
        item.id = id;
    }
    if(elem === 'textarea' && id === 'description-box'){
        item.required = true;
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
        selectedOption.setAttribute('selected', '');
        item.appendChild(selectedOption);

        const highOption = document.createElement('option');
        highOption.textContent = "High";
        highOption.value = 'High';
        const lowOption = document.createElement('option');
        lowOption.textContent = "Low";
        lowOption.value = 'Low';

        item.append(highOption, lowOption);
    }

    return item;
};

function allTaskDialog(){
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

    const buttonDiv = newElem("div", 'control-btns',);
    const subButton = newElem("button", 'submit-task-btn', 'Submit', '', '', 'submit');
    const closeButton = newElem("button", 'modal-close', 'Close');
    buttonDiv.append(subButton, closeButton);
    form.append(buttonDiv);
}

function projectTaskDialog(){

}