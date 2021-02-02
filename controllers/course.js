const mongoose = require('mongoose')
const Course = require('../models/course')
const formidable = require('formidable');
var fs = require('fs');

exports.addCourse = async (req, res) => {

    //Aligning Sections
    var sections = []
    req.body.sections.forEach((section,index) => {
        sections.push({
            name: section,
            lessons: req.body.data[`lessongroup-${index + 1}`]
        })
    });

    const courseExist = await Course.findOne({_id:req.body.id})

    if (courseExist){
        Course.updateOne({_id: req.body.id}, {...req.body.data, sections}).then(result => {
            console.log(result)
                res.send(result)
            })   
            .catch(err =>{
            console.log("Catch")
            res.json({
                message: err
            })
        })
    }
    else{
        const newCourse = new Course ({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.data.name,
            description: req.body.data.description,
            totalLectures: req.body.data.totalLectures,
            duration: req.body.data.duration,
            period: req.body.data.period,
            videoLanguage: req.body.data.videoLanguage,
            studyLanguage: req.body.data.studyLanguage,
            category: req.body.data.category,
            tags: req.body.data.tags,
            demoVideo: req.body.data.demoVideo,
            driveLink: req.body.data.driveLink,
            variants: req.body.data.variants,
            addons: req.body.data.addons,
            cover: req.body.coverImg,
            sections,
        })     
    
        await newCourse.save().then(result => {
                res.status(200).send(result)
            })   
            .catch(err =>{
            console.log(err)
            res.status(400).json({
                message: err
            })
        })
    }
    
    
    
}

exports.getAllCourses = async (req, res) => {
    await Course.find({}, {name:1,description:1,duration:1, variants:1, videoLanguage:1, category:1, status:1})
    .then(courses => {
        res.send(courses)
    })
}

exports.getCourse = async (req, res) => {
    await Course.findOne({_id: req.params.id})
    .then(course => {
        res.status(200).send(course)
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.getCourseCover = async (req, res) => {
    Course.findOne({_id: req.params.id}, {cover: 1})
    .then(course => {
        const im = course.cover.split(",")[1];

        const img = Buffer.from(im, 'base64');

        res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
        });

        res.end(img);
        
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.changeStatus = async (req, res) => {


    const status = req.params.status === "Published" ? "Unpublished" : "Published"

    await Course.updateOne(
        {
            _id: req.params.id
        },
        {
            status: status 
        }
    ).then(result => {
        res.status(200).send({
            result, 
            status
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.addToCart = (req, res) => {

    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        
        Course.findOne({_id: fields.id}, {name: 1, cover: 1, variants: 1,addons: 1}).then(course => {
            var price = course.variants[fields.variant].discountPrice
            var details = [course.variants[fields.variant].name]
            course.addons.forEach(addon => {
                if(fields[addon.name]) {
                    price += addon.price
                    details.push(addon.name)
                }
            })
            
            const cartItem = {
                id: fields.id,
                product: "Course",
                name: course.name,
                amount: price,
                details
            }

            try{
                req.session.cart.push(cartItem)
            }
            catch(e){
                req.session.cart = [cartItem]
            }          
            req.session.message = {
                type: "success",
                content: "Added to cart successfully."
            }
            res.redirect(`/course/${fields.id}`)

        }).catch(err => {
            console.log(err);
            res.status(400).send(err)
        })

        

    });

}

exports.deleteCourse = async (req, res) => {
    await Course.deleteOne({_id: req.params.id})
    .then(course => {
        res.status(200).send(course)
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}