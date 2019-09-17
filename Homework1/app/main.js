var nameInput = document.getElementById("name");
var dateInput = document.getElementById("date");
var emailInput = document.getElementById("email");



document.querySelector('form.wow').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(nameInput.value, emailInput.value, dateInput.value);
});
