import { emailRegExp, passwordRegExp } from "../../../utils/regexp";

interface IAuthData {
    email?: string;
    password?: string;
    name?: string;
}

export default class AuthenticationData {
    public email;
    public password;
    public name;

    constructor({ email, password, name }: IAuthData) {
        if (!this.validateEmail(email) || !this.validatePassword(password)) {
            console.log('new ');
            throw new Error('not valid');
        }
        this.email = email;
        this.password = password;
        this.name = name;
    }

    validateEmail(email: string) {
        return emailRegExp.test(email);
    }

    validatePassword(password: string) {
        // return passwordRegExp.test(password);
        return true;
    }

    toJSON() {
        return { email: this.email, password: this.password, name: this.name }
    }
}