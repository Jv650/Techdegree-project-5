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


async function getUsers() {

    try {
    const response = await fetch (
        'https://randomuser.me/api/?results=12&inc=name,location,picture,email,phone,dob'
    );
    const data = await response.json();
    displayUsers(data.results);
    users = data.results; 
} catch (error) {
    console.error('Error fetching results:', error);
  }
}




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
    
    gallery.insertAdjacentHTML('beforeend', userCard); 
    });
}



gallery.addEventListener('click', 
    function(event) {
        const userCard = event.target.closest('.card')
        if(!userCard) return;
        
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
                        <p class="modal-text cap">${user.location.city}</p>
                        <hr>
                        <p class="modal-text">${user.phone}</p>
                        <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}</p>
                        <p class="modal-text">Birthday: ${new Date(user.dob.date).toLocaleDateString()}</p>
                    </div>
                </div>
    `;
    document.body.appendChild(modalContainer);   
    const closeBtn = document.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => { 
});
    
   closeBtn.addEventListener('click', () => {
        modalContainer.remove();
    });


  }
//CLOSE MODAL 

getUsers();








  