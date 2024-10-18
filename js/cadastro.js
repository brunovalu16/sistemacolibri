document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let role = document.getElementById("role").value
  let username = document.getElementById("username").value.trim();
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return firebase.firestore().collection("user").doc(user.uid).set({
        email: email,
        username: username,
        role: role,
        file: "" 
    })
    .then(()=>{
        alert("Usuário cadastrado com sucesso!");
    })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);
  })
  
  });
  