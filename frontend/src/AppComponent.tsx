import { Box, SxProps } from '@mui/material';
import './shared/styles/App.css';
import { LightColors } from './shared/styles/themes/light/light-colors';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ClientRoutes } from './shared/constants/client-routes';
import Homepage from './pages/homepage/Homepage';
import CreateRoomPage from './pages/create-room-page/CreateRoomPage';
import RoomPage from './pages/room-page/RoomPage';
import { useEffect, useContext } from 'react';
import { WebSocketContext } from './shared/context/web-socket-context/web-socket-context';
import FindRoomPage from './pages/find-room-page/FindRoomPage';

const AppStyle: SxProps = {
  backgroundColor: LightColors.lightGrey,
  height: '100vh',
};

function App() {
  const socket = useContext(WebSocketContext);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected!');
    });
    socket.on('createRoomWs', (data) => {
      console.log(data);
    });
    return () => {
      console.log('Unmounting, close connection');
      socket.off('connect');
      socket.off('createRoomWs');
    };
  }, []);

  return (
    <Box sx={AppStyle}>
      <BrowserRouter>
        <Routes>
          <Route path={ClientRoutes.Home} element={<Homepage />} />
          <Route
            path={ClientRoutes.CreateRoom}
            element={<CreateRoomPage />}
          />
          <Route path={ClientRoutes.FindRoom} element={<FindRoomPage />} />
          <Route path={`/room/:id`} element={<RoomPage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
