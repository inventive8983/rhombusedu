const mongoose = require('mongoose')
const Course = require('../models/course')
const categories = ['CA', 'UGC-NET', 'MBA', 'Junior']
const Razorpay = require('razorpay')

exports.homepage = async (req, res) => {
    res.render('homepage', {
        ...req.pageData
    })
}

exports.about = async (req, res) => {
    res.render('about', {
        ...req.pageData
    })
}

exports.contact = async (req, res) => {
    res.render('contact', {
        ...req.pageData
    })
}

exports.allCourses = async (req, res) => {
    Course.find({status:"Published"}, {name: 1, category: 1, duration: 1, variants: 1, cover: 1}).then(courses => {
        var organized = {}
        courses.forEach(course => {
            if(organized[course.category]){
                organized[course.category].push(course)                
            }
            else{
                organized[course.category] = []
                organized[course.category].push(course)                
            }
        });
        res.render('courses', {
            courses: organized,
            categories,
            ...req.pageData
        })
    })
    
}

exports.course = async (req, res) => {

    try{

        const course = await Course.findOne({_id: req.params.id})
        if(!course) return res.sendStatus(404)

        var relatedCourses = await Course.find({category: course.category}, {name: 1, category: 1, duration: 1, variants: 1, cover: 1}).limit(3)
        res.render('course-details', {
            course,
            relatedCourses,
            addedToCart: req.session.cart.filter(item => item.id = req.params.id).length,
            ...req.pageData
        })

    }catch(e){
        return res.sendStatus(404)
    }
    
}

exports.blogs = async (req, res) => {
    res.render('blogs')
}

exports.blogDetails = async (req, res) => {
    res.render('blog-details')
}

exports.login = async (req, res) => {
    res.render('login')
}

exports.signup = async (req, res) => {
    res.render('signup')
}

exports.resetPassword = async (req, res) => {
    res.render('reset-password')
}


exports.checkout = async (req, res) => {

    var total = 0
    try{
        req.session.cart.map(item => { total+= item.amount })
    }
    catch(e){
        
    }

    res.render('checkout', {
        total,
        ...req.pageData
    })

    
}
