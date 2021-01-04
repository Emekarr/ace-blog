const articles = document.querySelectorAll(".article");


articles.forEach((article) => {
  article.addEventListener("click", () => {
    const title = article.childNodes[1].textContent;
    window.location.href = `/post?title=${title.trim()}`
  });
});
