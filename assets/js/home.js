const date = document.getElementsByClassName("createdAt") 
const time = document.getElementsByClassName("createdTime")
for (i = 0; i < date.length; i++) {
    time[i].innerHTML = time[i].innerHTML.toString().substring(16, 21)
    date[i].innerHTML = new Date (date[i].innerHTML).toDateString().split(' ').slice(1).join(' ')
}

const commentDetail = document.getElementsByClassName("dt")
for (i = 0; i < commentDetail.length; i++) {
    commentDetail[i].innerHTML = commentDetail[i].innerHTML.toString().substring(16, 24)
    console.log(commentDetail[i].innerHTML)
}
