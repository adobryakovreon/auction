import Lot from '../lot';

type RoomType = {
	id: string;
	name: string;
	lots: Lot[];
	password: string;
	turnTime: number;
	host: string;
	playersLimit: number;
	startCash: number;
};

export default RoomType;
