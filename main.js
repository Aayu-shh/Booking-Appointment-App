//Crudcrud Links MUST be replaced for the code to work in FUTURE
const myForm = document.querySelector("#myForm");
const named = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const msg = document.querySelector(".msg");
const lMsg = document.querySelector(".listMsg");
const itemList = document.querySelector(".items");

window.addEventListener("DOMContentLoaded", (e) => {
    axios.get("https://crudcrud.com/api/b114c6909e714a77b31f23f09b00eb8e/appointments")
        .then(resObj => {
            (resObj.data).forEach(res => showOutput(res));
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

        axios.post("https://crudcrud.com/api/b114c6909e714a77b31f23f09b00eb8e/appointments", user)
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
    let editBtn = document.createElement('button');
    editBtn.append(document.createTextNode("Edit User"));

    editBtn.onclick = () => {
        named.value = res.name;
        email.value = res.email;
        phone.value = res.phone;
        axios.delete(`https://crudcrud.com/api/b114c6909e714a77b31f23f09b00eb8e/appointments/${res._id}`)
            .then((editRes) => {
                console.log(`Editing User ${named.value}'s Details`);
                li.remove();
            })
            .catch(err => console.log('Failed to edit the details' + err))
    }

    delBtn.onclick = () => {
        let userName = res.name;
        axios.delete(`https://crudcrud.com/api/b114c6909e714a77b31f23f09b00eb8e/appointments/${res._id}`)
            .then(res => {
                console.log(`${userName}'s data was deleted sucessfully`);
                li.remove();
            }).catch(err => console.log("Failed to delete User", err));

    }

    li.append(editBtn);
    li.append(delBtn);
    itemList.append(li);

    console.log(res);
};