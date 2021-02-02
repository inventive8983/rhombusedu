

exports.clear = async (req, res) => {
    try{
        req.session.cart = []
        console.log(req.session.cart);
        res.status(200).send("Success")
    }
    catch(e){
        res.status(400).send(e)
    }
}

exports.items = async (req,res) => {
    if(req.session.cart){
        if(req.session.cart.length){
            req.status(200).send(req.session.cart)
        }
        else{
            req.status(204).send([])
        }
    }
    else{
        req.status(204).send([])
    }
}