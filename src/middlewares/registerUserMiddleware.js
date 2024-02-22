import { registeredUsers } from "../models/jobs.js";

export function registerUser(req, res, next) {
    const obj = req.body;
    // // check if user already exists
    // const doesUserAlreadyExist = registeredUsers.find(u => u.email == obj.email);

    // if (!doesUserAlreadyExist) {
    //     res.render('registerView', { errorMessage: [{msg : 'An user with this email already exists.'}] });
    // }

    const newUser = {
        name: obj.name,
        email: obj.email,
        password: obj.password
    }

    // push this new user into registered users array
    registeredUsers.push(newUser);
    next();
}