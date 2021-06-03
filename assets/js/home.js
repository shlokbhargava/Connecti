const date = document.getElementsByClassName("createdAt") 
for (i = 0; i < date.length; i++) {
    date[i].innerHTML = new Date (date[i].innerHTML).toDateString().split(' ').slice(1).join(' ')
}