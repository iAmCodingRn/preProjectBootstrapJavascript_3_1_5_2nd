const menuUsers = document.querySelector('.menu-users')

const usersTable = document.getElementById('table-users')
const usersTableRow = usersTable.getElementsByTagName('TBODY')[0]

const oneUserTable = document.getElementById('table-one-user')
const oneUserTableRow = oneUserTable.getElementsByTagName('TBODY')[0]

const addUserForm = document.getElementById('form-add-user')
const editUserForm = document.getElementById('form-edit-user')
const delUserForm = document.getElementById('form-del-user')

const currentEmail = document.querySelector('.current-email')

const getResponse = response => response.json()
const requestOptions = (action, data) => ({
    method: action,
    body: JSON.stringify(data),
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    }
})

let url = '/api/users'

window.onload = function () {
    getUsers()
    getRoles()
}

function getRole(roles) {
    let result = ''
    for (let name of Object.keys(roles)) {
        const role = roles[name]
        result += role.name.replace('ROLE_', '') + ' '
    }
    return result
}

function renderUserMenu(user) {
    let output = ''
    const a = document.createElement('a')
    a.setAttribute('href', '')
    a.setAttribute('onclick', 'getUser(this, ' + user.id + '); return false;')
    a.classList.add('nav-link')
    if (user.email === currentEmail.innerHTML) {
        a.classList.add('active')
    }
    a.classList.add('user-id-' + user.id)
    a.innerHTML = user.firstName
    menuUsers.appendChild(a)
    return a
}

function renderUser(user, table = usersTableRow) {
    let output = ''
    const tr = document.createElement('tr')
    tr.classList.add('align-middle')
    output += `
             <td>${user.id}</td>
             <td>${user.firstName}</td>
             <td>${user.lastName}</td>
             <td>${user.age}</td>
             <td>${user.email}</td>
             <td>` + getRole(user.roles)
    if (table.parentElement.className.includes('users')) {
        output += `</td>
             <td>
                 <button type="button" class="btn btn-info text-white my-1"
                 data-bs-toggle="modal"
                 data-bs-target="#modal-edit-user"
                 onclick="dataTransfer(getParent(this, 'TR'), 'form-edit-user')">Edit</button>
             </td>
             <td>
                 <button type="button" class="btn btn-danger text-white my-1"
                 data-bs-toggle="modal"
                 data-bs-target="#modal-del-user"
                 onclick="dataTransfer(getParent(this, 'TR'), 'form-del-user')">Delete</button>
             </td>`
    }
    tr.classList.add('user-id-' + user.id)
    tr.innerHTML = output
    table.appendChild(tr)
    return tr
}

function renderRoles(roles, form) {
    let addUserFormSelect = form.getElementsByTagName('SELECT')[0]
    let buttonAddUser = addUserForm.getElementsByTagName('BUTTON')[0]
    let output = ''
    roles.forEach(role => {
        output += `<option value="${role.id}">${role.name.replace('ROLE_', '')}</option>`
    })
    addUserFormSelect.innerHTML = output
}

function parseForm(form) {
    const inputs = form.getElementsByTagName("INPUT")
    const select = form.getElementsByTagName("SELECT")[0]
    const selected = select.querySelectorAll('option:checked')
    const result = Array.from(inputs).map(el => el.value)
    const roles = Array.from(selected).map(el => {
        let role = {}
        role.id = el.value
        role.name = el.text
        return role
    })
    result.push("roles")
    result[result.length - 1] = roles
    return result
}

// GET
function getUsers() {
    fetch(url)
        .then(getResponse)
        .then(users => {
            for (let user of users) {
                renderUser(user)
                renderUserMenu(user)
            }
        })
}

function getRoles() {
    fetch('/api/roles')
        .then(getResponse)
        .then(roles => {
            renderRoles(roles, addUserForm)
            renderRoles(roles, editUserForm)
            renderRoles(roles, delUserForm)
        })
}

function getUser(e, id) {
    click(document.getElementById('users-tab'))
    oneUserTableRow.removeChild(oneUserTableRow.getElementsByTagName('TR')[0])
    fetch(url + '/' + id)
        .then(getResponse)
        .then(user => {
            let aSelectors = menuUsers.querySelectorAll('a')
            aSelectors.forEach(function (item) {
                item.classList.remove('active')
            })
            let usersSelectors = document.querySelectorAll('.users')
            let oneUserSelectors = document.querySelectorAll('.one-user')
            if (user.email === currentEmail.innerHTML) {

                usersSelectors.forEach(function (item) {
                    item.classList.remove('d-none')
                })
                oneUserSelectors.forEach(function (item) {
                    item.classList.add('d-none')
                })
            } else {
                usersSelectors.forEach(function (item) {
                    item.classList.add('d-none')
                })
                oneUserSelectors.forEach(function (item) {
                    item.classList.remove('d-none')
                })
            }
            e.classList.add('active')
            renderUser(user, oneUserTableRow)
        })
}

function showOneUser(id) {
    fetch(url + '/' + id)
        .then(getResponse)
        .then(user => {
            let aSelectors = menuUsers.querySelectorAll('a')
            aSelectors.forEach(function (item) {
                item.classList.remove('active')
            })
            renderUser(user, oneUserTableRow)
        })
}

// POST
addUserForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const dataForm = parseForm(addUserForm)
    let user = {
        firstName: dataForm[0],
        lastName: dataForm[1],
        age: dataForm[2],
        email: dataForm[3],
        password: dataForm[4],
        roles: dataForm[5]
    }
    fetch(url, requestOptions('POST', user))
        .then(getResponse)
        .then(user => {
            renderUser(user)
            renderUserMenu(user)
        })
        .then(addUserForm.reset())
})

// DELETE
delUserForm.onsubmit = function (e) {
    e.preventDefault()
    const id = delUserForm.querySelector('#userId').value
    fetch(url + '/' + id, {
        method: "DELETE",
        // body: new FormData(delUserForm)
    }).then(() => {
        let userSelectors = document.querySelectorAll('.user-id-' + id)
        userSelectors.forEach(function (userItem) {
            userItem.remove()
        })
    })
    click(delUserForm.querySelector('.btn-secondary'))
}

// PATCH
editUserForm.onsubmit = async function (e) {
    e.preventDefault()
    let dataForm = parseForm(editUserForm)
    let user = {
        id: dataForm[0],
        firstName: dataForm[1],
        lastName: dataForm[2],
        age: dataForm[3],
        email: dataForm[4],
        password: dataForm[5],
        roles: dataForm[6]
    }
    let id = editUserForm.querySelector('#userId').value
    const response = await fetch(url + '/' + id, requestOptions('PATCH', user))
        .then(function (response) {
            if (response.ok) {
                let userTableSelector = usersTableRow.querySelector('.user-id-' + id)
                userTableSelector.replaceWith(renderUser(user))
                let userMenuSelector = menuUsers.querySelector('.user-id-' + id)
                userMenuSelector.replaceWith(renderUserMenu(user))
                click(editUserForm.querySelector('.btn-secondary'))
                return response.text()
            }
            throw new Error('Something went wrong.')
        })
        .then(function (text) {
            console.log('Request successful', text)
        })
        .catch(function (error) {
            console.log('Request failed', error)
        })

}