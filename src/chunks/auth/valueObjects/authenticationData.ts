import { emailRegExp, passwordRegExp } from "../../../utils/regexp";

interface IAuthData {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export default class AuthenticationData {
    public email;
    public password;
    public firstName;
    public lastName;

    constructor({ email, password, firstName, lastName }: IAuthData) {
        if (!this.validateEmail(email) || !this.validatePassword(password)) {
            throw new Error('not valid');
        }
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    validateEmail(email: string) {
        return emailRegExp.test(email);
    }

    validatePassword(password: string) {
        return passwordRegExp.test(password);
    }

    toJSON() {
        return { email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName}
    }
}