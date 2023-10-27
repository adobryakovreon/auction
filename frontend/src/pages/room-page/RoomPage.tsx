import { useNavigate, useParams } from 'react-router-dom';
import RoomType from '../../shared/types/room-type';
import { observer } from 'mobx-react';
import { WebSocketContext } from '../../shared/context/web-socket-context/web-socket-context';
import { Suspense, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    socket.on(`sendRoom`, (joinedRoom: RoomType) => {
      setRoom(joinedRoom);
      joinedRoom.playersList && setUsers([...joinedRoom.playersList]);
    });

    setTimeout(() => socket.emit('joinRoom', { roomId, userName }), 2000);


    socket.on(`room_join`, ({ message, joinName }) => {
      console.log(message);
      setUsers([...users, joinName]);
    });

    socket.on('room_doesnt_exist', ({ message }) => {
      console.log(message);
    });

    socket.on(`room_leave`, ({ message, userName }) => {
      console.log(message);
      setUsers(users.filter(user => user !== userName));
    });

    return () => {
      socket.off('sendRoom');
      socket.off(`room_join`);
      socket.off(`room_leave`);
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
