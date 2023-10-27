import { useNavigate, useParams } from 'react-router-dom';
import RoomType from '../../shared/types/room-type';
import { observer } from 'mobx-react';
import { WebSocketContext } from '../../shared/context/web-socket-context/web-socket-context';
import { useContext, useEffect } from 'react';
import Container from '@mui/material/Container/Container';
import Button from '@mui/material/Button/Button';

type RoomPageProps = {
    room: RoomType;
}

const RoomPage = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userName = localStorage.getItem('userName') || 'guest';
  const socket = useContext(WebSocketContext);
  useEffect(() => {
    socket.emit('joinRoom', { id, userName });
    socket.on(`room_${id}_join`, ({ message }) => {
      console.log(message);
    });

    socket.on(`room_${id}_message`, ({ message }) => {
      console.log(message);
    });
    return () => {
      socket.off('joinRoom');
      socket.off(`room_${id}_join`);
    };
  }, []);

  const handleDisconnect = () => {
    socket.emit('leaveRoom', id );
    navigate('/');
  };

  return (
    <Container>
      <Button onClick={handleDisconnect}>Покинуть комнату</Button>
    </Container>
  );
});

export default RoomPage;
