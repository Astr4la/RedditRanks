const fat = document.getElementById("username");
const result = document.getElementById("result");
const button = document.getElementById("search");

let data = {};
let totalUsers = 0;

fat.disabled = true
button.disabled = true;

fetch("ranked_2026.json").then(response => response.json()).then(dat => {
    data = dat;
    totalUsers = Object.keys(dat).length;
    fat.disabled = false;
    button.disabled = false;
    result.textContent = "Load success";
  })
.catch(() => result.textContent = "Data load failed wtf!!!");

function search() {
  let name = fat.value.trim().toLowerCase();
  if (!name) {
    result.textContent = "ERROR! Empty Username";
    return;
  }
  if (name.startsWith("u/")) {
    name = name.substring(2);
  }
  if (name === "rstuffs" || name === "rstuff") {
    result.textContent = "ERROR! User Is A Fat";
    return;
  }
  const userdata = data[name];
  if (!userdata) {
    result.textContent = "ERROR! User Not Found";
    return;
  }

  result.textContent =
    "Rank " + userdata[1].toLocaleString() + "/" + totalUsers.toLocaleString() +
    " " + userdata[0] + " - " + userdata[2].toLocaleString() + " score - " +
    userdata[3].toLocaleString() + " comments";
}

button.onclick = search;
fat.addEventListener("keydown", e => {
    if (e.key === "Enter"){
        search(); 
    }
});
