function validateContactForm() {
  // Get form fields
  var name = document.forms["contactForm"]["name"].value;
  var phone = document.forms["contactForm"]["phone"].value;
  var email = document.forms["contactForm"]["email"].value;
  var description = document.forms["contactForm"]["description"].value;

  // Regular expression patterns for validation
  var namePattern = /^[A-Za-z\s]{5,}$/; // Alphabets and spaces only, minimum 5 characters
  var phonePattern = /^05\d{8}$/; // Starts with "05" prefix and followed by 8 digits
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern

  // Validate name field
  if (!name.match(namePattern)) {
    alert("Please enter a valid name with at least 5 characters.");
    return false;
  }

  // Validate phone number field
  if (!phone.match(phonePattern)) {
    alert("Please enter a valid phone number starting with '05' followed by 8 digits.");
    return false;
  }

  // Validate email field
  if (!email.match(emailPattern)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Validate description field
  if (description.trim().length === 0) {
    alert("Please enter a description.");
    return false;
  }

  if (description.length > 100) {
    alert("The description should not exceed 100 characters.");
    return false;
  }

  // Form is valid
  return true;
}

