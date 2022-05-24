const User = require('../models/UserModel');
const path = require('path');
const displayHome = (req,res)=>{
    res.render('registration')
}

const displayError = (req,res)=>{
    res.render('error')
}

const registerUser = (req,res)=>{
    const {fullname,email,phoneNumber,country,state,city,address,zipcode} = req.body;
    const {image} = req.files;
    console.log(fullname,email,phoneNumber,country,state,city,address,zipcode);
    image.mv(path.join(__dirname, "../public/images", image.name), (error) => {
        User.create({
            fullname:fullname,email:email,phoneNumber:phoneNumber,country:country,state:state,city:city,address:address,zipcode:zipcode, image:image.name
        },(error)=>{
            if(!error){
                console.log("done")
            }else{
                console.log("issue")
            }
        })
    })

    console.log(image)
    res.redirect('/')
}


module.exports={
    displayHome,
    displayError,
    registerUser
}