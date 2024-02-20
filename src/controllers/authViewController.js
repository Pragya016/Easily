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
        const isValidUser = model.isUserRegistered(email, password);
        if (!isValidUser) {
            return res.render('loginView', { errorMessage: "Something went wrong. Try again!" });
        }

        // req.session.userEmail = email;
        // const products = ProductsModel.get();
        res.redirect('/jobs');
    }
}