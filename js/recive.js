var nameDiv=document.getElementById("test");
// JSON.parse(localStorage.getItem("userName"))
var userName=JSON.parse(localStorage.getItem("userName"));
nameDiv.innerHTML="Welcome "+userName;