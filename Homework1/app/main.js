let form = document.getElementsByClassName('wow');
let userData = [];

function renderUsers(userData) {
    let htmlStr = ``;
    for (let i in userData) {
        htmlStr += `<tr>
            <td>${+i + 1}</td>
            <td>${userData[i].name}</td>
            <td>${userData[i].email}</td>
            <td>${userData[i].date}</td>
            <td><img src="${userData[i].picture}"></td>
            <td><button type="button" id="del" onclick="userData.splice(i, i)"><img src="img/cross.png"></button>
        </tr>`
    }
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('date').value = '';
    document.getElementById('picture').value = '';
    document.querySelector('tbody').innerHTML = htmlStr; 
}

// document.querySelector('form.wow').addEventListener('submit', function (e) {
//     e.preventDefault();
//     console.log(userCard.name.value, userCard.email.value, userCard.date.value);
// });

function addUser(e) {
    e.preventDefault();
    let userCard = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        picture: document.getElementById('picture').value
    }
    if (!userCard.name) {
        alert('Please type in your name');
        return;
    }
    else {
        if (!userCard.email) {
            alert('Please type in your email');
            return;
        }
        else {
            if (!userCard.date) {
                alert('Please type in your date of birth');
                return;
            }
            else {
                if (!userCard.picture) {
                    alert('Please add your picture');
                    
                }
            }
        }
    }
    userData.push(userCard);
    renderUsers(userData);
}
document.getElementById('submit').addEventListener('click', addUser);

    