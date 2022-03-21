// const url = "https://scrapbook-api-rafael.herokuapp.com";
const url = "http://localhost:8080";

window.addEventListener("load", () => {
  axios.get(url + "/users").then((response) => {
    console.log(response.data);
  })
})

function login() {
  const usernameLogin = document.getElementById("inputUsernameLogin").value;
  const passwordLogin = document.getElementById("inputPasswordLogin").value;
  const divAlert = document.getElementById("alert");
  let alert;
  let auth = false;

  axios.post(url + "/login", {
    username: usernameLogin,
    password: passwordLogin
  }).then((response) => {
    auth = true;
      axios.get(url + "/users").then((response) => {
      const data = response.data;
        for (let userAccount of data){
          localStorage.setItem("userAuthenticated", auth);
          localStorage.setItem("userId", userAccount.id);
          window.location.href = "./notes.html"
          }
      })     
  }).catch((error) => {
    console.log(error);
    if (!auth) {
      alert = `
      <div class="alert alert-primary alert-dismissible fade show" role="alert">
        Nome de <strong>'Usuário'</strong> ou <strong>'Senha'</strong> inválidos.
        <button
          type="button" 
          class="btn-close" 
          data-bs-dismiss="alert" 
          aria-label="Close">
        </button>
      </div>`;
      divAlert.innerHTML = alert;
    }
  })
}

function accountCreator() {
  window.location.href = "signup.html";
}

function userExists(){
  const usernameRegister = document.getElementById("inputUsernameRegister").value;
  const divAlert = document.getElementById("alert");
  
  axios.get(url + `/users`)
  .then((response) => {
    const data = response.data;
    for (user of data){
      if (user.name === usernameRegister){
        alert = `
          <div class="alert alert-primary alert-dismissible fade show" role="alert">
            <strong>'Usuário'</strong> já está em uso.
            <button 
              type="button" 
              class="btn-close" 
              data-bs-dismiss="alert" 
              aria-label="Close">
            </button>
          </div>`;
        document.getElementById("inputUsernameRegister").focus();
        divAlert.innerHTML = alert;
        break
      }
    }
  })
}

function createAccount() {
  const usernameRegister = document.getElementById("inputUsernameRegister").value;
  const passwordRegister = document.getElementById("inputPasswordRegister").value;
  const passwordConfirm = document.getElementById("inputPasswordConfirm").value;
  const divAlert = document.getElementById("alert");

  let alert;
  
  userExists();

  if (usernameRegister.length === 0 || passwordRegister.length == 0 || passwordConfirm.length == 0) {
    alert = `
    <div class="alert alert-primary alert-dismissible fade show" role="alert" >
      Preencha <strong>Todos</strong> os campos.
      <button 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="alert" 
        aria-label="Close">
      </button>
    </div>`;
    document.getElementById("inputUsernameRegister").focus();
    divAlert.innerHTML = alert;
  } else if (passwordRegister != passwordConfirm) {
    alert = `
    <div class="alert alert-primary alert-dismissible fade show" role="alert">
      As <strong>Senhas</strong> não conferem.
      <button 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="alert" 
        aria-label="Close">
      </button>
    </div>`;
    document.getElementById("inputPasswordRegister").focus();
    divAlert.innerHTML = alert;
  } else {
    alert = `
    <div class="alert alert-primary" role="alert">
      Cadastro realizado com sucesso! <a href="login.html">Retornar para tela de login</a>
    </div>`;
    axios
      .post(url + "/register", {
        username: usernameRegister,
        password: passwordRegister,
        passwordConfirm: passwordConfirm
      })
      .then(response => {
        divAlert.innerHTML = alert;
      })
      .catch(error => {
        console.log(error);
      })
  }
}

function accountLogin() {
  window.location.href = "login.html";
}

function eyeClickLogin() {
  let elToggle = document.querySelector(".js-password-show-toggle"),
    passwordInput = document.getElementById("inputPasswordLogin");

  elToggle.addEventListener("click", (e) => {
    e.preventDefault();

    if (elToggle.classList.contains("active")) {
      passwordInput.setAttribute("type", "password");
      elToggle.classList.remove("active");
    } else {
      passwordInput.setAttribute("type", "text");
      elToggle.classList.add("active");
    }
  });
}

function eyeClickRegister() {
  let elToggle = document.querySelector(".js-password-show-toggle"),
    passwordConfirm = document.getElementById("inputPasswordConfirm"),
    passwordRegister = document.getElementById("inputPasswordRegister");

  elToggle.addEventListener("click", (e) => {
    e.preventDefault();

    if (elToggle.classList.contains("active")) {
      passwordRegister.setAttribute("type", "password");
      passwordConfirm.setAttribute("type", "password");
      elToggle.classList.remove("active");
    } else {
      passwordRegister.setAttribute("type", "text");
      passwordConfirm.setAttribute("type", "text");
      elToggle.classList.add("active");
    }
  });
}
