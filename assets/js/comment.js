const commentDate = document.getElementsByClassName("commentOn") 
const commentTime = document.getElementsByClassName("commentAt")
for (i = 0; i < commentDate.length; i++) {
    commentTime[i].innerHTML = commentTime[i].innerHTML.toString().substring(16, 21)
    commentDate[i].innerHTML = new Date (commentDate[i].innerHTML).toDateString().split(' ').slice(1).join(' ')
}
