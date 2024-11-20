const postButton = document.getElementById("post");
const feedContainer = document.querySelector(".post-display");
const photoButton = document.getElementById("photo");
const popup = document.querySelector(".img-popup");
const popupPostButton = document.getElementById("post-popup");
const closeButton = document.getElementById("close-post");
const postImageInput = document.getElementById("feedimage");
const postContentInput = document.getElementById("post-content");
const imagePreviewContainer = document.querySelector(
  ".image-preview-container"
);

const viewprofile= document.getElementById("profile-pic")

viewprofile.addEventListener("click",()=>{
    console.log("btn clicked")
    const drop = document.querySelector(".dropdown");
    if(drop.style.display==="block"){
        drop.style.display="none"
    }
    else{
        drop.style.display="block"
    }
    
})

photoButton.addEventListener("click", () => {
  popup.style.display = "block";
});

closeButton.addEventListener("click", () => {
  popup.style.display = "none";
  clearPopupInputs();
});

postImageInput.addEventListener("change", (event) => {
  const files = event.target.files;
  imagePreviewContainer.innerHTML = "";
  if (files && files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImage = document.createElement("img");
      previewImage.src = e.target.result;
      previewImage.alt = "Image Preview";
      previewImage.className = "preview-image";
      imagePreviewContainer.appendChild(previewImage);
    };
    reader.readAsDataURL(files[0]);
  }
});

popupPostButton.addEventListener("click", () => {
  const postContent = document.getElementById("post-content1").value.trim();
  const postImage = postImageInput.files[0];
  if (!postContent && !postImage) {
    alert("Please provide content or an image.");
    return;
  }
  savePost(postContent, postImage);
  popup.style.display = "none";
  clearPopupInputs();
});

postButton.addEventListener("click", () => {
  const postContent = postContentInput.value.trim();
  if (!postContent) {
    alert("Please provide content.");
    return;
  }
  savePost(postContent, null);
  postContentInput.value = "";
});

function savePost(content, imageFile) {
  const userPosts = JSON.parse(localStorage.getItem("posts")) || [];
  const newPost = {
    user_content: content,
    user_image: null,
    likes: 0,
    comments: [],
  };
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newPost.user_image = e.target.result;
      userPosts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(userPosts));
      loadPosts();
    };
    reader.readAsDataURL(imageFile);
  } else {
    userPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(userPosts));
    loadPosts();
  }
}

function clearPopupInputs() {
  document.getElementById("post-content1").value = "";
  postImageInput.value = "";
  imagePreviewContainer.innerHTML = "";
}

function loadPosts() {
  feedContainer.innerHTML = "";
  const userPosts = JSON.parse(localStorage.getItem("posts")) || [];
  userPosts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post-card";
    postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-user-info">
                    <h3><img src="images/07-DLMl_mTI.jpg" class="post-profile"> Sam Lanson</h3>
                    <p>Lead Developer</p>
                </div>
            </div>
            <div class="post-feed">
                ${
                  post.user_image
                    ? `<img src="${post.user_image}" class="posted-image" alt="Post Image">`
                    : ""
                }
                ${
                  post.user_content
                    ? `<p class="post-text">${post.user_content}</p>`
                    : ""
                }
            </div>
            <div class="post-interactions">
                <span class="like-info" data-index="${index}">👍 Like (${
      post.likes
    })</span>
                <span class="comment-info" data-index="${index}">💬 Comments (${
      post.comments.length
    })</span>
            </div>
            <div class="comment-section">
                <input type="text" placeholder="Add a comment..." class="comment-input">
                <button class="comment-btn" data-index="${index}">➤</button>
                <div class="existing-comments">
                    ${post.comments
                      .map((comment) => `<div class="comment">${comment}</div>`)
                      .join("")}
                </div>
            </div>
        `;
    feedContainer.appendChild(postDiv);
  });

  document.querySelectorAll(".like-info").forEach((likeBtn) => {
    likeBtn.addEventListener("click", () => {
      const index = likeBtn.getAttribute("data-index");
      toggleLike(index);
    });
  });

  document.querySelectorAll(".comment-btn").forEach((commentBtn) => {
    commentBtn.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      const commentInput = event.target.previousElementSibling.value.trim();
      if (commentInput) {
        addComment(index, commentInput);
        event.target.previousElementSibling.value = "";
      }
    });
  });
}

function toggleLike(index) {
  const userPosts = JSON.parse(localStorage.getItem("posts"));
  const post = userPosts[index];
  post.user_liked = !post.user_liked;
  post.likes += post.user_liked ? 1 : -1;
  localStorage.setItem("posts", JSON.stringify(userPosts));
  loadPosts();
}

function addComment(index, comment) {
  const userPosts = JSON.parse(localStorage.getItem("posts"));
  userPosts[index].comments.push(comment);
  localStorage.setItem("posts", JSON.stringify(userPosts));
  loadPosts();
}

window.addEventListener("load", loadPosts);
