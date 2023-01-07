const menuUsers = document.querySelector('.menu-users')
const oneUserTable = document.getElementById('table-one-user')
const oneUserTableRow = oneUserTable.getElementsByTagName('TBODY')[0]
const getResponse = response => response.json()
const url = '/api/users'

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
    a.classList.add('nav-link', 'active')
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
             </td>
         `
    }
    tr.classList.add('user-id-' + user.id)
    tr.innerHTML = output
    table.appendChild(tr)
    return tr
}

// GET
function getUser(id) {
    oneUserTableRow.removeChild(oneUserTableRow.getElementsByTagName('TR')[0])
    fetch(url + '/' + id)
        .then(getResponse)
        .then(user => {
            renderUserMenu(user)
            renderUser(user, oneUserTableRow)
        })
}