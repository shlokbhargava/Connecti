function showForm() {
    const arr = document.getElementsByClassName("input")

    for(i = 0; i<arr.length; i++) {
        arr[i].disabled = false
    }

    document.getElementById("edit-button").hidden = true
    document.getElementById("update-button").hidden = false
    document.getElementById("confirm-password").hidden = false
}