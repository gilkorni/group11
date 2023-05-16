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

const iconDown1 = document.querySelector(".iconDown1");
  iconDown1.addEventListener("click", () => {
    window.location.href = "contact.html";
  });
    const iconDown2 = document.querySelector(".iconDown2");
  iconDown2.addEventListener("click", () => {
    window.location.href = "contact.html";
  });