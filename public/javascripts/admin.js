async function getData() {
    const full = location.protocol + '//' + location.host;
    const response = await fetch(full + '/admin/all-news')
    return await response.json()
}

async function getCategories() {
    const fullHostName = location.protocol + '//' + location.host
    const response = await fetch(fullHostName + '/api/category')
    return await response.json()
}

async function getSources() {
    const fullHostName = location.protocol + '//' + location.host
    const response = await fetch(fullHostName + '/api/source')
    return await response.json()
}

async function getAdmins() {
    const fullHostName = location.protocol + '//' + location.host
    const response = await fetch(fullHostName + '/admin/admins')
    return await response.json()
}

function CategoryDataOptions() {
    getCategories().then(result => {

        let selectMenu = document.getElementById('categorySelect')
        let jsonResult = JSON.stringify(result)
        let parsedObject = JSON.parse(jsonResult)
        parsedObject.forEach(category => {

            let option = document.createElement('option')
            option.value = category.name
            option.innerText = category.name
            selectMenu.appendChild(option)

        })
    })
}

function SourceDataOptions() {
    getSources().then(result => {

        let selectMenu = document.getElementById('sourceSelect')
        let jsonResult = JSON.stringify(result)
        let parsedObject = JSON.parse(jsonResult)
        parsedObject.forEach(category => {

            let option = document.createElement('option')
            option.value = category.name
            option.innerText = category.name
            selectMenu.appendChild(option)

        })
    })
}

function categoryList() {
    getCategories().then(result => {
        let categoryList = document.getElementById('categoryTable')
        let jsonResult = JSON.stringify(result)
        let parsedObject = JSON.parse(jsonResult)
        parsedObject.forEach(category => {
            let tableRow = document.createElement('tr')
            let nameTD = document.createElement('td')
            let editTD = document.createElement('td')
            let deleteTD = document.createElement('td')
            nameTD.innerText = category.name
            editTD.innerHTML = `<a href="/admin/edite/category/${category._id}"><i class="fa fa-edit"></i></a>`
            deleteTD.innerHTML = ` <a href="/admin/delete/category/${category._id}" class="text-muted"><i class="fa fa-remove"></i></a>`

            tableRow.appendChild(nameTD)
            tableRow.appendChild(editTD)
            tableRow.appendChild(deleteTD)
            categoryList.appendChild(tableRow)
        })


    })
}

function adminMain() {
    getData().then(result => {

        let table = document.getElementById('tbodyNews')
        let jsonResult = JSON.stringify(result)
        let parsedObject = JSON.parse(jsonResult)

        parsedObject.forEach(news => {

            let tableRow = document.createElement('tr')
            let titleTD = document.createElement('td')
            let categoryTD = document.createElement('td')
            let viewTD = document.createElement('td')
            let editTD = document.createElement('td')
            let deleteTD = document.createElement('td')


            editTD.innerHTML = `<a href="/admin/edite/news/${news._id}" class="text-muted"><i class="fa fa-edit"></i></a>`
            deleteTD.innerHTML = `<a href="/admin/delete/news/${news._id}" class="text-muted"><i class="fa fa-remove"></i></a>`
            titleTD.innerHTML = `<img src="${news.image}" alt="${news.title}" class="img-circle img-size-32 mr-2">  ${news.title}`

            categoryTD.innerText = news.category_name
            viewTD.innerText = news.view

            tableRow.appendChild(titleTD)
            tableRow.appendChild(categoryTD)
            tableRow.appendChild(viewTD)
            tableRow.appendChild(editTD)
            tableRow.appendChild(deleteTD)
            table.appendChild(tableRow)
        })
    })
}

function SourceList() {
    getSources().then(result => {

        let table = document.getElementById('tbodySource')
        let jsonResult = JSON.stringify(result)
        let parsedObject = JSON.parse(jsonResult)
        parsedObject.forEach(source => {
            let tableRow = document.createElement('tr')
            let titleTD = document.createElement('td')
            let urlTD = document.createElement('td')

            let editTD = document.createElement('td')
            let deleteTD = document.createElement('td')

            let x = 'https://google.com';


            editTD.innerHTML = `<a href="/admin/edite/source/${source._id}"><i class="fa fa-edit"></i></a>`
            deleteTD.innerHTML = `<a href="/admin/delete/source/${source._id}" class="text-muted"><i class="fa fa-remove"></i></a>`
            titleTD.innerHTML = source.name
            urlTD.innerText = source.url


            tableRow.appendChild(titleTD)
            tableRow.appendChild(urlTD)

            tableRow.appendChild(editTD)
            tableRow.appendChild(deleteTD)
            table.appendChild(tableRow)
        })


    })
}

function GetAdmin() {
    getAdmins().then(result => {
        let jsonResult = JSON.stringify(result)
        let parsedObject = JSON.parse(jsonResult)
        let table = document.getElementById('adminTable')
        parsedObject.forEach(admin => {

            let tableRow = document.createElement('tr')
            let userNameTD = document.createElement('td')
            let roleTD = document.createElement('td')

             let deleteTD = document.createElement('td')

             deleteTD.innerHTML = `<a href="/admin/delete/admin/${admin._id} " class="text-muted"><i class="fa fa-remove"></i></a>`
            userNameTD.innerHTML = `${admin.username}`

            roleTD.innerText = admin.role
            tableRow.appendChild(userNameTD)
            tableRow.appendChild(roleTD)

            tableRow.appendChild(deleteTD)
            table.appendChild(tableRow)

        })

    })

}