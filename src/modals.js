export {showDialog, closeDialog, collectData};

const dialog = document.querySelector(".dialog");

function showDialog(){
    dialog.showModal();
}

function closeDialog(){
    dialog.close();
}

function collectData(){
    console.log("take input");
    const title = document.querySelector("#title-label").value;
    const description = document.querySelector("#description-box").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;
    const notes = document.querySelector("#notes").value;
    const checklist = document.querySelector("#checklist").value;

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