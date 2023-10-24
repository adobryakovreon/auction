import { SxProps } from '@mui/material/styles';
import { LightColors } from '../../../styles/themes/light/light-colors';

export const LotsEditorWrapperStyle = (invalid: boolean): SxProps => ({
	display: 'flex',
	flexDirection: 'column',
	gap: 3,
	padding: 1,
	border: '2px',
	borderRadius: 2,
	boxShadow: `0px 0px 0px 3px ${
		invalid ? LightColors.error : LightColors.lightGrey
	} inset`,
	transition: 2,
});

export const LotsListWrapperStyle = {
	display: 'flex',
	flexDirection: 'column',
	gap: 1,
	backgroundColor: LightColors.darkGrey,
	borderRadius: 3,
	padding: 1,
};
