document.addEventListener('DOMContentLoaded', function () {

  document.getElementById('myForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    returnContainer.innerHTML = ""
    nameContainer.innerHTML = ""
    emailContainer.innerHTML = ""
    messageContainer.innerHTML = ""
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\u00C0-\u01FF]+([ '-][a-zA-Z\u00C0-\u01FF]+)*$/;
    var completedForm = 0;

    // Check name / email / message for correct content and add 1 to completedForm variable
    if (nameRegex.test(name)) {
        completedForm += 1; }
        else {
            nameContainer.innerHTML = `<p style="color: #f87171; font-size: 12px;">You must enter a name</p>`;
        }
    if (emailRegex.test(email)) {
        completedForm += 1; }
        else {
            emailContainer.innerHTML = `<p style="color: #f87171; font-size: 12px;">You must enter an email address</p>`;
        }

    if (message.length > 0) {
        completedForm += 1; }
        else {
            messageContainer.innerHTML = `<p style="color: #f87171; font-size: 12px;">You must enter a message</p>`;
        }
    
    // Only submit the form when all three content checks are completed.
    if (completedForm === 3) {
        returnContainer.innerHTML = '<p style="font-weight: bold; text-align: center">Sending...</p>';
        await new Promise(r => setTimeout(r, 3000));
        returnContainer.innerHTML = '<p style="font-weight: bold; text-align: center">Your messages has been sent!</p>'

    }
  });
});
