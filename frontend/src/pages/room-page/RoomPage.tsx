import { useNavigate, useParams } from 'react-router-dom';
import RoomType from '../../shared/types/room-type';
import { observer } from 'mobx-react';
import { WebSocketContext } from '../../shared/context/web-socket-context/web-socket-context';
import { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import Container from '@mui/material/Container/Container';
import Button from '@mui/material/Button/Button';
import Room from '../../shared/components/room/Room';
import defaultValues from '../../shared/constants/room-default';

type RoomPageProps = {
  room: RoomType;
}

const RoomPage = observer(() => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const userName = localStorage.getItem('userName') || 'guest';
  const socket = useContext(WebSocketContext);
  const [room, setRoom] = useState<RoomType>({ ...defaultValues, id: '0' });
  const [users, setUsers] = useState<string[]>([userName]);


  const handleInviteAccepted = useCallback(
    (joinedRoom: RoomType) => {
      console.log('handleInviteAccepted');
      setRoom(joinedRoom);
      joinedRoom.playersList && setUsers([...joinedRoom.playersList]);
    //   join && socket.emit('sendName', { userName, roomId });
    },
    []
  );

  const handleSendRequest = useCallback(() => {
    socket.emit('JOIN_REQUEST', { roomId, userName });
  }, []);

  const handleUserJoinRoom = useCallback(({ message, joinName }: { message: string, joinName: string }) => {
    console.log(message);
    setUsers([...users, joinName]);
  }, []);

  const handleUserLeaveRoom = useCallback(({ message, joinName }: { message: string, joinName: string }) => {
    console.log(message);
    const newUsers = users.filter(user => user !== joinName);
    setUsers(newUsers);
  }, []);

  
  useEffect(() => {
    handleSendRequest();
    socket.on(`JOIN_REQUEST_ACCEPTED`, handleInviteAccepted);

    socket.on(`room_join`, handleUserJoinRoom);

    socket.on(`room_leave`, handleUserLeaveRoom);


    socket.on('room_doesnt_exist', ({ message }) => {
      console.log(message);
    });

    

    return () => {
      socket.off('JOIN_REQUEST_ACCEPTED');
      socket.off(`room_join`);
      socket.off(`room_leave`);
      socket.off('room_doesnt_exist');
      socket.emit('leaveRoom', {
        roomId,
        userName
      });
    };
  }, []);

  const handleDisconnect = () => {
    navigate('/');
  };

  return (
    <Container>
      <ul>
        {users.map(user =>
          <h4>{user}</h4>
        )}
      </ul>
      <Suspense fallback={<>loading...</>} >
        <Room room={room} />
      </Suspense>
      <Button onClick={handleDisconnect}>Покинуть комнату</Button>
    </Container>
  );
});

export default RoomPage;
