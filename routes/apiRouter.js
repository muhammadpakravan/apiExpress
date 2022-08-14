const express = require('express')
const Router = express.Router()
const News = require('../models/news')
const Category = require('../models/category')
const Source = require('../models/source')

Router.get('/Article', async (req, res) => {
    const result = await News.find({status: true})
    res.json(result)

})

Router.get("/Article/:id", async (req, res) => {
    try {
        const result = await News.findById(req.params.id)
        console.log(result)
        if (result != null && result.status === 'true') {
            result.view += 1
            result.save()
            res.json(await News.findById(req.params.id))
        } else
            res.json({Error: 'request not valid'})
    } catch (e) {
        res.json({Error: "id is not valid"})
    }
})
Router.get('/category', async (req, res) => {
    const result = await Category.find()
    res.json(result)

})
Router.get('/source', async (req, res) => {
    const result = await Source.find()
    res.json(result)

})

Router.get('/source/:source', async (req, res) => {
    const result = await News.find({source_name: req.params.source, status: true})
    res.json(result)
})
Router.get('/category/:category', async (req, res) => {
    const result = await News.find({category_name: req.params.category, status: true})
    res.json(result)
})
Router.get('/filter/:source/:category', async (req, res) => {
    const result = await News.find({source_name: req.params.source, category_name: req.params.category, status: true})
    res.json(result)
})
Router.get('/promuted', async (req, res) => {
    const result = await News.find({status: true,})
    res.json(result)
})
Router.get('/search/:input', async (req, res) => {
    const input = req.params.input;
    const regex = new RegExp(input, "i"); /// i in case insensitive
    const result = await News.find({title: regex, status: true});
    res.json(result)

})

module.exports = Router
