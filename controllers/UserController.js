const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET;

//generate user token

const generateToken = (id) => {
    return jwt.sign({id},jwtSecret,{
        expiresIn: "7d",
    });
};

// register user and sign in
const register = async(req,res)=>{
   
    const {name, matricula, email, password} = req.body

    //check if user exist
    const user = await User.findOne({email})
    const matriculaUser = await User.findOne({matricula})

    if(user){
        res.status(422).json({errors:["Por favor, utilize outro e-mail."]})
        return
    }
    if(matriculaUser){
        res.status(422).json({errors:["Matricula em uso, entre em contato com o suporte"]})
    }

    //generate pass hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password,salt)

    //create user
    const newUser = await User.create({
        name,
        matricula,
        email,
        password: passwordHash
    })

    //if user was created sucessfuly, return the token
    if(!newUser){
        res.status(422).json({errors:["Houve um erro, por favor tente mais tarde."]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })


};

// sign user in
const login = async (req,res)=> {
    
    const {email,password} = req.body
    const user = await User.findOne({email})

    //check if user exists
    if(!user){
        res.status(404).json({errors:["Usuário não encontrado."]})
        return
    }

    //check if password matches
    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors:["Senha inválida"]})
        return
    }
    //return user with token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    })

}

// get current logged in user
const getCurrentUser = async(req,res)=>{
    const user = req.user

    res.status(200).json(user)
}

// update an user
const update = async (req,res)=>{
    res.send("Update")
}

module.exports={
    register,
    login,
    getCurrentUser,
    update,
};