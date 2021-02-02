const  userRoutes = require('./user')
const  feedBackRoutes = require('./feedback')
const  reportRoutes = require('./report')
const  contactRoutes = require('./contact')
const  pagesRoutes = require('./pages')
const  cartRoutes = require('./cart')
const  paymentRoutes = require('./payments')

//Products
const  courseRoutes = require('./course')


const express =require('express')
const router = express.Router()


router.use("/", (req, res, next) => {

    req.pageData = {
        cart: req.session.cart || [],
        message: req.session.message
    }
    req.session.message = false
    next()

}, pagesRoutes)

router.use("/api/user", userRoutes)
router.use("/api/feedback", feedBackRoutes)
router.use("/api/contact", contactRoutes)
router.use("/api/report", reportRoutes)
router.use("/api/cart", cartRoutes)
router.use("/api/payment", paymentRoutes)

//Products
router.use("/api/course", courseRoutes)

const errorMessage = {
    pageNotFound: 'Page Not Found'
}

//handling error 404 (Not Found)
router.use((req, res, next) => {
  
    const error = new Error(errorMessage.pageNotFound);
    error.status = 404;
    res.status(error.status).json({
        message: error.message
    })
});
    
module.exports = router