const express = require('express')
const Router = express.Router()
const pages = require('../controllers/pages')

Router.get("/", pages.homepage)

Router.get("/about", pages.about)

Router.get("/contact", pages.contact)

Router.get("/courses", pages.allCourses)

Router.get("/course/:id", pages.course)

Router.get("/blogs", pages.blogs)

Router.get("/blog", pages.blogDetails)

Router.get("/login", pages.login)

Router.get("/signup", pages.signup)

Router.get("/resetpassword", pages.resetPassword)


Router.get('/checkout', pages.checkout)

Router.get('/terms', (req, res) => {res.render('terms')})

Router.get('/privacypolicy', (req, res) => {res.render('privacy')})

module.exports = Router 