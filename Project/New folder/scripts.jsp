// Sample blog post data
const blogPosts = [
    { title: "Sample Post 1", content: "This is the content of the first post." },
    { title: "Sample Post 2", content: "This is the content of the second post." },
];

// Function to display blog posts
function displayBlogPosts() {
    const blogPostsContainer = document.getElementById("blog-posts");
    blogPostsContainer.innerHTML = "";

    blogPosts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        blogPostsContainer.appendChild(postElement);
    });
}

// Function to add a new blog post
function addBlogPost(title, content) {
    blogPosts.push({ title, content });
    displayBlogPosts();
}

// Submit form handler
const blogForm = document.getElementById("blog-form");
blogForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const titleInput = document.getElementById("post-title");
    const contentInput = document.getElementById("post-content");
    const title = titleInput.value;
    const content = contentInput.value;
    addBlogPost(title, content);
    titleInput.value = "";
    contentInput.value = "";
});

// Initial display of blog posts
displayBlogPosts();
