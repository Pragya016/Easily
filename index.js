import express from 'express';
import path from 'path';
import { LandingPageController } from './src/controllers/landingPageController.js';
import expressEjsLayouts from 'express-ejs-layouts';
import { validateFormData } from './src/middlewares/formValidationMiddleware.js';
import { AuthController } from './src/controllers/authViewController.js';
import { displayError } from './src/controllers/errorController.js';
import { registerUser } from './src/middlewares/registerUserMiddleware.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { Auth } from './src/middlewares/authMiddleware.js';
import { PostJobController } from './src/controllers/jobController.js';

const app = express();

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
// create instance of controller
const authController = new AuthController();
const landingPageController = new LandingPageController();

// auth routes
app.get('/register', authController.displayRegisterView)
app.get('/login', authController.displayLoginView)
app.post('/register', validateFormData, registerUser, authController.displayLoginView);
app.post('/login', authController.varifyUser)
app.get('/logout', authController.logout); //this is supposed to be post method


// job routes
app.get('/', landingPageController.displayLandingPage);
app.get('/jobs', landingPageController.displayJobView);
// app.put('/jobs/:id', landingPageController.updateJobDetails);
app.get('/job-details/:id', landingPageController.displayJobDetails);

// rooutes for recruiter actions
app.get('/postjob', auth.checkCookie, landingPageController.postNewJob)
app.post('/postjob', PostJobController.postJob)
app.get('/update-job/:id', PostJobController.displayUpdateJobForm);
app.post('/update-job', PostJobController.updateJobDetails)

// render error page
app.get('/404', displayError);

// create a server
app.listen(5500);
console.log('server is listening...');