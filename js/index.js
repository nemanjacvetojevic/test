//  import { firstName, lastName, phone, email, emailRegistrationButton, phoneRegistrationButton } from "./components.js"
const firstName = `<div id="first-name" class="form__input-container">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      class="form__input-field"
                    >
                    <label for="firstName" class="form__input-label"> First Name </label>
                  </div>`


const lastName = `<div class="form__input-container">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      class="form__input-field"
                    >
                    <label for="lastName" class="form__input-label"> Last Name</label>
                  </div>`

const email = `<div class="form__input-container">
                <input
                  id="email"
                  name="email"
                  class="form__input-field"
                >
                <label for="email" class="form__input-label"> Email address</label>
              </div>`

const phone = ` <div class="form__input-container">
                  <input
                    id="telNum"
                    name="telNum"
                    type="tel"
                    class="form__input-field"
                  >
                  <label for="telNum" class="form__input-label"> Telephone Number</label>
                </div>`

const currency = `<div class="form__input-container form__input-container--select">
                    <label for="currency">Chose currency</label>
                    <select id="currency" name="currency" class="custom-select">
                      <option value="Space Chicken" selected>Space Chicken</option>
                      <option value="Ethereum">Ethereum</option>
                      <option value="Augur">Augur</option>
                      <option value="RSD">RSD</option>
                    </select>
                  </div>`

const terms = `<div class="form__input-container form__input-container--centered">
                  <input id="terms" type="checkbox" name="terms" value="Terms" required>
                  <label for="terms"> I accept terms and conditions</label>
                </div>`

const promo = `<div class="form__input-container form__input-container--centered">
                <input id="promotions" type="checkbox" name="promotions" value="Promotions">
                <label for="Promotions"> Subscribe for promo notifications</label>
              </div>`

const submitButton = `<div class="form__input-container form__input-container--centered">
                        <input
                          class="button button__submit"
                          type="submit"
                          value="Submit"
                        >
                      </div>`

const App = function _App() {
};

App.render = () => {

  var message = ``;
  var loader = ``;
  if(App.state.error || App.state.successMessage !== "") {
    message = `
      <div class="message">${App.state.successMessage ? App.state.successMessage : App.state.errorMessage}</div>
    `;
  }
  if(App.state.loader) {
    loader = `
      <div class="loader">LOADING...<img class="rotating" src="./assets/myRocket.svg"></div>
    `;
  }


  return `
  <h1 class="heading">Registration page</h1>
  <div class="container">

    <div
    id="emailRegistration"
    class="tab ${App.state.emailRegistration ? 'active' : ''}" >
      Regiter email address
    </div>

    <div
    id="phoneRegistration"
    class="tab ${App.state.emailRegistration ? '' : 'active'}">
      Regiter with phone number
    </div>
    
    <form action="#" id="registrationForm" class="form">
        ${firstName}
        ${lastName}
        ${App.state.emailRegistration ? email : phone}
        ${currency}
        ${terms}
        ${promo}
        ${submitButton}
    </form>
  </div>
  <div class="${loader ? 'error-loader-container' : message ? 'error-loader-container' : ''} ">
    ${loader}
    ${message}
  </div> `;
}

const loader = `
  <div class='my-loader'>LOADING...<img class="rotating" src="./assets/myRocket.svg"></div>
`;

App.state = {
  emailRegistration: true,
  loader: false,
  errorMessage: 'Some server error occured',
  successMessage: "",
  formData: null
};

App.init = () => {
  App.form = document.getElementById('registrationForm');
  App.updateForm();
}

App.changeRegistrationMethod = newState => {
  if(App.state.emailRegistration != newState) {
    App.state.emailRegistration = newState;

    var data = new FormData(App.form);
    App.state.formData = data;

    App.updateForm(App.state.formData);
  }
};

App.validateForm = function() {
  var self = this;
  var errorMessage = "";
  var hasErrors = false;

  // console.log(
  //   App.formElements.firstName,
  //   App.formElements.lastName,
  //   App.formElements.email
  // );

  // need to validate elements: firstname, lastname, email, telephone (if present);
  if(App.formElements.firstName.value === "") {
    errorMessage += "First name is required" + "</br>";
    hasErrors = true;
  }
  if(App.formElements.lastName.value === "") {
    errorMessage += "Last name is required" + "</br>";
    hasErrors = true;
  }

  if(App.formElements.email) {
    if(App.formElements.email.value === "") {
      errorMessage += "Email is required" + "</br>";
      hasErrors = true;
    }
    if(App.formElements.email.value !== "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(App.formElements.email.value))) {
      errorMessage += "Please provide email address in correct format";
      hasErrors = true;
    }
  }
  if(App.formElements.telNum) {
    if(App.formElements.telNum.value == "") {
      errorMessage += "Telephone is required" + "\r\n";
      hasErrors = true;
    }

    if(App.formElements.telNum.value !== "" && !(/\d{3} \d{3}-\d{4}$/.test(App.formElements.telNum.value))) {
      errorMessage += "Please provide telephone in correct format (eg: 069/188-8123)";
      hasErrors = true;
    }
  }

  self.state.error = hasErrors;
  self.state.errorMessage = errorMessage;

  // console.log(hasErrors, errorMessage);

  return !hasErrors;
}

App.submitForm = function() {

  var self = this;

  var data = new FormData(self.form);
  self.state.formData = data;

  self.state.successMessage = "";
  self.state.error = false;

  if(self.validateForm()) {
    // mock submit

    self.state.loader = true;

    self.updateForm(data);

    // just a mock case for John Doe
    // mock error
    var mockError = data.get('firstName') == "Chicken" && data.get('lastName') == "Invader";

    setTimeout(function() {
      self.state.loader = false;
      self.state.error = mockError;
      if(mockError) {
        self.state.errorMessage = "Some rocket error occured";
      } else  {
        self.state.successMessage = "Registration complete!";
      }
      self.updateForm(data);
    }, 3000);
  } else {
    self.updateForm(data);
  }
};

App.handleClick = newState => {
  App.changeRegistrationMethod(newState)
}

App.updateInput = (inputId, value) => {
  var node = document.getElementById(inputId);
  if(node) {
    if(node.type == "checkbox") {
      node.checked = (value) ? true : false;
    } else {
      node.value = value;
    }
    if(node.nextElementSibling) {
      if(node.value || node.checked) {
        node.nextElementSibling.classList.add('shrink');
      } else {
        node.nextElementSibling.classList.remove('shrink');
      }
    }
  }
}

App.bindEvents = function() {

  App.formElements.phoneRegistrationButton
    .addEventListener("click", () => App.handleClick(false));
  App.formElements.emailRegistrationButton
    .addEventListener("click", () => App.handleClick(true));

  App.formElements.firstName.addEventListener('change', () => App.updateInput('firstName', App.formElements.firstName.value));
  App.formElements.lastName.addEventListener('change', () => App.updateInput('lastName', App.formElements.lastName.value));

  if(App.formElements.telNum) {
    App.formElements.telNum.addEventListener('change', () => App.updateInput('telNum', App.formElements.telNum.value));
  }
  if(App.formElements.email) {
    App.formElements.email.addEventListener('change', () => App.updateInput('email', App.formElements.email.value));
  }

  App.form.addEventListener("submit", event  => {
    event.preventDefault();
    App.submitForm();
    return false;
  });
};

App.updateForm = data => {
  document.getElementById("app").innerHTML = App.render();
  App.form = document.getElementById('registrationForm');

  App.formElements = {
    phoneRegistrationButton: document.getElementById("phoneRegistration"),
    emailRegistrationButton: document.getElementById("emailRegistration"),
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    telNum: document.getElementById('telNum'),
    terms: document.getElementById('telNum'),
    promotions: document.getElementById('telNum'),
    currency: document.getElementById('currency')
  };

  App.bindEvents();

  if(data) {
    App.updateInput('firstName', data.get('firstName'));
    App.updateInput('lastName', data.get('lastName'));
    App.updateInput('telNum', data.get('telNum'));
    App.updateInput('email', data.get('email'));
    App.updateInput('terms', data.get('terms'));
    App.updateInput('promotions', data.get('promotions'));
    App.updateInput('currency', data.get('currency'));
  }
};

App.init();