import { Box, Typography } from '@mui/material';
import RoomType from '../../types/room-type';

type RoomProps = {
  room: RoomType;
}

const Room = ({ room }: RoomProps): JSX.Element => {
  return (
    <Box>
      <Typography>{room.name}</Typography>
    </Box>
  );
};

export default Room;
