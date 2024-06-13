const API_URL = "http://localhost:3000/news?q="; 

const fetchNews = async (query) => {
  const res = await fetch(`${API_URL}${query}`);
  const data = await res.json(); 
  bindData(data.articles); 
}

const bindData = (articles) => {
    const cardContainer = document.getElementById("card-container"); 
    const cardTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = ''; 
     
    articles.forEach(article => {
      if(!article.urlToImage) return;  
      const cardClone = cardTemplate.content.cloneNode(true); 
      fillData(cardClone, article); 
      cardContainer.appendChild(cardClone); 
      console.log("Data is binded!")
    });  
}

const fillData = (card, article) => {
  const cardImg = card.querySelector("#news-img") ; 
  const title = card.querySelector("#news-title"); 
  const source = card.querySelector("#news-src");
  const desc = card.querySelector("#news-desc"); 
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone : "Asia/Jakarta"
  });

  cardImg.src = article.urlToImage; 
  title.innerHTML = article.title; 
  source.innerHTML = `${article.source.name} - ${date}`; 
  desc.innerHTML = article.description; 

  card.firstElementChild.addEventListener('click' , () => {
    window.open(article.url, "_blank"); 
  })
}

window.addEventListener('load', () => fetchNews("India"));

document.addEventListener("DOMContentLoaded" , () => {
  const searchBtn = document.getElementById("SearchBtn"); 

  searchBtn.addEventListener('click' , () => {
    console.log("btn pressed!")
    const textBox = document.getElementById("search-text"); 
    const query = textBox.value; 
    if(!query) return ; 
    fetchNews(query); 
    curSelectedNav.classList.remove("active"); 
    curSelectedNav = null; 
  })
})

let curSelectedNav = null; 

const onNavItemClick = (id) => {
  fetchNews(id) ; 
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active"); 
  curSelectedNav = navItem; 
  curSelectedNav.classList.add("active"); 
}
