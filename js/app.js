 // 🌙 Modo noche
 document
 .getElementById("toggleDarkMode")
 .addEventListener("click", () => {
   document.body.classList.toggle("dark-mode");
 });

// 🍔 Menú hamburguesa
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
hamburger.addEventListener("click", () => {
 sidebar.classList.toggle("visible");
});

