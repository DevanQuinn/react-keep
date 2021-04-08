import { useState, useReducer } from 'react';
import Tile from './Tile/Tile';
import TileEditor from './TileEditor/TileEditor';
import CreateTile from './Tile/CreateTile';
import Popup from './Popup/Popup';
import './TileContainer.css';
import { writeData } from '../../Firebase/Firebase';

const TileContainer = ({ userContent }) => {
	const [content, setContent] = useState(userContent || []);
	const [index, setIndex] = useState(0);
	const [isVisible, toggleIsVisible] = useReducer(visible => !visible, false);
	const [popupInfo, setPopupInfo] = useState({ open: false });

	const handleClose = contentIndex => {
		setIndex(contentIndex);
		toggleIsVisible();
	};
	const handleDelete = deleteIndex => {
		const filterContent = content.filter(data => data.index !== deleteIndex);
		filterContent.map((data, idx) => (data.index = idx));
		setContent(filterContent);
		writeData(filterContent);

		const info = {
			open: true,
			message: 'Title deleted.',
		};
		if (popupInfo.open) {
			setPopupInfo({ open: false, message: popupInfo.message });
			return setTimeout(() => setPopupInfo(info), 150);
		}
		setPopupInfo(info);
	};
	const handleSave = inputContent => {
		const contentIndex = inputContent.index;
		setIndex(contentIndex);
		const newContent = [...content];
		newContent[contentIndex] = inputContent;
		setContent(newContent);
		toggleIsVisible();
		writeData(newContent);
	};

	let editor = null;
	if (userContent)
		editor = (
			<TileEditor
				content={content[index] || null}
				visible={isVisible}
				setVisible={toggleIsVisible}
				onSave={handleSave}
				className='editor'
			/>
		);
	let tiles = null;
	tiles = (
		<div className='container'>
			{content?.map(tile => (
				<Tile
					content={tile}
					onClick={handleClose}
					key={tile.index}
					onDelete={handleDelete}
				/>
			))}
			<CreateTile content={content} setContent={setContent} />
		</div>
	);

	return (
		<>
			{editor}
			{tiles}
			<Popup info={popupInfo} setInfo={setPopupInfo} />
		</>
	);
};

export default TileContainer;
