import axios, { AxiosError } from "axios"

const $server = axios.create({
    baseURL: 'example.com',
    headers: {

    }
})

export const serverRoutes = {
    createUser: 'createUser'
}

type UserDTO = {
    name: string;
}

export enum ErrorAnswers {
    BadRequest = 'user with this name already exist'
}

export const serverService = {
    createUser: async (name: string): Promise<UserDTO | ErrorAnswers | string> => {
        try {
            const { data } = await $server.post(serverRoutes.createUser, { name });
            return data
        } catch (err: unknown) {
            const error = err as AxiosError;
            if (error.response?.status === 400) {
                return ErrorAnswers.BadRequest
            }
            return error.response?.statusText || 'Unknown error!'
        }
    }
}