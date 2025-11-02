const LOCAL_JSON = './assets/data/posts.json'
const ENDPOINT_JSON = 'https://api.jsonbin.io/v3/b/69079673ae596e708f3ffd57?meta=false'

fetch(ENDPOINT_JSON)
    .then(response => response.json())
    .then(posts => {
        const feed = document.querySelector('.feed');
        feed.innerHTML = '';

        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post';

            const postInfo = document.createElement('div');
            postInfo.className = 'postInfo';

            const avatar = document.createElement('img');
            avatar.src = post.avatar;
            avatar.alt = `${post.author}'s avatar`;
            avatar.id = 'postAvatar';

            const time = document.createElement('time');
            time.className = 'time';
            time.dateTime = post.date;

            const dateObj = new Date(post.date);
            time.textContent = dateObj.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });

            postInfo.appendChild(avatar);
            postInfo.appendChild(time);
            article.appendChild(postInfo);

            if (post.image) {
                const figure = document.createElement('figure');
                figure.className = 'postMedia';

                const img = document.createElement('img');
                img.src = post.image;
                img.alt = `Post image by ${post.author}`;

                figure.appendChild(img);
                article.appendChild(figure);
            }

            const text = document.createElement('p');
            text.className = 'postText';
            text.textContent = post.text;

            article.appendChild(text);

            const likeButton = document.createElement('button');
            likeButton.className = 'buttonLike';
            likeButton.type = 'button';
            likeButton.textContent = `👍 ${post.likes}`;
            likeButton.addEventListener('click', () => {
                post.likes++;
                likeButton.textContent = `👍 ${post.likes}`;
            });

            article.appendChild(likeButton);

            feed.appendChild(article);
        });
    })
    .catch(err => console.error('Error loading JSON: ', err));