const express = require('express');
const login = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/authors')


login.post('/login', async (request, response) => {
   try {
    const author = await userModel.findOne({
        email: request.body.email
    })
    if (!author) {
        return response.status(404).send({
            statusCode: 404,
            message: 'This author not exist!'
        })
    }
    const isPasswordValide = await bcrypt.compare(request.body.password, author.password)

    if(!isPasswordValide) {
        return response.status(401).send({
            statusCode:401,
            message: 'Unauthorized'
        })
    }
     
    const token = jwt.sign({
        name: author.name,
        surname: author.surname,
        birthday: author.birthday,
        email: author.email
    }, process.env.SECRET_KEY, {
        expiresIn: '24h'
    })

    response.header('Authorization', token).status(200).send({
        statusCode: 200,
        message: 'Login successful', 
        token
    })

   } catch (error) {
    response.status(500).send({
        statusCode: 500,
        message: 'Internal Server Error'
    })
   }
})



module.exports= login;