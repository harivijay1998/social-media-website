const postButton = document.getElementById("post");
const feedContainer = document.querySelector(".post-display");
const photopost = document.getElementById("photo");
const popup = document.querySelector(".img-popup");
const popup_post = document.getElementById("post-popup");
let postImage = document.getElementById("feedimage");
let postContent = document.getElementById("post-content");
let postDiv;
photopost.addEventListener("click", () => {
  popup.style.display = "block";
});

const closebtn = document.getElementById("close-post");

closebtn.addEventListener("click", () => {
  popup.style.display = "none";
});

let userPosts = [];
let userPosts1 = [];

let imagePreviewContainer = document.createElement("div");
imagePreviewContainer.className = "image-preview-container";
document.querySelector(".img-popup").appendChild(imagePreviewContainer);

postImage.addEventListener("change", (event) => {
  const files = event.target.files;
  imagePreviewContainer.innerHTML = "";
  if (files && files[0]) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImage = document.createElement("img");
      previewImage.src = e.target.result;
      previewImage.alt = "Image Preview";
      previewImage.className = "preview-image";
      imagePreviewContainer.appendChild(previewImage);
    };
    reader.readAsDataURL(file);
  }
});

popup_post.addEventListener("click", () => {
  popup.style.display = "none";
   postImage = document.getElementById("feedimage"); // Ensure fresh reference
     postContent1 = document.getElementById("post-content1").value.trim();

  if (!postContent1 && postImage.files.length === 0) {
    alert("Please provide content or an image.");
    return;
  }

  const reader = new FileReader();
  const newPostPopup = {
    user_content: postContent1,
    user_image: null,
  };

  if (postImage.files.length > 0) {
    const imageFile = postImage.files[0];
    reader.onload = (e) => {
      newPostPopup.user_image = e.target.result;
      savePost(newPostPopup);
    };
    reader.readAsDataURL(imageFile);
  } else {
    savePost(newPostPopup);
  }

  function savePost(post) {
    let userPosts1 = JSON.parse(localStorage.getItem("poppost")) || [];
    userPosts1.push(post);
    localStorage.setItem("poppost", JSON.stringify(userPosts1));
    loadPost1();
    postImage.value = "";
    document.getElementById("post-content").value = "";
  }
});

function loadPost1() {
  if (!feedContainer) {
    console.error("Feed container ('.post-display') not found.");
    return;
  }

  userPosts = JSON.parse(localStorage.getItem("postitems"));
  userPosts1 = JSON.parse(localStorage.getItem("poppost"));

  if (!Array.isArray(userPosts)) {
    userPosts = [];
  }
  userPosts1.forEach((posts) => {
    postDiv = document.createElement("div");
    postDiv.innerHTML = `<div class="post-card">
            <div class="post-header">
                <div class="post-user-info">
                    <div class="user-name">
                        <h3><span><img src="images/07-DLMl_mTI.jpg" class="post-profile"></span>Sam Lanson <span>.<p id="post-time"></p></span></h3>
                        <p>Lead Developer</p>
                    </div>
                </div>
                <button class="more-options">⋮</button>
            </div>
            <div class="post-feed">
                <div class="postimg"></div>
                <div class="post-text"></div>
            </div>
            <div class="post-interactions">
                <div class="interactions-info">
                    <span class="like-info">👍 Liked</span>
                    <span class="comment-info">💬 Comments </span>
                    <span class="share-info">↗️ Share </span>
                </div>
            </div>
            <div class="comment-section">
                <img src="https://via.placeholder.com/30" alt="Commenter Profile" class="commenter-pic">
                <input type="text" placeholder="Add a comment..." class="comment-input">
                <button class="comment-btn">➤</button>
            </div>
            <div class="comment-section">
                <div class="existing-comment"></div>
            </div>
        </div>`;

    if (posts.user_image) {
      const imgElement = document.createElement("img");
      imgElement.src = posts.user_image;
      imgElement.alt = "User posted image";
      imgElement.className = "posted-image";
      postDiv.querySelector(".postimg").appendChild(imgElement);
    }

    if (posts.user_content) {
      const textElement = document.createElement("p");
      textElement.className = "post-text";
      textElement.innerText = posts.user_content;
      postDiv.querySelector(".post-text").appendChild(textElement);
    }

    feedContainer.appendChild(postDiv);

    
    const commentBtn = postDiv.querySelector(".comment-btn");
    commentBtn.addEventListener("click", () => {
      const commentInput = postDiv.querySelector(".comment-input");
      const commentText = commentInput.value.trim();
      if (commentText !== "") {
        const newComment = document.createElement("div");
        newComment.className = "comment";
        newComment.innerText = commentText;
        const commentSection = postDiv.querySelector(".existing-comment");
        commentSection.appendChild(newComment);
        commentInput.value = "";
      }
    });
  });
}
window.addEventListener("load1", loadPost1);

function loadPosts() {
  if (!feedContainer) {
    console.error("Feed container ('.post-display') not found.");
    return;
  }

  userPosts = JSON.parse(localStorage.getItem("postitems"));
  userPosts1 = JSON.parse(localStorage.getItem("poppost"));

  if (!Array.isArray(userPosts)) {
    userPosts = [];
  }

  userPosts.forEach((post) => {
    postDiv = document.createElement("div");
    postDiv.innerHTML = `<div class="post-card">
            <div class="post-header">
                <div class="post-user-info">
                    <div class="user-name">
                        <h3><span><img src="images/07-DLMl_mTI.jpg" class="post-profile"></span>Sam Lanson <span>.<p id="post-time"></p></span></h3>
                        <p>Lead Developer</p>
                    </div>
                </div>
                <button class="more-options">⋮</button>
            </div>
            <div class="post-feed">
                <div class="post-text"></div>
            </div>
            <div class="post-interactions">
                <div class="interactions-info">
                    <span class="like-info">👍 Liked</span>
                    <span class="comment-info">💬 Comments</span>
                    <span class="share-info">↗️ Share </span>
                </div>
            </div>
            <div class="comment-section">
                <img src="https://via.placeholder.com/30" alt="Commenter Profile" class="commenter-pic">
                <input type="text" placeholder="Add a comment..." class="comment-input">
                <button class="comment-btn">➤</button>
            </div>
            <div class="comment-section">
                <div class="existing-comment"></div>
            </div>
        </div>`;

    if (post.user_content) {
      const textElement = document.createElement("p");
      textElement.className = "post-text";
      textElement.innerText = post.user_content;
      postDiv.querySelector(".post-text").appendChild(textElement);
    }

    feedContainer.appendChild(postDiv);


    const commentBtn = postDiv.querySelector(".comment-btn");
    commentBtn.addEventListener("click", () => {
      const commentInput = postDiv.querySelector(".comment-input");
      const commentText = commentInput.value.trim();
      if (commentText !== "") {
        const newComment = document.createElement("div");
        newComment.className = "comment";
        newComment.innerText = commentText;
        const commentSection = postDiv.querySelector(".existing-comment");
        commentSection.appendChild(newComment);
        commentInput.value = ""; 
      }
    });
  });
}

postButton.addEventListener("click", () => {
  postImage = document.getElementById("feedimage").value;
  postContent = document.getElementById("post-content").value.trim();

  if (!postImage && !postContent) {
    alert("Please provide content or an image to post.");
    return;
  }

  userPosts = JSON.parse(localStorage.getItem("postitems"));

  if (!Array.isArray(userPosts)) {
    userPosts = [];
  }

  const newPost = {
    user_image: postImage,
    user_content: postContent,
  };

  userPosts.push(newPost);

  localStorage.setItem("postitems", JSON.stringify(userPosts));

  loadPosts();

  document.getElementById("feedimage").value = "";
  document.getElementById("post-content").value = "";
});

window.addEventListener("load", loadPosts);

