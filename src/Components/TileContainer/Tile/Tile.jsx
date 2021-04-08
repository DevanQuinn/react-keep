import './Tile.css';

const Tile = ({ onClick, content }) => {
	return (
		<div onClick={() => onClick(content.index)}>
			<div className='tile-bkg'>
				<h1 className='tile-title'>{content.title}</h1>
				<p className='tile-body'>{content.body}</p>
			</div>
		</div>
	);
};

export default Tile;
