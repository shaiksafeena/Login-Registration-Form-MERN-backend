const express =require("express");
const path = require("path");
const app=express();
const hbs=require("hbs");

require("./db/conn");

const Register = require("./models/registers");
const {json} = require("express");

const port=process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("index")

});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/register",async(req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmployee = new Register({
                username : req.body.username,
                email:req.body.email,
                mobilenum:req.body.mobilenum,
                gender:req.body.gender,
                password:password,
                confirmpassword:cpassword
            })
            const registered = await registerEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("passwords are not matching")
        }


    } catch(error){
        res.status(400).send(error);
    }
});

//login check

app.post("/login",async(req,res)=>{
    try {
            const email = req.body.email;
            const password = req.body.password;

            // console.log(`${email} and password is ${password}`);
            const useremail = await Register.findOne({email:email});
            if(useremail.password === password){
                res.status(201).render("index");
            }else{
                res.send("invalid login details");
            }

    } catch (error) {
        res.status(400).send("invalid login details");
        
    }
})

// const bcrypt = require("bcrypt");

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})