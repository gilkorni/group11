
// cange letters of piece of car in a cool way

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
document.querySelector("h2").onmouseover = event => {
    let iterations = 0;
    const interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
            .map((letter, index) => {
            if (index < iterations) {
                return event.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)]
            })
            .join("");

        if(iterations >= event.target.dataset.value.length) clearInterval(interval);

        iterations += 1 /4 ;
    }, 30);
}


// change between registration to login
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', ()=>{
   wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
   wrapper.classList.remove('active');
});





















function validateForm() {
  // Get form fields
  var name = document.forms["registrationForm"]["name"].value;
  var email = document.forms["registrationForm"]["email"].value;
  var password = document.forms["registrationForm"]["password"].value;
  var phone = document.forms["registrationForm"]["phone"].value;

  // Regular expression patterns for validation
  var namePattern = /^[A-Za-z\s]{5,}$/; // Alphabets and spaces only, minimum 5 letters
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
  var passwordPattern = /^[A-Za-z0-9]{8,}$/; // Alphabets and numbers only, minimum 8 characters
  var phonePattern = /^05\d{8}$/; // Starts with "05" prefix and followed by 8 digits

  //Validate name field
  if (!name.match(namePattern)) {
    alert("Please enter a valid name with at least 5 letters.");
    return false;
  }

  // Validate email field
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Validate password field
  if (!password.match(passwordPattern)) {
    alert("Please enter a valid password with at least 8 characters, consisting of letters or numbers only.");
    return false;
  }

  // Validate phone number field
  if (!phone.match(phonePattern)) {
    alert("Please enter a valid phone number starting with '05' followed by 8 digits.");
    return false;
  }

  // Form is valid
  return true;
}
