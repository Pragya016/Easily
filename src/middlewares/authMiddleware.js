export class Auth {
    checkCookie(req, res, next) {
        if (req.cookies.userEmail) {
            res.locals.isLoggedIn = true;
            next();
        } else {
            // res.redirect('/login');
            res.send('You must have a recruiter account to post a job!')
        }
    }

    isAuthenticated(req, res, next) {
        if (req.session && req.session.email) {
            return next();
        }

        return res.render('loginView', { errorMessage: 'Please log in to continue.' });
    }
}
