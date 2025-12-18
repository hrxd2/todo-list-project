export {showDialog, closeDialog};

const dialog = document.querySelector(".dialog");

function showDialog(){
    dialog.showModal();
}

function closeDialog(){
    dialog.close();
}