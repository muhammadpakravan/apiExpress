const express = require("express")
const Router = express.Router()
const News = require('../models/news')
const Category = require("../models/category")
const Source = require("../models/source")
const UserModel = require('../models/user')
const multer = require("multer");
let path = require("path");
const bcrypt = require("bcrypt");
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        console.log("File Object", file);
        let ext = "";
        if (file.originalname.split(".").length > 1) {
            ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        }
        console.log("ext", ext);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    },
});

let upload = multer({storage: storage});

Router.get("/", (req, res) => {

    res.render('admin')
})


Router.post("/create-news", upload.single("image"), async (req, res) => {
    let filePath
    const user = await UserModel.findById(req.user)
    try {

        filePath = req.file.path;

    } catch (e) {
        console.log(e);
    }
    const news = new News({
        title: req.body.title,
        text: req.body.text,
       writer: user.username,
        category_name: req.body.category,
        source_name: req.body.source,
        status: req.body.status,
        promuted: req.body.promuted,
        image: "\\" + filePath,
        view: 0

    })

    news.save().then(r => res.render('admin_news', {ok: 'ok'}))


})

Router.post("/create-category", (req, res) => {
    let name = req.body.name

    const category = new Category({
        name: name
    })
    category.save().then(r => res.render('admin_category', {ok: 'ok'}))
})


Router.post("/create-source", (req, res) => {


    const source = new Source({

        name: req.body.name,
        url: req.body.url
    })
    source.save().then(r => res.render('admin_source', {ok: 'ok'}))
})

Router.get("/news", (req, res) => {


    res.render('admin_news')

})

Router.get("/source", (req, res) => {
    res.render('admin_source')
})

Router.get('/category', (req, res) => {
    res.render("admin_category")
})


Router.get('/all-news', async (req, res) => {
    const result = await News.find({})
    res.json(result)
})
Router.get('/delete/news/:id', async (req, res) => {
    console.log('id', req.params.id)
    await News.findByIdAndRemove(req.params.id)

    res.render('admin_news', {ok: 'ok'})
})
Router.get('/delete/source/:id', async (req, res) => {
    console.log('id', req.params.id)
    await Source.findByIdAndRemove(req.params.id)

    res.render('admin_source', {ok: 'ok'})
})
Router.get('/delete/category/:id', async (req, res) => {
    console.log('id', req.params.id)
    await Category.findByIdAndRemove(req.params.id)

    res.render('admin_category', {ok: 'ok'})
})
Router.get('/edite/news/:id', async (req, res) => {
    let news;
    try {
        news = await News.findById(req.params.id)

    } catch (e) {
        console.log()
    }
    if (news != null) {

        res.render('edite_new', {news: news})
        console.log('news is not em')
    } else {
        res.render('edite_new', {error: 'e'})
        console.log('news is em')
    }
})
Router.get('/edite/category/:id', async (req, res) => {
    let category;
    try {
        category = await Category.findById(req.params.id)

    } catch (e) {
        console.log()
    }
    if (category != null) {

        res.render('edite_category', {category: category})

    } else {
        res.render('edite_category', {error: 'e'})

    }
})
Router.get('/edite/source/:id', async (req, res) => {

    let source;
    try {
        source = await Source.findById(req.params.id)

    } catch (e) {
        console.log()
    }
    if (source != null) {
        console.log(source)
        res.render('edite_source', {source: source})

    } else {
        console.log('ssss')
        res.render('edite_source', {error: 'e'})

    }
})


Router.post('/edite-news', upload.single("image"), async (req, res) => {

   let id = req.body.id
    const user = await UserModel.findById(req.user)
    if (req.file !== undefined) {
        let filePath = req.file.path;
        await News.findByIdAndUpdate(id = id,
            {
                title: req.body.title,
                text: req.body.text,
                category_name: req.body.category,
                source_name: req.body.source,
                status: req.body.status,
                writer:user.username,
                promuted: req.body.promuted,
                image: "\\" + filePath,
            })

        res.render("admin", {ok: 'ok'})
    } else {
        await News.findByIdAndUpdate(id = id,
            {
                title: req.body.title,
                text: req.body.text,
                category_name: req.body.category,
                source_name: req.body.source,
                status: req.body.status,
                writer: user.username,
                promuted: req.body.promuted,
            })
        res.render("admin", {ok: 'ok'})


    }


})
Router.post('/edite-category', async (req, res) => {
    let category = await Category.findById(req.body.id)


    await News.updateMany({category_name: category.name}, {category_name: req.body.name})
    await Category.findByIdAndUpdate(req.body.id, {name: req.body.name})


    res.render("admin", {ok: 'ok'})

})
Router.post('/edite-source', async (req, res) => {
    let source = await Source.findById(req.body.id)


    await News.updateMany({source_name: source.name}, {source_name: req.body.name})
    await Source.findByIdAndUpdate(req.body.id, {name: req.body.name, url: req.body.url})


    res.render("admin", {ok: 'ok'})

})
Router.get('/admins', async (req, res) => {
    const users = await UserModel.find({})
    res.json(users)
})

Router.get('/create-admin', async (req, res) => {

    const user = await UserModel.findById(req.user)
    if (user.role === 'admin') {
        res.render('create_admin')
    } else {

        res.render('restricted')
    }
})

Router.post('/create-admin', async (req, res) => {


    let hashPas = await bcrypt.hash(req.body.password, 10);
    await UserModel.create({
        username: req.body.username,
        password: hashPas,
        role: req.body.role
    })
    res.render("admin", {ok: 'ok'})
})
Router.get('/delete/admin/:id',async (req,res)=>{
    const user = await UserModel.findById(req.user)
    if (user.role === 'admin') {
        await UserModel.findByIdAndRemove(req.params.id)
        res.render('create_admin')
    } else {

        res.render('restricted')
    }
})

module.exports = Router
