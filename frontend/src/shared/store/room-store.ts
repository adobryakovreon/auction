import { makeAutoObservable } from 'mobx';
import RoomType from '../types/room-type';

class RoomStore {

  private _room: RoomType;
  
  constructor() {
    makeAutoObservable(this);
  }

  set activeRoom(room: RoomType) {
    this._room = { ...room };
  }

  get activeRoom(): RoomType{
    return this._room;
  }
}

export default new RoomStore();