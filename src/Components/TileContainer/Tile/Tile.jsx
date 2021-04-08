import './Tile.css';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const Tile = ({ onClick, content, onDelete }) => {
	const [hover, setHover] = useState(false);
	const handleDelete = () => onDelete(content.index);

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{hover ? (
				<div className='delete-button' onClick={handleDelete}>
					<IconButton>
						<DeleteForeverIcon color='secondary' />
					</IconButton>
				</div>
			) : null}
			<div className='inner-container' onClick={() => onClick(content.index)}>
				<div className='tile-bkg'>
					<h1 className='tile-title'>{content.title}</h1>
					<p className='tile-body'>{content.body}</p>
				</div>
			</div>
		</div>
	);
};

export default Tile;
