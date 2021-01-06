const articles = document.querySelectorAll('.article');
articles.forEach((article) => {
    article.addEventListener('click', () => {
        const title = article.childNodes[1].textContent;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/post?title=${title}`, true);
        xhr.onload = function (){
            if(this.status == 200){
                var post = JSON.parse(this.responseText);
                var output = '';
                output +=   `<section class="main-blog">
            <div class="blog-container">
                <div class="form blog-form">
                    <h2>${post.title}</h2>
                    <p>
                        ${post.body}
                    </p>
                    <div class="details">
                        <div class="det">
                            <p>Animashaun Taofiq T.</p>
                        </div>
                        <div class="det">
                            <p>${post.createdAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <main class="main-blog-form">
            <div class="blog-container comment-container">
                <form action="/contact" method="POST">
                    <div class="blog-form">
                        <h2>Post a Comment</h2>
                        <input type="text" name="username" placeholder="Name" required />
                        <input type="email" name="email" placeholder="email" required />
                        <textarea type="text" name="message" placeholder="message" required></textarea>
                        <button type="submit" class="btn">Post Comment</button>
                    </div>
                </form>
            </div>
        </main>
        <section>
            <div class="blog-container comment-container">
                <form action="/contact" method="POST">
                    <div class="blog-form">
                        <div class="re">
                            <div class="re-name">
                                <h4>Daniel Meko</h4>
                                <small>Jan 1, 2021 at 8:34 am</small>
                            </div>
                            <div class="reply">
                                <p>reply</p>
                            </div>
                        </div>
                        <div class="message">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, officia!
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </section>`;
        document.querySelector('.me').innerHTML = output;
            }
        }
    xhr.send();
    });
});