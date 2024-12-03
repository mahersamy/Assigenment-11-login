var isLogin=true;
var emailElement=document.getElementById("email");
var passwordElement=document.getElementById("password");
var nameElement=document.getElementById("nameElement");
var nameTogale=document.getElementById("name");
var loginBtn=document.getElementById("login-btn");
var account=document.getElementById("account");
var changeAccount=document.getElementById("change-account");


var listOfAccounts=[];


if(localStorage.getItem("accounts")!==null){
    listOfAccounts=JSON.parse(localStorage.getItem("accounts"));
   }

loginBtn.addEventListener("click",function(e){
    e.preventDefault();
   if(isLogin){
    login()
   }else{
    signIn();
   }
    
});


changeAccount.addEventListener("click",function(e){
    togale();

});



function clearInputs(){
    emailElement.value="";
    passwordElement.value="";
    nameTogale.value="";
}

function togale(){
    if(isLogin){
        nameTogale.classList.replace("d-none","d-block");
        loginBtn.innerHTML="Sign Up";
        account.innerHTML='You have an account?'
        changeAccount.innerHTML="Login"

    }else{
        nameTogale.classList.replace("d-block","d-none");
        loginBtn.innerHTML="Login";
        account.innerHTML='Don’t have an account?'
        changeAccount.innerHTML="Sign Up"

    }
    isLogin=!isLogin;
    clearInputs();
}


function signIn(){
    var found=listOfAccounts.find((e) => e.userEmail===emailElement.value);
   
    if(validation()&&found===undefined){
        var userObj={
            userName:nameElement.value,
            userEmail:emailElement.value,
            userPassword:passwordElement.value,
        }
        listOfAccounts.push(userObj);
        localStorage.setItem("accounts",JSON.stringify(listOfAccounts));
        togale()
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "check your validate or use already email",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}

function login(){
    var found=listOfAccounts.find((e) => e.userEmail===emailElement.value);
    if(found!==undefined){
        localStorage.setItem("userName",JSON.stringify(found.userName));
    }
    if(validation()&&found!==undefined&&found.userPassword===passwordElement.value){
        window.location.href=`pages/home.html`;
        

    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "you password or user name are invalid",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
    clearInputs();
}


function logout(){
    window.location.href="../index.html";

}

function validation(){
    var regex = {
        nameElement: /^[\w\s]+$/,
        email: /^[\w/.]+(@)[\w]+\.[\w]+$/,
        password:/^[\w]{6,}$/
    }
    if(regex[nameElement.id].test(nameElement.value)&&regex[email.id].test(emailElement.value)&&regex[passwordElement.id].test(passwordElement.value)&&isLogin===false){
        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Now you have account",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return true;
    }else if(regex[email.id].test(emailElement.value)&&regex[passwordElement.id].test(passwordElement.value)&&isLogin===true){
        // Swal.fire({
        //     icon: "success",
        //     title: "Success...",
        //     text: "Your login is successfuly",
        //     footer: '<a href="#">Why do I have this issue?</a>'
        // });
        return true;
    }
    
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
        return false;

    }

}


