import Lot from '../../types/lot';
import RoomType from '../../types/room-type';
import { useFormContext, useController } from 'react-hook-form';
import Box from '@mui/material/Box/Box';
import { Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import LotItem from '../lot-item/LotItem';
import { LotsEditorWrapperStyle, LotsListWrapperStyle } from './lib/lost-editor.style';
import { newLot } from '../../constants/new-lot';
import { v4 as uuidv4 } from 'uuid';


const LotsEditor = (): JSX.Element => {
    const { control, register, getFieldState } = useFormContext<RoomType>();
    const { field } = useController({
        control,
        name: 'lots',
    });

    const [lotsList, setLotsList] = useState<Lot[]>(field.value);

    const handleAddLot = () => {
        field.onChange([...field.value, { ...newLot, id: uuidv4() }]);
        setLotsList([...field.value, { ...newLot, id: uuidv4() }]);
    };

    const handleChangeField = (key: keyof Omit<Lot, 'id'>, id: string, value: string) => {
        const lotToChange = field.value.find(lot => lot.id === id);
        if (!!lotToChange) {
            console.log(lotToChange[key]);
            lotToChange[key] = value;
        }
    };

    const handleDeleteLot = (id: string) => {
        field.onChange([...field.value.filter(lot => lot.id !== id)]);
        setLotsList([...field.value.filter(lot => lot.id !== id)]);
    };

    return (
        <Box
            sx={LotsEditorWrapperStyle(getFieldState('lots').invalid)}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                    fontSize={20}
                    {...register('lots', {
                        validate: (value) => !!value.length || 'error message',
                    })}
                >
                    Добавить лот:
                </Typography>
                <Fab onClick={handleAddLot} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
            {!!lotsList.length && <Box sx={LotsListWrapperStyle}>
                {lotsList.map((lot) => <LotItem handleDeleteLot={handleDeleteLot} handleChangeField={handleChangeField} lot={lot} key={lot.id} />)}
            </Box>}
        </Box >
    );
};

export default LotsEditor;
