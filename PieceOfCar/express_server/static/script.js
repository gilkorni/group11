// cange letters of piece of car in a cool way



const iconDown1 = document.querySelector(".iconDown1");
  iconDown1.addEventListener("click", () => {
    window.location.href = "/contact";
  });
    const iconDown2 = document.querySelector(".iconDown2");
  iconDown2.addEventListener("click", () => {
    window.location.href = "/contact";
  });











function validateEmail(email) {
  // Simple email validation regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePhoneNumber(phone) {
  // Phone number validation regex pattern
  const phonePattern = /^05\d{8}$/;
  return phonePattern.test(phone);
}

// Separate JavaScript file: validation.js

// Function to validate the update form
function validateUpdateDetails() {
  // Get form fields
  var password = document.forms["updateForm"]["password"].value;
  var name = document.forms["updateForm"]["name"].value;
  var phone = document.forms["updateForm"]["phone"].value;

  // Regular expression patterns for validation
  var passwordPattern = /^[A-Za-z0-9]{8,}$/; // Alphabets and numbers only, minimum 8 characters
  var namePattern = /^[A-Za-z\s]{5,}$/; // Alphabets and spaces only, minimum 5 letters
  var phonePattern = /^05\d{8}$/; // Starts with "05" prefix and followed by 8 digits

  // Validate password field
  if (!password.match(passwordPattern) && !password.match("")) {
    alert("Please enter a valid password with at least 8 characters, consisting of letters or numbers only.");
    return false;
  }

  // Validate name field
  if (!name.match(namePattern) && !name.match("")) {
    alert("Please enter a valid name with at least 5 letters.");
    return false;
  }

  // Validate phone number field
  if (!phone.match(phonePattern) && !phone.match("")) {
    alert("Please enter a valid phone number starting with '05' followed by 8 digits.");
    return false;
  }

  // Form is valid
  return true;
}





