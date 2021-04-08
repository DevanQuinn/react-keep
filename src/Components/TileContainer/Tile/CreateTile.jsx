import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import '../Tile/Tile.css';

const CreateTile = ({ content, setContent }) => {
	const handleClick = () => {
		const newContent = [
			...content,
			{ title: 'New Tile', body: 'I am a new Tile', index: content.length },
		];
		setContent(newContent);
		console.log(newContent);
	};

	return (
		<div className='tile-create' onClick={handleClick}>
			<AddCircleOutlineIcon fontSize='large' />
		</div>
	);
};

export default CreateTile;
