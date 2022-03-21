const url = "https://scrapbook-api-rafael.herokuapp.com";

const userId = localStorage.getItem("userId")

window.addEventListener("load", () => {
  axios.get(url + `/users/${userId}/notes`).then((response) => {
    console.log(response.data);
  })
});

function userIsAuthenticated(){
  const divAlert = document.getElementById("alert");
  let alert;
  const userAuth = localStorage.getItem("userAuthenticated");
  if (!userAuth){
    alert = `
    <div class="alert alert-primary alert-dismissible fade show" role="alert" >
      Usuário desconectado, você será encaminhado para a tela de login.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    divAlert.innerHTML = alert;
    setTimeout(function(){userDisconect();} , 5000);
    return
  }
}

function userDisconect() {
  window.localStorage.clear();
  window.location.href = "login.html";
}

function addNewMessage() {
  const description = document.getElementById("description").value;
  const detail = document.getElementById("detail").value;
  const divAlert = document.getElementById("alert");
  let alert;

  if (description.length === 0 || detail.length === 0) {
    alert = `
    <div class="alert alert-primary alert-dismissible fade show" role="alert" >
      Campos não podem ficar em branco.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    document.getElementById("description").focus();
    divAlert.innerHTML = alert;
  } else {
   axios.post(url + `/users/${userId}/notes`, {
     detail: detail,
     description: description
   }).then((response) => {
     showMessage();
     userIsAuthenticated();
   }).catch((error) => {
     console.log(error);
   })
  }
  showMessage();

  document.getElementById("description").value = "";
  document.getElementById("detail").value = "";
}
    
function showMessage() {
  const table = document.getElementById("tabela");

  let content = `
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Descrição</th>
        <th>Detalhe</th>
        <th>Ação</th>
      </tr>
    </thead>
  `;

  axios.get(url + `/users/${userId}/notes`).then((response) => {
    const data = response.data;
    let messageNumberPosition = 1;
    userIsAuthenticated();
    for (let value of data) {
      content += `
      <tbody:last>
        <tr>
          <td>${messageNumberPosition}</td>
          <td>${value.detail}</td>
          <td>${value.description}</td>
          <td class="form-group row justify-content-around">
          <button
          type="button"
          class="btn-warning col-md-5 px-0 px-sm-0 inputs" onclick='editMessage(${value.id})'>
          Editar
        </button>
            <button type="button" 
              class="btn-danger col-md-5 inputs" onclick='deleteMessage(${value.id})'>
              Deletar
            </button>
          </td>
        </tr>
      </tbody:last>`;
      messageNumberPosition++;
    }
  content += `</table>`;
  table.innerHTML = content;
  })
  .catch(error => {
    console.log(error);
  })
  userIsAuthenticated();
}

function deleteMessage(noteId) {
  axios.delete(url + `/users/${userId}/notes/${noteId}`)
  .then((response) => {
    showMessage();
  }).catch((error) => {
    console.log(error);
  })
  userIsAuthenticated()
}

function editMessage(noteId){
  const detail = prompt('Descrição');
  const description = prompt('Detalhe');

  axios.put(url + `/users/${userId}/notes/${noteId}`, {
    detail: detail,
    description: description
  }).then((response) => {
    showMessage();
  }).catch((error) => {
    console.log(error);
  })
  userIsAuthenticated()
}

userIsAuthenticated()
showMessage();

