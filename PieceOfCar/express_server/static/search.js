
// code for overlay after clicking on bid
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal=> {
        closeModal(modal)
    })
})

function openModal(modal) {
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}


// listener to update the dropdowns in the search fields
window.addEventListener('DOMContentLoaded', () => {
  // Fetch the dropdown values from the server
  fetch('/dropdown-values1')
    .then((response) => response.json())
    .then((data) => {
      const dropdownValues = data.values;

      // Get the dropdown element from the HTML
      const dropdown = document.getElementById('carDropdown');

      // Populate the dropdown options
      dropdownValues.forEach((value) => {
        const option = document.createElement('option');
        option.text = value;
        dropdown.add(option);
      });
    })
    .catch((error) => {
      console.log('Error fetching dropdown values:', error);
    });
});

window.addEventListener('DOMContentLoaded', () => {
  // Fetch the dropdown values from the server
  fetch('/dropdown-values2')
    .then((response) => response.json())
    .then((data) => {
      const dropdownValues = data.values;

      // Get the dropdown element from the HTML
      const dropdown = document.getElementById('areaDropdown');

      // Populate the dropdown options
      dropdownValues.forEach((value) => {
        const option = document.createElement('option');
        option.text = value;
        dropdown.add(option);
      });
    })
    .catch((error) => {
      console.log('Error fetching dropdown values:', error);
    });
});

window.addEventListener('DOMContentLoaded', () => {
  // Fetch the dropdown values from the server
  fetch('/dropdown-values3')
    .then((response) => response.json())
    .then((data) => {
      const dropdownValues = data.values;

      // Get the dropdown element from the HTML
      const dropdown = document.getElementById('itemtype');

      // Populate the dropdown options
      dropdownValues.forEach((value) => {
        const option = document.createElement('option');
        option.text = value;
        dropdown.add(option);
      });
    })
    .catch((error) => {
      console.log('Error fetching dropdown values:', error);
    });
});


// listener to check if the price for specific bid was updated
document.addEventListener('DOMContentLoaded', function () {
  const bidButtons = document.querySelectorAll('.btn-select');
  const modal = document.getElementById('modal');
  const highestOfferElement = modal.querySelector('#highestOffer');
  const itemIdElement = modal.querySelector('#itemId');
  const itemPriceElement = modal.querySelector('#itemPrice');

  bidButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const price = this.getAttribute('data-price');
      const id = this.getAttribute('data-id');
      const offerInput = modal.querySelector('.My_offer');

      highestOfferElement.textContent = 'Highest current offer: ' + price;
      itemIdElement.value = id;
      itemPriceElement.value = price;
      offerInput.value = '';

      // Show the modal
      modal.style.display = 'block';
    });
  });

  const closeButton = modal.querySelector('.close-button');
  closeButton.addEventListener('click', function () {
    // Hide the modal
    modal.style.display = 'none';
  });
});

