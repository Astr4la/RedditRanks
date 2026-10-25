const fat = document.getElementById("username");
const result = document.getElementById("result");
const search = document.getElementById("search");
fat.disabled = true
search.disabled = true;
let data = {};
let totalUsers = 0;

fetch("ranked_2026.json").then(response => response.json()).then(dat => {
    data = dat;
    totalUsers = Object.keys(dat).length;
    fat.disabled = false;
    search.disabled = false;
    result.textContent = "Load success";
  })
.catch(() => result.textContent = "Data load failed wtf!!!");

function find() {
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

search.onclick = find;
fat.addEventListener("keydown", e => {
    if (e.key === "Enter"){
        find(); 
    }
});
