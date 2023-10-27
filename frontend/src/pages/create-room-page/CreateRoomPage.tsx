import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from "@mui/material/Box/Box";
import Container from '@mui/material/Container/Container';
import Typography from '@mui/material/Typography/Typography';
import { useForm } from 'react-hook-form';
import FormWrapper from '../../shared/components/form-wrapper/FormWrapper';
import LotsEditor from '../../shared/components/lots-editor/LotsEditor';
import defaultValues from '../../shared/constants/room-default';
import RoomType from '../../shared/types/room-type';
import { createRoomPageContainerStyle, newRoomFormWrapper, flexRowStyle, halfColumnBoxStyle, submitButtonStyle } from './lib/create-room-page.style';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ClientRoutes } from '../../shared/constants/client-routes';
import { useContext } from 'react';
import { WebSocketContext } from '../../shared/context/web-socket-context/web-socket-context';

const CreateRoomPage = () => {
  const navigate = useNavigate();
  const methods = useForm<RoomType>({
    defaultValues: { ...defaultValues, id: uuidv4() }
  });
  const {
    register,
    getFieldState,
    formState: { errors },
  } = methods;

  const socket = useContext(WebSocketContext);

  const save = (room: RoomType) => {
    room.host = localStorage.getItem('userName') || 'guest';
    socket.emit('createRoomWs', { room });
    navigate(`/${ClientRoutes.room}/${room.id}`);
  };

  return (
    <FormWrapper methods={methods} onSubmit={save}>
      <Container sx={createRoomPageContainerStyle}>
        <Typography>
          Новая комната аукциона
        </Typography>
        <Box sx={newRoomFormWrapper}>
          <Box sx={flexRowStyle}>
            <Box sx={halfColumnBoxStyle(10)}>
              <TextField
                sx={{ alighSelf: 'flex-start', width: '500px' }}
                variant='outlined'
                type='text'
                label='Имя комнаты'
                {...register('name', {
                  required: 'Введите название комнаты',

                })}
                helperText={getFieldState('name').error?.message}
                error={getFieldState('name').invalid}
              />
              <TextField
                sx={{ width: '500px' }}
                variant='outlined'
                type='password'
                label='Пароль от комнаты'
                {...register('password')}
                helperText={getFieldState('password').error?.message}
              />
            </Box>
            <Box sx={halfColumnBoxStyle(10)}>
              <FormControl>
                <InputLabel id="playersLimit">Число игроков</InputLabel>
                <Select
                  labelId="playersLimit"
                  label="Число игроков"
                  defaultValue={4}
                  variant='outlined'
                  {...register('playersLimit')}
                >
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </Select>
              </FormControl>

              <TextField
                variant='outlined'
                type='number'
                label='Денег на старте'
                {...register('startCash', {
                  min: {
                    value: 1,
                    message: 'Поле не может быть нулевым'
                  },
                  max: {
                    value: 1000000,
                    message: 'Поле не может превышать 1000000'
                  },
                  required: 'Это поле обязательно'
                })}
                helperText={getFieldState('startCash').error?.message}
                error={getFieldState('startCash').invalid}
              />
            </Box>

          </Box>
          <Box sx={flexRowStyle}>
            <Box sx={halfColumnBoxStyle(10)}>
              <LotsEditor />
            </Box>
            <Box sx={halfColumnBoxStyle(10)}>
              <TextField
                variant='outlined'
                type='number'
                label='Секунд на ход'
                {...register('turnTime', {
                  min: {
                    value: 30,
                    message: 'Поле не может меньше 30 секунд'
                  },
                  max: {
                    value: 1000000,
                    message: 'Поле не может превышать 600 секунд'
                  },
                  required: 'Это поле обязательно'
                })}
                helperText={getFieldState('turnTime').error?.message}
                error={getFieldState('turnTime').invalid}
              />
            </Box>
          </Box>
          <Button sx={submitButtonStyle} type='submit' variant='contained'>Создать</Button>
        </Box>
      </Container>
    </FormWrapper>
  );
};

export default CreateRoomPage;