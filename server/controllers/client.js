import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/client.js"

export const register = async (request, response) => {
    try {
        const {
            fullName,
            email,
            password,
            address,
            role
        } = request.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: passwordHash,
            address,
            role
        });

        const savedUser = await newUser.save();
        response.status(201).json(savedUser)
    }
    catch (err) {
        response.status(500).json({ error: err.message });
    }
}


export const login = async (request, response) => {
    try {

    }
    catch (error) {
        
    }
}