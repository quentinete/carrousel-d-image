let images = [];
let index = 0;

function prev() {
  index = (index - 1 + images.length) % images.length;
  console.log(index)
  afficher();
}

function next() {
  index = (index + 1) % images.length;
  console.log(index)
  afficher();
}

function afficher() {
  const centre = document.getElementById("centre");

  const prevIndex = (index - 1 + images.length) % images.length;
  const nextIndex = (index + 1) % images.length;

  centre.innerHTML = `
    <img src="${images[prevIndex]}" class="carrousel-image secondary" onclick="Openall('${images[prevIndex]}')">
    <img src="${images[index]}" class="carrousel-image" onclick="Openall('${images[index]}')">
    <img src="${images[nextIndex]}" class="carrousel-image secondary" onclick="Openall('${images[nextIndex]}')">
  `;
}

fetch('/images')
  .then(res => res.json())
  .then(data => {
    images = data;
    afficher();
  });

function Openall(src) {
  const all = document.createElement("div");
  all.classList.add("all");

  all.innerHTML = `
    <div class="all-contenu">
      <span class="fermer">&times;</span>
      <img src="${src}" alt="Image plein écran">
    </div>
  `;

  document.body.appendChild(all);

  document.querySelector(".fermer").onclick = () => all.remove();
  all.onclick = (e) => {
    if (e.target === all) all.remove();
  };
}
  


