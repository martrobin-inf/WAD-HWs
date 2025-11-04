let infobox = document.querySelector(".userBox");
let avatarimg = document.querySelector(".avatarImg");
avatarimg.addEventListener('click', (e) =>  {
     e.stopPropagation();
    infobox.style.display = infobox.style.display === 'block' ? 'none' : 'block';
});

// Hide the box when clicking outside
window.addEventListener('click', (e) => {
    if (!avatarimg.contains(e.target) && !infobox.contains(e.target)) {
        infobox.style.display = 'none';
    }
});


