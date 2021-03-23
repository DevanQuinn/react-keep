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
		setTitle(e.target.innerHTML);
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
				<IconButton style={{ float: 'right' }} onClick={closeEditor}>
					<CancelIcon />
				</IconButton>
				<h1
					contentEditable='true'
					suppressContentEditableWarning={true}
					onKeyUp={handleKeyUp}
				>
					{title}
				</h1>
				<RichText height='250' value={body} setBody={setBody} />
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
