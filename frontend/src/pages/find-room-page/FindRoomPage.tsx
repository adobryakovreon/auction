import { Container, Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientRoutes } from '../../shared/constants/client-routes';

const FindRoomPage = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    navigate(`/${ClientRoutes.room}/${value}`);
  };

  return (
    <Container>
      <Box>
        <TextField value={value} onChange={(event) => setValue(event.currentTarget.value)} />
        <Button onClick={handleJoinRoom} >Зайти в комнату</Button>
      </Box>
    </Container>
  );
};

export default FindRoomPage;
