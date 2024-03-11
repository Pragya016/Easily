import express from 'express';
import path from 'path';
import session from 'express-session';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';

import { LandingPageController } from './src/controllers/landingPageController.js';
import { validateFormData } from './src/middlewares/formValidationMiddleware.js';
import { AuthController } from './src/controllers/authViewController.js';
import { displayError } from './src/controllers/errorController.js';
import { registerUser } from './src/middlewares/registerUserMiddleware.js';
import { Auth } from './src/middlewares/authMiddleware.js';
import { JobsController } from './src/controllers/jobController.js';
import { ApplicantsController } from './src/controllers/applicantsController.js';
import { sendMail } from './src/middlewares/mailMiddleware.js';
import {connectToMongoDB} from './config/mongodbConfig.js';
// import dotenv from 'dotenv';

const app = express();

// config env file
// dotenv.config();

// setup session
app.use(session({
    secret: 'secret-key',
    saveUninitialized: false,
    resave: true,
    cookie: {
        secure: false
    }
}))

const auth = new Auth()

// setup cookie parser
app.use(cookieParser())

// set up body data parser 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve() + '/src' + '/views'));


// using ejs layout
app.use(expressEjsLayouts);
app.use(express.static('src/views'));
app.use(express.static('public'));

// set isLoggedIn conditionally so that it may update navbar links conditionally
app.use((req, res, next) => {
    // if (req.session && req.session.email) {
    if (req.cookies && req.cookies.userEmail) {
        res.locals.isLoggedIn = true;
    } else {
        res.locals.isLoggedIn = false;
    }
    next();
});
// create instance of controllers
const authController = new AuthController();
const landingPageController = new LandingPageController();
const applicantsController = new ApplicantsController();

// auth routes
app.get('/register', authController.displayRegisterView)
app.get('/login', authController.displayLoginView)
app.post('/register', validateFormData, registerUser , sendMail, authController.registerUser);
app.post('/login', authController.varifyUser)
app.get('/logout', authController.logout); //this is supposed to be post method


// job routes
app.get('/', landingPageController.displayLandingPage);
app.get('/jobs', JobsController.displayJobView);
app.get('/job-details/:id', JobsController.displayJobDetails);

// rooutes for recruiter actions
app.get('/postjob', auth.checkCookie, JobsController.postNewJob)
app.post('/postjob', JobsController.postJob)
app.get('/update-job/:id', JobsController.displayUpdateJobForm);
app.post('/jobs', JobsController.updateJobDetails)
app.delete('/job-details/:id', JobsController.deleteJob)

// job seeker's routes
app.post('/job-details/:id', applicantsController.addApplicant)

// render error page
app.get('/404', displayError);

// create a server
app.listen(5500);
 connectToMongoDB()
console.log('server is listening at 5500.');