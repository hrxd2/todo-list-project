export {showDialog, closeDialog, collectData};

const dialog = document.querySelector(".dialog");

function showDialog(){
    dialog.showModal();
}

function closeDialog(){
    dialog.close();
}

function collectData(){

    const title = document.querySelector("#title-label").value;
    const description = document.querySelector("#description-box").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;

    const notes = [];
    const checklist = [];

    const noteVal = document.querySelector("#notes").value;
    if(noteVal) noteVal.split(",").forEach(item => notes.push(item));
    const checkVal = document.querySelector("#checklist").value
    if(checkVal) checkVal.split(",").forEach(item => checklist.push(item));

    if(!title || !description || !dueDate || !priority) return;

    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        notes: notes,
        checklist: checklist
    }
}