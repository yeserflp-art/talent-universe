const talentData = [
  {
    id: 1,
    title: "Digital Artist",
    author: "Yeser",
    category: "art",
    image: "https://via.placeholder.com/300x200",
    likes: 120,
    views: 560
  },
  {
    id: 2,
    title: "Web Developer",
    author: "Pi Builder",
    category: "tech",
    image: "https://via.placeholder.com/300x200",
    likes: 98,
    views: 430
  }
];

const talentsContainer = document.getElementById("talents");

function renderTalents() {
  talentsContainer.innerHTML = "";

  talentData.forEach(talent => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${talent.image}" alt="${talent.title}">
      <h3>${talent.title}</h3>
      <p>By ${talent.author}</p>
      <small>❤️ ${talent.likes} | 👁️ ${talent.views}</small>
    `;

    talentsContainer.appendChild(card);
  });
}

renderTalents();
