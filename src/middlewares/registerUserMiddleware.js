import { registeredUsers } from "../models/jobs.js";

export function registerUser(req, res, next) {
    const obj = req.body;
    const newUser = {
        name: obj.name,
        email: obj.email,
        password: obj.password
    }
    registeredUsers.push(newUser);
    next();
}