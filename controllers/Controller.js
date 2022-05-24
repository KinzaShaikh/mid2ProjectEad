const displayHome = (req,res)=>{
    res.render('index')
}

const displayError = (req,res)=>{
    res.render('error')
}


module.exports={
    displayHome,
    displayError
}