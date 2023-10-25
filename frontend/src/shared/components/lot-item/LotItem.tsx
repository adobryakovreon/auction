import { Fab, TextField } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { useState } from 'react';
import { LightColors } from '../../styles/themes/light/light-colors';
import Lot from '../../types/lot';
import ClearIcon from '@mui/icons-material/Clear';

type LotItemProps = {
    lot: Lot;
    handleChangeField: (key: keyof Omit<Lot, 'id'>, id: string, value: string) => void;
    handleDeleteLot: (id: string) => void;
};

const LotItem = ({ lot, handleChangeField, handleDeleteLot }: LotItemProps): JSX.Element => {
    const [name, setName] = useState(lot.name);
    const [startPrice, setStartPrice] = useState(lot.startPrice);

    const handleChangeLotName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
        handleChangeField('name', lot.id, event.target.value);

    };

    const handleChangeLotStartPrice = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStartPrice(event.target.value);
        handleChangeField('startPrice', lot.id, event.target.value);
    };

    const removeLot = (event: React.MouseEvent<HTMLButtonElement>) => {
        handleDeleteLot(event.currentTarget.value);
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, border: '2px solid', borderColor: LightColors.darkerGrey, padding: 1, maxWidth: 'max-content', backgroundColor: LightColors.lightGrey, borderRadius: 2 }}>
            <TextField sx={{ backgroundColor: LightColors.darkGrey }} onChange={handleChangeLotName} size='small' label='Имя лота' defaultValue={name} />
            <TextField sx={{ backgroundColor: LightColors.darkGrey }} onChange={handleChangeLotStartPrice} type='number' size='small' label='Стартовая цена' defaultValue={startPrice} />
            <Fab onClick={removeLot} value={lot.id} color="error" size='small' aria-label="add">
                <ClearIcon />
            </Fab>
        </Box>
    );
};

export default LotItem;
