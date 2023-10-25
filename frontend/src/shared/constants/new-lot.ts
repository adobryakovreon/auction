import Lot from '../types/lot';

export const newLot: Omit<Lot, 'id'> = {
	name: 'Новый лот',
	startPrice: '50',
};
