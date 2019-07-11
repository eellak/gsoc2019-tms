const jwt = require('jsonwebtoken');
const University=require('../models/university');
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    
    try { 

        let university;
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        University.findById(decoded.university)
        .select('name')
        .exec()
        .then(university => {
            if(university!=null) {
                decoded.university=university.name;
                console.log(decoded);
                res.status(200).json({
                    userData:decoded
                })
            }
        })
        .catch(error=> {
            res.status(500).json({error:error})
        })       
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};