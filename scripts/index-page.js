let commentsArray = [
    {
        'name': 'Connor Walton',
        'date': '02/17/2021',
        'comment': 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.'
    },

    {
        'name': 'Emilie Beach',
        'date': '01/09/2021',
        'comment': 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
    },
    {
        'name': 'Miles Acosta',
        'date': '12/20/2020',
        'comment': "I cant stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Cant get enough."
    }

];




// 1. create the variables using the DOM API
const userName = document.querySelector(".reviews__write-comment-name-input");
console.log(userName.innerHTML);

//get the form
const form = document.querySelector(".reviews__write-comment-form");
let commentsContainer = document.querySelector(".reviews__comments");

//empty div for clearing the page
let emptyDiv = document.createElement("div");
emptyDiv.classList.add("reviews__comments");




function createComment(commentObject) {
    //largest comment div
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("reviews__comments-comment");

    //div for the picture which is seperate from the conten
    const commentPicDiv = document.createElement("div");
    commentPicDiv.classList.add("reviews__comments-container-user-picture-container");

    //photo div which does not have a photo just blank for the default photo
    const commentPic = document.createElement("div");

    commentPic.classList.add("reviews__comments-container-user-picture");
    // appending to the pic div
    commentPicDiv.appendChild(commentPic);
    commentDiv.appendChild(commentPicDiv);

    //div for the actual text content of the comment
    const commentContent = document.createElement("div");
    commentContent.classList.add("reviews__comments-info-container");

    //creating comments-info div
    const commentInfoContainer = document.createElement("div");
    commentInfoContainer.classList.add("reviews__comments-info-container");

    //div for the name and date of the comment
    const commentNameDateDiv = document.createElement("div");
    commentNameDateDiv.classList.add("reviews__comments-container");
    //append the date div to the content div
    commentInfoContainer.appendChild(commentNameDateDiv);

    //p for the name of the comment
    const commentName = document.createElement("p");
    commentName.classList.add("reviews__comments-container-user-name");
    // add the text grabbed from form !!!!
    commentName.innerText = commentObject.name;
    //appending to parent div
    commentNameDateDiv.appendChild(commentName);


    //p for the date of the comments
    const commentDate = document.createElement("p");
    commentDate.classList.add("reviews__comments-container-when");
    // data from from library for date below !!!!

    // ----- FILL IN ------
    commentDate.innerText = commentObject.date;

    //appending to parent div
    commentNameDateDiv.appendChild(commentDate);

    //create p tag for actual text 
    const commentText = document.createElement("p");
    commentText.classList.add("reviews__comments-comment");

    //comment text from the form
    commentText.innerText = commentObject.comment;

    //appending to parent div
    commentInfoContainer.appendChild(commentText);
    commentDiv.appendChild(commentInfoContainer);

    //horizontal break
    const horizontalBreak = document.createElement("hr");

    commentsContainer.appendChild(commentDiv);
    commentsContainer.appendChild(horizontalBreak);

    // console.log(commentDiv);

}

let firstBreak = document.createElement("hr");
commentsContainer.appendChild(firstBreak);

//populate default comments
for (let i = 0; i < commentsArray.length; i++) {
    createComment(commentsArray[i]);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.textarea.value === "") {
        e.target.textarea.classList.add("reviews__write-comment-textarea--error");
    } else {
        commentsContainer.innerHTML = "<div></div>";
        e.target.textarea.classList.remove("reviews__write-comment-textarea--error");
        let formName = new String;
        let formBody = new String;

        formName = e.target.name.value;
        formBody = e.target.textarea.value;

        e.target.textarea.value = "";
        e.target.name.value = "";

        console.log("Name: " + e.target.name.value);
        console.log("Comment: " + e.target.textarea.value);

        let newDate = new Date;
        let date = "0" + newDate.toLocaleDateString();

        const commentObject = {
            'name': formName,
            'date': date,
            'comment': formBody
        }
        commentsArray.push(commentObject);

        //populate added comments section
        for (let i = 0; i < commentsArray.length; i++) {
            createComment(commentsArray[i]);
        }
    }

})
