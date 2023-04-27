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