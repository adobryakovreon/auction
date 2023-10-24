import { SxProps } from '@mui/material/styles';

export const createRoomPageContainerStyle: SxProps = {
	height: 'inherit',
	padding: 2,
};
export const newRoomFormWrapper: SxProps = {
	height: 'inherit',
	display: 'flex',
	alignitems: 'flex-start',
	justifyContent: 'flex-start',
	flexDirection: 'column',
	gap: 3,
	padding: 5,
};
export const halfColumnBoxStyle = (gap: number): SxProps => ({
	display: 'flex',
	flexDirection: 'column',
	gap: `${gap}px`,
	flexBasis: '50%',
});
export const flexRowStyle = { display: 'flex', gap: 1 };
export const submitButtonStyle: SxProps = {
	justifySelf: 'end',
	alignSelf: 'flex-end',
};
