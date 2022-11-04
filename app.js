const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".contain");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
const firebaseConfig = {
  apiKey: "AIzaSyB4BHee8OIdNPIrvH2DMb63BSWvA7nKfXg",
  authDomain: "sahayata-d8adb.firebaseapp.com",
  projectId: "sahayata-d8adb",
  storageBucket: "sahayata-d8adb.appspot.com",
  messagingSenderId: "206016638501",
  appId: "1:206016638501:web:c3f836d89e34d6f21919cc"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
async function getMoreDetails(){
  const email = document.getElementById("sumail").value
    const password = document.getElementById("supassword").value
    const promise = await auth.createUserWithEmailAndPassword(email, password)
    auth.currentUser.getIdToken(true).then((idToken)=>{
        console.log(idToken)
    })

}

const signIn = async()=>{
  const email = document.getElementById("simail").value
  const password = document.getElementById("sipassword").value
  const promise = await firebase.auth().signInWithEmailAndPassword(email, password)
  auth.currentUser.getIdToken(true).then((idToken)=>{
      console.log(idToken)
    })
}