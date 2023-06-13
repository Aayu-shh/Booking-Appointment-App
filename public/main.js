/*
* Note: Currently Working/Complete functionalities -
*       1. Display Appointment list
*       2. Add New Appointment to DB
*       3  Added DELETE Funtionality
*       4. Added UPDATE functionality
*       *5. Refresh Page to see it on the bottom of AppointMents List
*
*       To Add/Fix -
*       1. showOutput function - to ADD new user to page instantly (Currenty Refresh needed)
*
*/
const myForm = document.querySelector("#myForm");
const named = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");

const msg = document.querySelector(".msg");
const itemList = document.querySelector(".items");

window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:1000/users")
        .then(resObj => {
            (resObj.data).forEach(res => {
                console.log(res);
                showOutput(res);
            });
        })
})


myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (named.value == "" || email.value == "" || phone.value == "") {
        msg.style.color = 'red';
        msg.textContent = 'Please fill all the details!';

        setTimeout(() => msg.remove(), 5000);
    }
    else {
        let user = {
            name: e.target.name.value,               //Tryinng stuff 
            email: email.value,
            phone: phone.value
        };

        axios.post("http://localhost:1000/add-user", user)
            .then(res => showOutput(res.data));
        //clear Fields
        named.value = '';
        email.value = '';
        phone.value = '';
    }
});

function showOutput(res) {
    let li = document.createElement('li');
    li.append(document.createTextNode(`${(res.name)} : ${(res.email)} : ${(res.phone)}`))
    let delBtn = document.createElement('button');
    delBtn.append(document.createTextNode("Delete User"));
    delBtn.classList = "btn btn-danger m-1"
    let editBtn = document.createElement('button');
    editBtn.append(document.createTextNode("Edit User"));
    editBtn.classList = "btn btn-warning m-1"

    editBtn.onclick = () => {
        named.value = res.name;
        email.value = res.email;
        phone.value = res.phone;
        axios.delete(`http://localhost:1000/users/${res.id}`)
            .then((editRes) => {
                console.log(`Editing User ${named.value}'s Details`);
                li.remove();
            })
            .catch(err => console.log('Failed to edit the details' + err))
    }

    delBtn.onclick = () => {
        let userName = res.name;
        axios.delete(`http://localhost:1000/users/${res.id}`)
            .then(res => {
                console.log(`${userName}'s data was deleted sucessfully`);
                li.remove();
            }).catch(err => console.log("Failed to delete User", err));

    }

    li.append(editBtn);
    li.append(delBtn);
    itemList.append(li);    
};