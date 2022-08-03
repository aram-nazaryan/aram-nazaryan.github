let info = [
    {
        name: "Aram Nazaryan",
        age: 23,
        city: "Yerevan",
        university: "YSU",
        gender: "male",
    },
    {
        name: "Garik Sahakyan",
        age: 22,
        city: "Yerevan",
        university: "YSU",
        gender: "male",
    },
    {
        name: "Ashkhen Voskanyan",
        age: 21,
        city: "Yerevan",
        university: "AUA",
        gender: "female",
    },
    {
        name: "Narek Vardanyan",
        age: 26,
        city: "Yerevan",
        university: "YSMU",
        gender: "male",
    },
    {
        name: "Anush Gamazyan",
        age: 20,
        city: "Yerevan",
        university: "AUA",
        gender: "female",
    },
    {
        name: "Anna Gasparyan",
        age: 21,
        city: "Yerevan",
        university: "UFAR",
        gender: "female",
    },
]

const user_box = document.getElementById("lsit_of_users");
const serach_text = document.getElementById("serach-input");
const serach_button = document.getElementById("search-button");
const error_mes = document.getElementById("error");
const filters = document.getElementById("filters-open");
const submit = document.getElementById("submit");
const register = document.getElementById("register-open");
const enter = document.getElementById("enter");
const pop_up = document.getElementById("register");

function is_empty(filteredUsers){
    user_box.innerHTML = "";
    if(filteredUsers.length === 0) {
        error_mes.innerHTML = "Not found."; 
        user_box.style.border = "0";
    }
    else{
        user_box.style.border = "1px solid black";
        error_mes.innerHTML = "";
        create_element(filteredUsers);
    }
}

function create_element(list){
    for (user of list){
        let new_box = document.createElement('div');
        new_box.classList.add("user_data")
        new_box.innerHTML = `
        <svg class="cross" onclick="deleteUser(this)" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>
        <h2 class="name" >${user.name}</h2>
        <p>Age: ${user.age}</p>
        <p>City: ${user.city}</p>
        <p>University: ${user.university}</p>
        <p>Gender: ${user.gender}</p>
        `
        user_box.appendChild(new_box);
    }
}

function deleteUser(user){
    let parent = user.parentElement;
    let children = parent.children;
    let indexOfUser = info.findIndex(usr => {
        return usr.name === children[1].innerHTML;
    })
    info.splice(indexOfUser, 1);
    parent.remove();
}

create_element(info);

submit.addEventListener('click', function(){
    const univer = document.getElementById("univer").value;
    const gender = document.getElementById("gender").value;

    const filtered_serach = info.filter(function(user){
        if(univer === ""){
            return (user.gender === gender);
        }
        else if(gender === ""){
            return user.university === univer;
        }
        else {
            return (user.gender === gender && user.university === univer);
        }
    })
    serach_text.value = univer + " " + gender;
    is_empty(filtered_serach);
})

const filter_box = document.getElementById("filters");
filters.addEventListener("click", function(){
    
    if(filter_box.style.display === "none" || filter_box.style.display === ""){
        filter_box.style.display = 'block';
    }
    else{
        filter_box.style.display = 'none';
    }
})

serach_button.addEventListener("click", function(key){  
    let filteredUsers = info.filter(function(person){
        return person.name.toLowerCase().includes(serach_text.value.toLowerCase()) ||
               person.age === (parseInt(serach_text.value)) ||
               person.city.toLowerCase().includes(serach_text.value.toLowerCase()) ||
               person.university.toLowerCase().includes(serach_text.value.toLowerCase()) || 
               person.gender.toLowerCase().includes(serach_text.value.toLowerCase());
    })
    is_empty(filteredUsers);
});

serach_text.addEventListener("keyup", function(key){
    if(key.key === "Enter")
        serach_button.click();
    if(serach_text.value === ""){
        user_box.innerHTML = "";
        error_mes.innerHTML = "";
        create_element(info);
    }
})

register.addEventListener("click", function(){
    if(pop_up.style.display === "" || pop_up.style.display === "none"){
        pop_up.style.display = "block";
    }
    else{
        pop_up.style.display = "none";
    }
})



function createUser(){
    const username = document.getElementById("username");
    const userage = document.getElementById("userage");
    const city = document.getElementById("city");
    const univer = document.getElementById("univer_box");
    const male = document.getElementById("male");

    let temp = "";
    if(male.checked){
        temp = male.value;
    }
    else {
        temp = "female";
    }
    info.push({
        name: username.value,
        age: parseInt(userage.value),
        city: city.value,
        university: univer.value,
        gender: temp,
    })
    is_empty(info);

    username.value = "";
    userage.value  = "";
    city.value = "";
    univer.value = "";
    pop_up.style.display = "none";

}

function closing_register(){
    pop_up.style.display = "none";
}

function closing_filter(){
    filter_box.style.display = 'none';
}