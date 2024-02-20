import { body, validationResult } from "express-validator";

export async function validateFormData(req, res, next) {
    // define validation rules
    const rules = [
        body('name').notEmpty().withMessage('Name is required!'),
        body('email').isEmail().withMessage('Email is not valid.'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 8 characters long')
            .matches(/\d/)
            .withMessage('Password must contain a number')
            .matches(/[a-z]/)
            .withMessage('Password must contain a lowercase letter')
            .matches(/[A-Z]/)
            .withMessage('Password must contain an uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage('Password must contain a special character'),

    ]

    await Promise.all(rules.map(rule => rule.run(req)));

    // check if there ara any errors after running those rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('registerView', { errorMessage: errors.array() })
    }

    next();
}