const User = require('../models/UserModel');
const path = require('path');
const fs = require('fs')
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
                res.redirect(`/displayUsers`);
            }else{
                console.log("issue")
            }
        })
    })

   // console.log(image)
    //res.redirect('/')
}

const deleteUser=(req,res)=>{
    const { id } = req.query;
    console.log(id)
 User.findById(id, (error, doc) => {
    if (!error) {
      const pic = path.resolve(__dirname, "../public/images/", doc.image);
      fs.unlinkSync(pic);
      User.findByIdAndDelete(id, (error, data) => {
        if (!error) {
      //      console.log("1");
          res.redirect("displayUsers");
        } else {
          res.redirect("/");
        }
      });
    }
    else{
        console.log("error2")
    }
  });
}

const displayUsers= async(req,res)=>{
const data = await User.find();
  if (data) {
    res.render("displayUsers", { user: data });
  } else {
    res.render("/");
  }
}
const display = (req,res)=>{
    res.render('display')
}

const updateUser= async (req,res)=>{
    const { id } = req.query;
  //console.log(id)
  const data = await User.findById(id);
  if (data) {
    res.render("updateUser", { user: data });
  } else {
    res.redirect("displayUsers");
  }
}

const userUpdated = (req,res)=>{
    const { id } = req.query;
    const {fullname,email,phoneNumber,country,state,city,address,zipcode} = req.body;
  const { image } = req.files;

  image.mv(path.resolve(__dirname, "../public/images", image.name), (error) => {
    if (!error) {
      User.findById(id, (error, data) => {
        if (!error) {
          const oldImg = path.resolve(
            __dirname,
            "../public/images",
            data.image
          );
          fs.unlinkSync(oldImg);

          User.findByIdAndUpdate(
            id,
            {
                fullname:fullname,email:email,phoneNumber:phoneNumber,country:country,state:state,city:city,address:address,zipcode:zipcode, image:image.name
       
            },
            (error, data) => {
              if (!error) {
                res.redirect("displayUsers");
              } else {
                res.redirect("updateUser");
              }
            }
          );
        }
      });
    }
  });
}

module.exports={
    deleteUser,displayHome,
    displayError,
    registerUser,
    display,
    displayUsers,
    updateUser,
    userUpdated
}