// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
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
    const value = grocery.value;
    // To generate a unique ID, use the new Date() value, which is going to be in miliseconds and a unique number every time!
    const id = new Date().getTime().toString();

    if (value && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");
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
    const items = document.querySelectorAll('.grocery-item');
    
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
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
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit"
}

// Set back to Default
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
     submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
// localStorage API
// setItem
// getItem
// removeItem
// save as strings
function addToLocalStorage(id, value){
    const grocery = {id, value};
    let items = getLocalStorage();
    items.push(grocery);
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
    element.classList.add('grocery-item');
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