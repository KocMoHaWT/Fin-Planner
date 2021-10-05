import { emailRegExp, passwordRegExp } from "../../../utils/regexp";

interface ILoginData {
    email: string;
    password: string;
}

export default class LoginData {
    public email;
    public password;
    constructor({ email, password }: ILoginData) {
        if (!this.validateEmail(email) || !this.validatePassword(password)) {
            throw new Error('not valid');
        }
        this.email = email;
        this.password = password;
    }

    validateEmail(email: string) {
        return emailRegExp.test(email);
    }

    validatePassword(password: string) {
        return passwordRegExp.test(password);
    }

    toJSON() {
        return { email: this.email, password: this.password }
    }
}