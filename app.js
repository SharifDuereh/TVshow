const formEle = document.querySelector("#searchForm");

formEle.addEventListener("submit", function (e) {
  e.preventDefault();
  const search = formEle.elements.query.value;
  getAnimeDetails(search);
});

const getAnimeDetails = async (search) => {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20`
    );
    renderImg(res.data.data);
  } catch (err) {
    console.log("Error fetching anime data:", err);
  }
};

const renderImg = (animeList) => {
  const container = document.getElementById("resultsContainer");
  container.innerHTML = "";

  animeList.forEach((item) => {
    if (item.images?.jpg?.image_url) {
      const card = document.createElement("div");
      card.classList.add("content-card");

      const img = document.createElement("img");
      img.src = item.images.jpg.image_url;
      img.alt = item.title;

      const title = document.createElement("div");
      title.classList.add("anime-title");
      title.textContent = truncateTitle(item.title);
      title.title = item.title;

      card.appendChild(img);
      card.appendChild(title);
      container.appendChild(card);
    }
  });
};

const truncateTitle = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return cut.slice(0, lastSpace > 0 ? lastSpace : maxLength) + "…";
};
