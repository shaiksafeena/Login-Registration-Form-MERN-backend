const mongoose =require("mongoose");

const employeeSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobilenum:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },  
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }


}) 

const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;