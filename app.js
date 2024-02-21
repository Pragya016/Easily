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
import { doesUserAlreadyExist } from './src/middlewares/checkAlreadyRegisteredUsersMiddleware.js';

const app = express();

// layout.ejs is not updating conditionally

// setup session
app.use(session({
    secret: 'secret-key',
    saveUninitialized: false,
    resave: false
}))

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


// create instance of controller
const authController = new AuthController();
const landingPageController = new LandingPageController();

// auth routes
app.get('/register', authController.displayRegisterView)
app.get('/login', authController.displayLoginView)
app.post('/register', validateFormData, doesUserAlreadyExist,  authController.displayLoginView);
// app.post('/register', validateFormData, doesUserAlreadyExist, authController.displayLoginView);
app.post('/login', registerUser, authController.varifyUser)
app.get('/logout', authController.logout); //this is supposed to be post method


// job routes
app.get('/', landingPageController.displayLandingPage);
app.get('/jobs', landingPageController.displayJobView);
app.put('/jobs/:id', landingPageController.updateJobDetails);
// app.post('/jobs', landingPageController.displayJobView);
app.get('/job-details/:id', landingPageController.displayJobDetails);
// app.delete('/job-details/:id', landingPageController.displayJobDetails);


// render error page
app.get('/404', displayError);

// create a server
app.listen(5500);
console.log('server is listening...');