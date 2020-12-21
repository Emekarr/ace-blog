const articles = document.querySelectorAll(".article");

articles.forEach((article) => {
  article.addEventListener("click", () => {
    const title = article.childNodes[1].textContent;
    fetch(`/post?title=${title}`);
  });
});
