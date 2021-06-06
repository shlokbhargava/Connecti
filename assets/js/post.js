const date = document.getElementsByClassName("createdAt") 
const time = document.getElementsByClassName("createdTime")
for (i = 0; i < time.length; i++) {
    time[i].innerHTML = time[i].innerHTML.toString().substring(16, 21)
    date[i].innerHTML = new Date (date[i].innerHTML).toDateString().split(' ').slice(1).join(' ')
}
