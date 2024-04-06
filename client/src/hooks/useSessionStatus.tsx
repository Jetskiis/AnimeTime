"use server"
import { validateRequest } from "../actions/auth";

const getUser = async () => {
    const { user } = await validateRequest();
    return user;
}

export default getUser;