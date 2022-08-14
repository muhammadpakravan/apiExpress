document.getElementById("newsBTN").addEventListener('click', () => {

    let form = document.getElementById('newsForm')
    let table = document.getElementById('newsTable')
    if (table.style.display === 'block') {
        table.style.display = 'none'
        form.style.display = 'block'

    } else {
        form.style.display = 'block'
    }
})

document.getElementById('showBTN').addEventListener('click', () => {
    let form = document.getElementById('newsForm')
    let table = document.getElementById('newsTable')
    if (form.style.display === 'block') {
        form.style.display = 'none'
        table.style.display = 'block'

    } else {
        table.style.display = 'block'
    }
})


