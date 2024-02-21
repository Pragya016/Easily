export function registerUser(req, res, next) {

    const obj = req.body;
    console.log(obj);
    // create cookie
    res.cookie('session_id', 'user' + req.body.email, {
        maxAge: 2 * 24 * 60 * 60 * 1000
    });

    // setting local variable
    // res.locals.isLoggedin = true;

    // using session
    req.session.isLoggedIn = true;
    req.session.email = obj.email;
    req.session.password = obj.password
    next();
}