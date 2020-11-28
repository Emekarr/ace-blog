const hamburgerButton = document.querySelector(".fa-bars");
const closeMenuButton = document.querySelector(".fa-close");
const navMenu = document.querySelector("nav");
//form submit button
const submitButton = document.querySelector(".form > button");

const navBarController = (moveIn, moveOut, action1, action2) => {
  hamburgerButton.classList.remove(moveIn);
  closeMenuButton.classList.remove(moveOut);
  hamburgerButton.classList.add(moveOut);
  closeMenuButton.classList.add(moveIn);
  navMenu.classList.remove(action2);
  navMenu.classList.add(action1);
};

if (submitButton){
  submitButton.addEventListener("click", (event) => {
    const formFields = document.querySelectorAll(".form > input");
    const usernameField = formFields[0];
    const passwordField1 = formFields[1];
    const passwordField2 = formFields[2];
  
    if (passwordField1.value !== passwordField2.value) {
      event.preventDefault();
      const authFailedBanner = document.querySelector(".auth-failed-banner");
      authFailedBanner.firstElementChild.innerHTML =
        "Make sure your passwords match!";
      authFailedBanner.classList.add("show-banner");
    } else if (passwordField1.value.length < 5) {
      event.preventDefault();
      const authFailedBanner = document.querySelector(".auth-failed-banner");
      authFailedBanner.firstElementChild.innerHTML =
        "Make sure your password is more than 4 digits";
      authFailedBanner.classList.add("show-banner");
    } else if (usernameField.value.includes(" ")) {
      event.preventDefault();
      const authFailedBanner = document.querySelector(".auth-failed-banner");
      authFailedBanner.firstElementChild.innerHTML =
        "Username must not contain any white spaces!";
      authFailedBanner.classList.add("show-banner");
    }
  });
}

hamburgerButton.addEventListener("click", () => {
  navBarController("move-in", "move-out", "nav-open", "nav-close");
});

closeMenuButton.addEventListener("click", () => {
  navBarController("move-out", "move-in", "nav-close", "nav-open");
});
