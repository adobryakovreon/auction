import { Box, SxProps } from '@mui/material'
import './shared/styles/App.css'
import { LightColors } from './shared/styles/themes/light/light-colors'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ClientRoutes } from './shared/constants/client-routes'
import Homepage from './pages/homepage/Homepage'
import CreateRoomPage from './pages/create-room-page/CreateRoomPage'

const AppStyle: SxProps = {
  backgroundColor: LightColors.lightGrey,
  height: '100vh',
}

function App() {
  return (
    <Box sx={AppStyle}>
      <BrowserRouter>
        <Routes>
          <Route path={ClientRoutes.Home} element={<Homepage/>}/>
          <Route path={ClientRoutes.CreateRoom} element={<CreateRoomPage/>}/>
        </Routes>
      </BrowserRouter>
    </Box>
  )
}

export default App
