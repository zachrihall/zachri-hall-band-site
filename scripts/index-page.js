// let commentsArray = [
//     {
//         'name': 'Connor Walton',
//         'date': '02/17/2021',
//         'comment': 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.'
//     },


//     {
//         'name': 'Emilie Beach',
//         'date': '01/09/2021',
//         'comment': 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.'
//     },
//     {
//         'name': 'Miles Acosta',
//         'date': '12/20/2020',
//         'comment': "I cant stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Cant get enough."
//     }

// ];


//first have to convert normal date to millisecond date
function convertDateToMils(date) {
    let d = new Date(date);
    return d.getTime();
}

// 1. create the variables using the DOM API
// const userName = document.querySelector(".reviews__write-comment-name-input");
// console.log(userName.innerHTML);

//get the form
const form = document.querySelector(".reviews__write-comment-container-form");
let commentsContainer = document.querySelector(".reviews__comments");

//empty div for clearing the page
let emptyDiv = document.createElement("div");
emptyDiv.classList.add("reviews__comments");


function createComment(commentObject) {
    //largest comment div
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("reviews__comments-container");

    //div for the picture which is seperate from the conten
    const commentPicDiv = document.createElement("div");
    commentPicDiv.classList.add("reviews__comments-container-user-picture-container");

    //photo div which does not have a photo just blank for the default photo
    const commentPic = document.createElement("div");

    commentPic.classList.add("reviews__comments-container-user-picture-container");
    // appending to the pic div
    commentPicDiv.appendChild(commentPic);
    commentDiv.appendChild(commentPicDiv);







    //div for the actual text content of the comment
    // const commentContent = document.createElement("div");
    // commentContent.classList.add("reviews__comments-container-info-container-div");

    //creating comments-info div
    const commentInfoContainer = document.createElement("div");
    commentInfoContainer.classList.add("reviews__comments-container-info-container");



    //div for the name and date of the comment - working
    const commentNameDateDiv = document.createElement("div");
    commentNameDateDiv.classList.add("reviews__comments-container-info-container-div");

    //append the date div to the content div
    commentInfoContainer.appendChild(commentNameDateDiv);










    //p for the name of the comment
    const commentName = document.createElement("p");
    commentName.classList.add("reviews__comments-container-info-container-div-text");
    commentName.classList.add("reviews__comments-container-info-container-div-text--user-name");
    // add the text grabbed from form !!!!
    commentName.innerText = commentObject.name;
    //appending to parent div
    commentNameDateDiv.appendChild(commentName);


    //p for the date of the comments
    const commentDate = document.createElement("p");
    commentDate.classList.add("reviews__comments-container-info-container-div-text");
    commentDate.classList.add("reviews__comments-container-info-container-div-text--when");
    // data from from library for date below !!!!

    // Takes the date data from the server and converts it from timestamp to local date
    timestampLocal = new Date(commentObject.timestamp);

    // console.log(typeof(timestampLocal));

    function logDate(timestamp) {
        if ((String(timestamp.toLocaleDateString()).slice(0, 2) !== "12") && (String(timestamp.toLocaleDateString()).slice(0, 2) !== "11") && (String(timestamp.toLocaleDateString()).slice(0, 2) !== "10")) {
            return "0" + String(timestamp.toLocaleDateString());
        } else {
            return String(timestamp.toLocaleDateString());
        }
    }

    commentDate.innerText = logDate(timestampLocal);

    //appending to parent div
    commentNameDateDiv.appendChild(commentDate);

    //create p tag for actual text 
    const commentText = document.createElement("p");
    commentText.classList.add("reviews__comments-info-container-comment");

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


let commentsArray = new Array;

// //get comments request
let req = axios.get("https://project-1-api.herokuapp.com/comments?api_key=dd0da2d8-71b0-47b2-b665-f84a68f5fa55");
req.then((e) => {

    commentsArray = e.data;

    commentsArray.sort((a, b) => {
        return b.timestamp - a.timestamp;
    })

    //populate default comments
    for (let i = 0; i < commentsArray.length; i++) {
        createComment(commentsArray[i]);
    }
})

let firstBreak = document.createElement("hr");
commentsContainer.appendChild(firstBreak);



//event handler is async
form.addEventListener("submit", (eListen) => {
    eListen.preventDefault();

    if (eListen.target.textarea.value === "") {
        eListen.target.textarea.classList.add("reviews__write-comment-container-form-div-label-input--textarea--error");
    } else {

        commentsContainer.innerHTML = "<div></div>";
        eListen.target.textarea.classList.remove("reviews__write-comment-container-form-div-label-input--textarea--error");

        let formName = new String;
        let formBody = new String;

        formName = eListen.target.name.value;
        formBody = eListen.target.textarea.value;

        eListen.target.textarea.value = "";
        eListen.target.name.value = "";

        let commentObject = {
            'name': formName,
            'comment': formBody
        }

        let post = axios.post("https://project-1-api.herokuapp.com/comments?api_key=dd0da2d8-71b0-47b2-b665-f84a68f5fa55", commentObject);
        post.then(() => {
            let req = axios.get("https://project-1-api.herokuapp.com/comments?api_key=dd0da2d8-71b0-47b2-b665-f84a68f5fa55");
            req.then((e) => {

                // clear div
                commentsContainer.innerHTML = "<div></div>";
                commentsContainer.appendChild(firstBreak);

                commentsArray = e.data;
                //sort comments 
                commentsArray.sort((a, b) => {
                    return b.timestamp - a.timestamp;
                })

                for (let i = 0; i < commentsArray.length; i++) {
                    createComment(commentsArray[i]);
                }

            })
        });
    }

})



