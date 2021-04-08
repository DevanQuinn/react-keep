import { useRef, useState, useEffect } from 'react';
import './TileEditor.css';
import RichText from '../RichText/RichText';
import { Button, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const TileEditor = ({ visible, content, onSave, setVisible }) => {
	const editor = useRef();
	const [title, setTitle] = useState();
	const [body, setBody] = useState();

	useEffect(() => {
		if (!content) return;
		setTitle(content.title);
		setBody(content.body);
	}, [content]);

	const closeEditor = () => {
		setVisible();
	};

	const handleKeyUp = e => {
		setTitle(e.target.value);
	};

	const handleSave = () => {
		const newContent = content;
		newContent.title = title;
		newContent.body = body;
		newContent.index = content.index;
		onSave(newContent);
	};
	return (
		<div ref={editor} style={{ display: visible ? 'block' : 'none' }}>
			<div className='background' onClick={closeEditor}></div>
			<div className='foreground'>
				<IconButton
					style={{
						position: 'absolute',
						right: '0',
						zIndex: '5',
					}}
					onClick={closeEditor}
				>
					<CancelIcon fontSize='large' />
				</IconButton>
				<div className='title-container'>
					<input
						defaultValue={title}
						onInput={handleKeyUp}
						className='title'
					></input>
				</div>

				{visible ? (
					<RichText
						height='250'
						value={content.body}
						setBody={setBody}
						visible={visible}
					/>
				) : null}

				<Button
					color='secondary'
					variant='contained'
					style={{ borderRadius: '0', width: '100%' }}
					onClick={handleSave}
				>
					Save
				</Button>
			</div>
		</div>
	);
};

export default TileEditor;
