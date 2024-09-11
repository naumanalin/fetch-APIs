// https://newsapi.org/

const API_KEY ="";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("health"));

// reload onClick logo
function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data)
    bindData(data.articles); // callback > forEach loop to show cards mutliples time
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);  // callback to display data in cards
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // we get date in TZ-(time zone) format like "2024-09-10T16:55:32Z"
    // we have to convert this TZ fromat to human readable format

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // opening artical in new tab, (without showing url at left-bottom)

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}


// handle nav serach and active class on selected nav item
// 2nd-method for active class: forEach loop ki madat sa all items sa active class remove ki by using class selector
// aur id selector ki help is current item per add("active") laga di simple.

let currentSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = navItem;
    navItem.classList.add("active");
}



const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);

    // aur jab form sa search hu ga tu current selected item b null hu ga
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = null;
});
