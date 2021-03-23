import { useState, useReducer } from 'react';
import Tile from './Tile/Tile';
import TileEditor from './TileEditor/TileEditor';
import './TileContainer.css';

const TileContainer = () => {
	const [content, setContent] = useState([
		{ title: 'hi', body: 'hello there', index: 0 },
		{ title: 'bye', body: 'goodbye now', index: 1 },
	]);
	const [index, setIndex] = useState(0);
	const [isVisible, toggleIsVisible] = useReducer(visible => !visible, false);

	const handleClose = contentIndex => {
		setIndex(contentIndex);
		toggleIsVisible();
	};
	const handleSave = inputContent => {
		const contentIndex = inputContent.index;
		setIndex(contentIndex);
		const newContent = [...content];
		newContent[contentIndex] = inputContent;
		setContent(newContent);
		toggleIsVisible();
	};

	const editor = (
		<TileEditor
			content={content[index]}
			visible={isVisible}
			setVisible={toggleIsVisible}
			onSave={handleSave}
			className='editor'
		/>
	);

	return (
		<>
			{editor}
			<div className='container'>
				{content.map(tile => (
					<Tile content={tile} onClick={handleClose} key={tile.index} />
				))}
			</div>
		</>
	);
};

export default TileContainer;
