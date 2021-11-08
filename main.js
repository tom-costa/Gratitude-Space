// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.gratitude-form');
const gratitude = document.getElementById('gratitude');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.gratitude-container');
const list = document.querySelector('.gratitude-list');
const clearBtn = document.querySelector('.clear-btn');
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** EVENT LISTENERS **********
// submit form:
form.addEventListener('submit', addItem);
// Clear items
clearBtn.addEventListener('click', clearItems);
 // load items
window.addEventListener('DOMContentLoaded', setupItems);

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = gratitude.value;
    // To generate a unique ID, use the new Date() value, which is going to be in miliseconds and a unique number every time!
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("gratitude-item");
        element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit fa-lg"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash fa-lg"></i>
              </button>
            </div>
          `;
        // add event listeners to both buttons;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);

        // append child
        list.appendChild(element);

        // Display alert:
        displayAlert("item added to the list", "success");
        // show container
        container.classList.add("show-container");
        // add to local storage:
        addToLocalStorage(id, value);

        // Set back to Default
        setBackToDefault();
        // console.log('add item to the list')
    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        // edit local storage:
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert("Please enter a value", "danger")
    }
    showAffirmation();
}

// Display Alert
function displayAlert(text, action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // Remove alert after 1 sec:
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// Clear Items
function clearItems(){
    const items = document.querySelectorAll('.gratitude-item');
    
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
    clearAffirmation() // Remove Affirmation from screen
}
// Delete Function
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
    setBackToDefault();
    removeFromLocalStorage(id);
}
// Edit Function
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item:
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value:
    let gratitudeElement = editElement.innerHTML;
    gratitude.value = gratitudeElement;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.style.backgroundColor = "#FEA82F"
    submitBtn.textContent = "edit"
}

// Set back to Default
function setBackToDefault() {
    gratitude.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
    submitBtn.style.backgroundColor = "green";
}

// ****** LOCAL STORAGE **********
// localStorage API
// setItem
// getItem
// removeItem
// save as strings
function addToLocalStorage(id, value){
    const gratitude = {id, value};
    let items = getLocalStorage();
    items.push(gratitude);
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem('list')) : [];

}
function removeFromLocalStorage (id) {
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id !==id){
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if (item.id === id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

// ****** SETUP ITEMS *********
function setupItems () {
    let items = getLocalStorage();
    if (items.length > 0) {
    items.forEach(function(item) {
        createListItem(item.id, item.value);
    })
    container.classList.add('show-container')
    }
}

function createListItem (id, value){
    const element = document.createElement('article');
    // add id
    let attr = document.createAttribute('data-id');
    attr.value = id;
    // add class
    element.setAttributeNode(attr);
    element.classList.add('gratitude-item');
    
    element.innerHTML = `
    <p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit fa-lg"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash fa-lg"></i>
          </button>
        </div>
    `;
    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    // Append child
    list.appendChild(element);
}

// Button Change Background Color:
// const hex = [0,1,2,3,4,5,6,7,8,9,"A", "B", "C", "D", "E", "F"];

// const btnBg = document.querySelector(".btn-bg-change");

// btnBg.addEventListener('click', function(){
//     let hexColour = "#"
//     for (i=0; i < 6; i++){
//         hexColour = hexColour + hex[randomNumber()]
//     }
//     document.body.style.backgroundColor = hexColour;
// });

// function randomNumber() {
//     return Math.floor(Math.random() * hex.length);
// }

// Need to save BG color to local storage

// Change Background Video:
// const videoSources = ["assets/pexels-rostislav-uzunov-7385122.mp4","assets/pexels-rostislav-uzunov-9629255.mp4", "assets/productionID_4779866.mp4", "assets/pexels-rostislav-uzunov-8303104.mp4"];

// const btnBg = document.querySelector(".btn-bg-change");

// let bgchoice = 0;

// btnBg.addEventListener('click', function(){
//     if (bgchoice < videoSources.length - 1){
//         bgchoice++
//     } else {
//         bgchoice = 0
//     }
//     document.querySelector('.videoBg').innerHTML = `<video src=${videoSources[bgchoice]} autoplay loop></video>`
// });

// Positive Affirmations:
// const affirmationList = [
//     "You got this",
//     "You'll figure it out",
//     "You're a smart cookie",
//     "I believe in you",
//     "Sucking at something is the first step towards being good at something",
//     "Struggling is part of learning",
//     "Everything has cracks - that's how the light gets in",
//     "Mistakes don't make you less capable",
//     "We are all works in progress",
//     "You are a capable human",
//     "You know more than you think",
//     "10x engineers are a myth",
//     "If everything was easy you'd be bored",
//     "I admire you for taking this on",
//     "You're resourceful and clever",
//     "You'll find a way",
//     "I know you'll sort it out",
//     "Struggling means you're learning",
//     "You're doing a great job",
//     "It'll feel magical when it's working",
//     "I'm rooting for you",
//     "Your mind is full of brilliant ideas",
//     "You make a difference in the world by simply existing in it",
//     "You are learning valuable lessons from yourself every day",
//     "You are worthy and deserving of respect",
//     "You know more than you knew yesterday",
//     "You're an inspiration",
//     "Your life is already a miracle of chance waiting for you to shape its destiny",
//     "Your life is about to be incredible",
//     "Nothing is impossible. The word itself says 'I’m possible!'",
//     "Failure is just another way to learn how to do something right",
//     "I give myself permission to do what is right for me",
//     "You can do it",
//     "It is not a sprint, it is a marathon. One step at a time",
//     "Success is the progressive realization of a worthy goal",
//     "People with goals succeed because they know where they’re going",
//     "All you need is the plan, the roadmap, and the courage to press on to your destination",
//     "The opposite of courage in our society is not cowardice... it is conformity",
//     "Whenever we’re afraid, it’s because we don’t know enough. If we understood enough, we would never be afraid",
//     "The past does not equal the future",
//     "The path to success is to take massive, determined action",
//     "It’s what you practice in private that you will be rewarded for in public",
//     "Small progress is still progress",
//     "Don't worry if you find flaws in your past creations, it's because you've evolved",
//     "Starting is the most difficult step - but you can do it",
//     "Don't forget to enjoy the journey",
//     "It's not a mistake, it's a learning opportunity",
//   ];

// const affirmations = document.querySelector('.affirmation-text');
// const getRandomAffirmations = () => affirmationList[Math.floor(Math.random() * affirmationList.length)]

// function showAffirmation() {
//     document.querySelector('.affirmation-text').innerHTML = getRandomAffirmations();
//     console.log(getRandomAffirmations())
//     // setTimeout(function() {
//     //     document.querySelector('.affirmation-text').innerHTML = "" 
//     // }, 2000)
// }

// function clearAffirmation() {
//     document.querySelector('.affirmation-text').innerHTML = ""
// }




