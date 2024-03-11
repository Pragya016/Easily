import jwt from 'jsonwebtoken'

export default function jwtAuth(req, res, next) {
    // read the token
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Unauthorized')
    }

    // check if token is valid 
    try {
        const payload = jwt.verify(token, 'QWuAfxx8Giu88kd01zIjtOABJIKY7sG7')
        // req.userEmail = payload.email;

    } catch (error) {
        res.send('Unauthorized.');
    }

    next();
}