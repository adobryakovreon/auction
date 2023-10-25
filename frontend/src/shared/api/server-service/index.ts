import axios, { AxiosError } from 'axios';
import RoomType from '../../types/room-type';

const $server = axios.create({
	baseURL: 'example.com',
	headers: {},
});

export const serverRoutes = {
	createUser: 'create_user',
	createRoon: 'create_room',
};

type UserDTO = {
	name: string;
};

export enum ErrorAnswers {
	BadRequest = 'user with this name already exist',
}

const serverService = {
	createUser: async (
		name: string
	): Promise<UserDTO | ErrorAnswers | string> => {
		try {
			const { data } = await $server.post(serverRoutes.createUser, {
				name,
			});
			return data;
		} catch (err: unknown) {
			const error = err as AxiosError;
			if (error.response?.status === 400) {
				return ErrorAnswers.BadRequest;
			}
			return error.response?.statusText || 'Unknown error!';
		}
	},

	createRoom: async (room: RoomType): Promise<string> => {
		return 'success';
	},
};

export default serverService;
