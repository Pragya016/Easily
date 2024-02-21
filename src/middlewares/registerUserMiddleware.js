export function registerUser(req, res, next) {

    const obj = req.body;

    // create cookie
    res.cookie('session_id', 'user' + req.body.email, {
        maxAge: 2 * 24 * 60 * 60 * 1000
    });

    // using session
    req.session.email = obj.email;
    req.session.password = obj.password
    next();
}