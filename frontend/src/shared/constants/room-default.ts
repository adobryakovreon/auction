import RoomType from '../types/room-type';

const defaultValues: Omit<RoomType, 'id'> = {
  name: 'New auction',
  host: localStorage.getItem('userName') || 'guest',
  lots: [],
  password: '',
  playersLimit: 4,
  startCash: 5000,
  turnTime: 30,
};

export default defaultValues;
