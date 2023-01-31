const User=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');

exports.signUp=async(req,res)=>{
    const userObj={
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    }
    try
    {
        const newUser=await User.create(userObj);
        console.log(`#### Successfully Created User : ${newUser.username} ####`)
        res.status(201).send(newUser);
    }
    catch(err)
    {
        console.log("#### Error while user signUp ####",err.message);
        res.status(500).send({
            message:"Internal Server Error"
        })
    }
}

exports.signIn=async(req,res)=>{
    try
    {
        const user=await User.findOne({username:req.body.username});
        if(!user)
        {
            return res.status(500).send({
                message:"Failed! User does not exist"
            })
        }
        const isvalid=bcrypt.compareSync(req.body.password,user.password);
        if(!isvalid)
        {
            return res.status(400).send({
                message:"Failed! Invalid Password"
            })
        }
        res.status(200).send(user)
    }
    catch(err)
    {
        res.status(500).send({
            message:"Internal server error"
        })
    }
}


exports.forgetPassword=async(req,res)=>{
    const reqBody={
        email:req.body.email,
        password:req.body.password
    }

    const user=await User.findOne({email:reqBody.email});

    if(!user)
    {
        return res.status(400).send({
            message:"User Doesn't Exist"
        })
    }
    bcrypt.hash(reqBody.password,8,(err,hash)=>{
        if(err)
        {
            return res.status(500).send({error:err})
        }
        user.password=hash;
        user.save((err)=>{
            if(err)
            {
                return res.status(500).send({error:err});
            }

            const token=jwt.sign({id:user._id},"sandeep",{expiresIn:'1h'})
            res.send(
                {
                    message:"Successfully Reset Password"
                }
            )
        })
    })
}