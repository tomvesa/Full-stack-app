'use strict';
const  auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models/');
console.log("User from credentials", User);


exports.authenticateUser = async (req, res, next) => {
    console.log("authenticateUser middleware");
    const cookieUser = req.cookies.authenticatedUser;
    console.log("authenticated user from a cookie", cookieUser);
    if(cookieUser){
        console.log("authenticated user from a cookie", cookieUser);
        const authenticatedUser = JSON.parse(cookieUser);
         req.currentUser = authenticatedUser.user;
         console.log("current user from cookie", req.currentUser);
         next()
    } else {
        //console.log("request", req);
        //look for credentials using the basic auth module
        const credentials = auth(req);
        console.log({credentials})
        let message; //failed authentication messages

        if (credentials){
            console.log(credentials.name, credentials.pass)
                //look for user in database
            const user = await User.findOne({where: {emailAddress: credentials.name}});
            if (user){
                console.log('found user', user.emailAddress,)
                // compare user password against password provided in credentials
                const authenticated = bcrypt.compareSync(credentials.pass, user.password);
                if (authenticated){
                    console.log("Authentication successful for user", user.emailAddress);
                    //set current user in request
                    req.currentUser = user;
                } else {
                    message = "Authentication failed";
                }
            } else {
                message = "User not found";
            }
        } else {
            message = "Auth header not found";
        }

        if (message){
            console.warn(message);
            res.status(401).json({ message: 'Access denied' })
        } else {
            next();
    }}
}