import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Popup = ({ info, setInfo }) => {
	const handleClose = () => setInfo({ open: false, message: info.message });
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			open={info.open}
			autoHideDuration={4000}
			onClose={handleClose}
			message={info.message || null}
			action={
				<>
					{/* <Button
						color='secondary'
						size='small'
						// onClick={ }
					>
						UNDO
					</Button> */}
					<IconButton
						size='small'
						aria-label='close'
						color='inherit'
						onClick={handleClose}
					>
						<CloseIcon fontSize='small' />
					</IconButton>
				</>
			}
		/>
	);
};

export default Popup;
