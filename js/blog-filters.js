let showAllPosts = true;
let filterByIntersection = true;

const filterList = [];

function handleChange(button) {
    let newValue = button.value === "and";
    if (newValue !== filterByIntersection) {
        filterByIntersection = newValue
        if (!showAllPosts) {
            filterPosts();
        }
    }
}

function showPost(post) {
    post.classList.toggle("hide", false);
}

function hidePost(post) {
    post.classList.toggle("hide", true);
}

function containsATag(tagList) {
    if (!tagList) {
        return false;
    }

    const currTags = tagList.tags.split(",");
    for (let i = 0; i < filterList.length; i++) {
        if (currTags.includes(filterList[i])) {
            return true;
        }
    }
    return false;
}

function containsEveryTag(tagList) {
    if (!tagList) {
        return false;
    }

    const currTags = tagList.tags.split(",");

    for (let i = 0; i < filterList.length; i++) {
        if (!currTags.includes(filterList[i])) {
            return false;
        }
    }
    return true;
}

function toggleFilter(rawFilter) {
    const filter = rawFilter.replace(" ", "-");
    const wrapper = document.querySelector(`#tags-list #${filter}`);
    wrapper.classList.toggle("selected");

    if (filterList.includes(filter)) {
        filterList.splice(filterList.indexOf(filter), 1);
        if (filterList.length === 0) {
            showAllPosts = true;
        }
    } else {
        filterList.push(filter);
        showAllPosts = false;
    }

    filterPosts();
}

function filterPosts() {
    const allPosts = document.querySelectorAll(".link-to-post-container");
    const filterFunction = filterByIntersection? containsEveryTag : containsATag;
    const delimiter = filterByIntersection? " and " : " or ";
    let message = "";

    if (!showAllPosts) {
        message = filterList.map(word => (
            `<span class="search-tag">${word.replace("-", " ")}</span>`
        )).join(`<span class="search-tag-delimiter"> ${delimiter} </span>`);
    }

    document.querySelector("#filter-message").innerHTML = message ? `Searching for > ${message}` : "";

    let currentPost;
    let nonEmpty = false;
    for (let i = 0; i < allPosts.length; i++) {
        currentPost = allPosts[i];

        if (showAllPosts || filterFunction(currentPost.dataset)) {
            showPost(currentPost);
            nonEmpty = true;
        } else {
            hidePost(currentPost);
        }
    }

    const noPostsMessage = document.querySelector("#no-posts-message");

    if (nonEmpty) {
        noPostsMessage.style.display = "none";
    } else {
        noPostsMessage.style.display = "flex";
    }
}
