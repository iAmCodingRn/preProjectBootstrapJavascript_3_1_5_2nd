function getParent(obj, parentTagName) {
    return (obj.tagName === parentTagName) ? obj : getParent(obj.parentNode, parentTagName);
}

function dataTransfer(parentNode, idForm) {
    const tds = parentNode.getElementsByTagName('TD');
    const id = tds[0].innerHTML;
    const tdRole = 5;
    const currentRolesUser = parentNode.cells[tdRole].textContent.split(' ');
    const form = document.getElementById(idForm);
    const inputs = form.getElementsByTagName("INPUT");
    const options = form.getElementsByTagName("SELECT")[0].options;

    //сброс selected
    for (let o = 0; o < options.length; o++) {
        options[o].selected = false;
    }

    //заполнение полей формы editUser-form
    for (let c = 0; c < tds.length-2; c++) {
        if (inputs[c].name !== 'password') {
            inputs[c].value = tds[c].innerText;
        }
        if (inputs[c].name !== '_roles') {
            for (let i = 0; i < options.length; i++) {
                for (let j = 0; j < currentRolesUser.length-1; j++) {
                    if (options[i].text === currentRolesUser[j]) {
                        options[i].selected = true;
                    }
                }
            }
        }
    }
}

function click(btn) {
    const event = new Event("click");
    btn.dispatchEvent(event);
}