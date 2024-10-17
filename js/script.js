//Get and display random users 
/*Use the response data to display 12 users, along with some basic information for each:
    -Image
    -First and Last Name
    -Email
    -City or location
*/
let users = [];
const modalContainer = document.querySelector('.modal-container');
const gallery = document.querySelector('.gallery');
const closeBtn = document.querySelector('.modal-close-btn');
const container = document.querySelector('.search-container');
const card = document.querySelector('.card');

//FETCH DATA 
async function getUsers() {

    try {
    const response = await fetch (
        'https://randomuser.me/api/?results=12&inc=name,location,picture,email,phone,dob'
    );
    const data = await response.json();
    displayUsers(data.results);
    users = data.results; //maybe add .results
} catch (error) {
    console.error('Error fetching results:', error);
  }
}

/*container.addEventListener('click', (event) => {
    const userCard = event.target.closest('.card')
});*/
/*
const userName = userCard.dataset.name;
const user = users.find(
        (user) => user.name.common === userName
    );
    displayUserContainer(user);
});*/



//DISPLAY USERS
function displayUsers(users) {
    //const usersHTML = users
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
    //.join('');
    gallery.insertAdjacentHTML('beforeend', userCard); //gallery.innerHTML = usersHTML; //container?
    });
}

//EVENT LISTENER TO DISPLAY MODAL

gallery.addEventListener('click', 
    function(event) {
        const userCard = event.target.closest('.card')
        if(!userCard) return;
        //console.log(userCard);
        const userEmail = userCard.querySelector('.card-text').textContent;
        const user = users.find(
            (user) => user.email === userEmail
        );
        showModal(user);
});
function showModal(user) {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML =
         `
         <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${user.name.first}, ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}, ${user.location.state} </p>
                        <hr>
                        <p class="modal-text">${user.phone}</p>
                        <p class="modal-text">${user.location.street.number}</p>
                        <p class="modal-text">Birthday: ${user.dob.date}</p>
                    </div>
                </div>
    `;
    document.body.appendChild(modalContainer);
    //document.body.insertAdjacentElement('beforeend', modalHTML);//will insert before end of modal container div
   
    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => { 
        //showModal.remove();
         //console.log()
    //const modal = document.querySelector('.modal-container')  
});
    
   closeBtn.addEventListener('click', () => {
        modalContainer.remove();
    });


  }
//CLOSE MODAL 

getUsers();

/*
//DISPLAY USER MODAL
function displayUserContainer(user) {
    const modalHTML = `
         <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${user.picture}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${user.name}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location}</p>
                        <hr>
                        <p class="modal-text">${user.phone}</p>
                        <p class="modal-text">${user.location.street.number}</p>
                        <p class="modal-text">Birthday: ${user.dob.date}</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
    `;
    document.body.insertAdjacentElement('beforeend', modalHTML);
    closeBtn.addEventListener('click', () => {
        modalContainer.remove();
    });
}
    //displayUserContainer.innerHTML = modalHTML;
    //modalContainer.classList.add('open');
getUsers();
*/






  