import bcrypt from 'bcrypt';
import { JobModel } from "../models/jobsModel.js";
import { getDB } from "../../config/mongodbConfig.js";

const model = new JobModel();

export class AuthController {
    displayRegisterView(req, res) {
        res.render('registerView', { errorMessage: [] })
    }

    displayLoginView(req, res) {
        res.render('loginView');
    }

    async registerUser(req, res) {
        try {
            const {name, email, password} = req.body;

            // generate hash password
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = { name, email, password : hashedPassword }

            const db = await getDB();
            await db.collection('Recruiters').insertOne(newUser);
            console.log(newUser);
            res.render('loginView', { errorMessage: '' });
        } catch (error) {
            res.redirect('errorPage');
        }
    }

    varifyUser(req, res) {
        const { email, password } = req.body;

        // if user has entered invalid credentials
        const isValidUser = model.isUserRegistered(email, password);
        if (!isValidUser) {
            return res.render('loginView', { errorMessage: "Email or password is incorrect!" });
        }

        res.locals.isLoggedIn = true;

        // create cookies
        res.cookie('userEmail', email, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
        });

        req.session.email = email
        res.redirect('/jobs');
    }

    logout(req, res) {
        res.locals.userName = ''
        res.clearCookie('userEmail');
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/404');
            } else {
                res.locals.isLoggedIn = false;
                return res.redirect('/');
            }
        });

    }
}