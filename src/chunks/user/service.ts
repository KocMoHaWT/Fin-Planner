import { Response, Request } from "express";
import User, { IUser } from "./user";
import UserRepository, { IUserRepository } from "./repository";

import { CustomRequest } from "../../interfaces/request";
import InjectableContainer from "../../application/InjectableContainer";
import AuthData from "../auth/valueObjects/authenticationData";

export interface IUserService {
    create: (body: AuthData) => Promise<User>;
    updateUser: (currentUser: User, updatedUser: Partial<User>) => Promise<IUser>;
    getUser: (id: number) => Promise<User>;
    sendUserToFront: (user: User) => IUser;
    verifyUser: (email: string, password: string) => Promise<User>;
    isUserExists: (email: string) => Promise<boolean>;
}

export class UserService {
    private repository;
    constructor({ userRepository }: { userRepository: IUserRepository }) {
        this.repository = userRepository;
    }

    async create(body: AuthData) {
        await this.repository.create(body);
        const user = await this.repository.findByEmail(body.email);
        return user;
    }

    async updateUser(currentUser: User, updatedUser: Partial<User>): Promise<IUser> {
        currentUser.set(updatedUser);
        const user = await this.repository.update(currentUser);
        return user.toJSON();
    }

    async getUser(id: number) {
        const result = await this.repository.findById(id);
        return result;
    }

    sendUserToFront(user: User): IUser {
        if (!user) return null;
        return user.toJSON();
    }

    async verifyUser(email: string, password: string) {
        return this.repository.verifyUser(email, password);
    }

    async isUserExists(email: string) {
        return this.repository.isUserExists(email);
    }
}

const init = new Promise(() => {
    InjectableContainer.setDependency(UserService, 'userService', ['userRepository']);
});

export default init;