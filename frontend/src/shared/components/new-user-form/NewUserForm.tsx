import { Box, TextField, Button, SxProps } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewUserFormStyle: SxProps = {
    display: 'flex',
    flexDirection: "column",
    gap: 2,
};

type NewUserFormProps = {
    setOpen: React.Dispatch<boolean>;
    route: string;
};

export const NewUserForm = ({ setOpen, route }: NewUserFormProps) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setName(event.currentTarget.value);
    const handleCloseDialog = () => setOpen(false);
    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.setItem('userName', name);
        // setName('');
        event.currentTarget.value !== 'return' && navigate(route);
        setOpen(false);
    };
    return (
        <Box sx={NewUserFormStyle}>
            <TextField value={name} onChange={handleChangeName} label="Ваше имя" />
            <Button value={'return'} color="success" variant="outlined" onClick={handleSave}>Сохранить и вернуться</Button>
            <Button value={route} color="success" variant="outlined" onClick={handleSave}>Сохранить и войти</Button>
            <Button color="error" variant="outlined" onClick={handleCloseDialog}>Отменить</Button>
        </Box>
    );
};