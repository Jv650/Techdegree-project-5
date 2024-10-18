//Get and display random users 
/*Use the response data to display 12 users, along with some basic information for each:
    -Image
    -First and Last Name
    -Email
    -City or location
*/

let users = []; //will store fetched user data
const modalContainer = document.querySelector('.modal-container'); //selects modal container element
const gallery = document.querySelector('.gallery'); //selecy gallery element where user card will be displayed
const closeBtn = document.querySelector('.modal-close-btn'); //select close button element
const container = document.querySelector('.search-container');//select search container element
const card = document.querySelector('.card'); //selects a user card

//FETCH USER DATA FROM API
async function getUsers() {

    try { //code below will fetch the data for 12 users with the data fields
    const response = await fetch (
        'https://randomuser.me/api/?results=12&inc=name,location,picture,email,phone,dob'
    );
    const data = await response.json(); //response will be converted to JSON
    displayUsers(data.results); //displayUsers will show users in gallery
    users = data.results; //will store the fetched user data inside the users array
} catch (error) {
    console.error('Error fetching results:', error); //will log error if fetching fails
  }
}

//DISPLAYS USER CARDS IN THE GALLERY
function displayUsers(users) { 
    
    users.forEach(user => {
    const userCard = `
            <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${user.picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${user.name.first}, ${user.name.last}</h3>
                        <p class="card-text">${user.email}</p>
                        <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                    </div>
                </div>
        `;
    //the html code above is a template for a user card which will display name, email, image, and location
    gallery.insertAdjacentHTML('beforeend', userCard);//inserts the user card into the gallery 
    });
}

//EVENT LISTENER FOR CLICKING ON A USER CARD 
gallery.addEventListener('click', 
    function(event) {
        const userCard = event.target.closest('.card') //finds the closest .card element to the click event
        if(!userCard) return; //will exit if the click was not a user card
        
        const userEmail = userCard.querySelector('.card-text').textContent;//gets the email from the clicked card
        const user = users.find( 
            (user) => user.email === userEmail
        ); //finds the user object based on the clicked email 
        showModal(user);//will call showModal to display user details in a modal
});

//DISPLAYS A MODAL WITH USER DETAILS
function showModal(user) {
    const modalContainer = document.createElement('div'); //creates a new div element 
    modalContainer.innerHTML =
         `
         <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${user.name.first}, ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">${user.phone}</p>
                        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString()}</p>
                    </div>
                </div>
    `;//the html code above will set the the inner HTML for the modal and will display names, phone, location, etc.
    document.body.appendChild(modalContainer);//will append modal to body of the html doc
    const closeBtn = document.querySelector('.modal-close-btn');//selects close button class and stores in var
    
   closeBtn.addEventListener('click', () => { //add event listener on the button to listen for a click
        modalContainer.remove();//will hide the modal when close btn is clicked
    });
  }

getUsers();








  