//const billValue = document.getElementById("bill");
//const numPeopleValue = document.getElementById("numbers");

document.addEventListener('keydown', event => {
    console.log(`A key is pressed: ${event.key}`)
});

document.addEventListener('keyup', event => {
    console.log(`A key is released: ${event.key}`)
})