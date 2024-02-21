import { registeredUsers } from "../models/jobs.js";

export function doesUserAlreadyExist(req, res, next) {
    const obj = req.body;

    // check if user already exists
    const doesUserAlreadyExist = registeredUsers.find(u => u.email == obj.email);

    if (doesUserAlreadyExist) {
        res.render('registerView', { errorMessage: [] });
    }

    const newUser = {
        name: obj.name,
        email: obj.email,
        password: obj.password
    }

    // push this new user into registered users array
    registeredUsers.push(newUser);
    next();
}