import { JobModel } from "../models/jobsModel.js";

const model = new JobModel();

export class AuthController {
    displayRegisterView(req, res) {
        res.render('registerView', { errorMessage: [] })
    }

    displayLoginView(req, res) {
        res.render('loginView', {errorMessage : ''});
    }

    varifyUser(req, res) {
        const { email, password } = req.body;
        
        // if user isn't logged in
        if (!req.session.email && !req.session.password) {
            res.render('loginView', { errorMessage: "No registered user found with this email address." });
        }

        // if user has entered invalid credentials
        const isValidUser = model.isUserRegistered(email, password);
        if (!isValidUser) {
            res.render('loginView', { errorMessage: "Email or password is incorrect!"});
        }


        res.redirect('/jobs');
    }

    logout(req, res) {
        res.clearCookie('session_id');
        // res.locals.isLoggedin = false;
        res.redirect('/')
    }
}