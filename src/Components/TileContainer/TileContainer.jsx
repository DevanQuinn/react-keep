import { useState, useReducer } from 'react';
import Tile from './Tile/Tile';
import TileEditor from './TileEditor/TileEditor';
import './TileContainer.css';

const TileContainer = ({ userContent }) => {
	const [content, setContent] = useState(userContent || []);
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

	let editor = null;
	if (userContent)
		editor = (
			<TileEditor
				content={userContent[index] || null}
				visible={isVisible}
				setVisible={toggleIsVisible}
				onSave={handleSave}
				className='editor'
			/>
		);
	let tiles = null;
	tiles = (
		<div className='container'>
			{userContent?.map(tile => (
				<Tile content={tile} onClick={handleClose} key={tile.index} />
			))}
		</div>
	);

	return (
		<>
			{editor}
			{tiles}
		</>
	);
};

export default TileContainer;
