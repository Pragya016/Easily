import bcrypt from 'bcrypt';
import { getDB } from '../../config/mongodbConfig.js';

export class UserRepository{
    static async registerUser(name, email, password) {
        // generate hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = { name, email, password: hashedPassword }
        const db = await getDB();
        return await db.collection('Users').insertOne(newUser);
    } catch(error) {
        console.log(error)
    }
}