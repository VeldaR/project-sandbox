const postsContainer = document.getElementById('post-c');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// API fetching

async function getPosts() {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );

    const data = await res.json();

    return data;
};

// show the posts

async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="numeral">${post.id}</div>
            <div class="post-info">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-body">${post.body}</p>
        </div>
        `;

        postsContainer.appendChild(postEl);
    });
}

// show loader and fetch more posts

function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 100);
    }, 500);
}

// filter posts by input
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}

// initialize posts

showPosts();

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } =
    document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    }
});

// filter functionality

filter.addEventListener('input', filterPosts);