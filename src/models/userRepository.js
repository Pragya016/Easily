import bcrypt from 'bcrypt';
import { getDB } from '../../config/mongodbConfig.js';

export class UserRepository {
    static async registerUser(name, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = { name, email, password: hashedPassword };
            const db = await getDB();
            return await db.collection('Users').insertOne(newUser);
        } catch (error) {
            console.error('Error registering user:', error);
            throw new Error('Failed to register user');
        }
    }

    static async verifyUser(email, password) {
        try {
            const db = await getDB();
            const user = await db.collection('Users').findOne({ email });

            if (!user) {
                return false; // User not found
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            return passwordMatch ? user : false; // Return user object if password matches, otherwise false
        } catch (error) {
            console.error('Error verifying user:', error);
            throw new Error('Failed to verify user');
        }
    }
}
