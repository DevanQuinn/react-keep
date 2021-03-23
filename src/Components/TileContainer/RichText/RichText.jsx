import './RichText.css';
import { useRef } from 'react';
import parse from 'html-react-parser';

const RichText = ({ width = 500, height = 500, value, setBody }) => {
	const contentArea = useRef();
	const boldButton = useRef();
	const italicButton = useRef();
	const underlineButton = useRef();
	const buttonList = useRef();

	const handleClick = e => {
		e.preventDefault();
		e.target.classList.toggle('selected');
		const cmd = e.target.dataset['command'];
		contentArea.current.focus();
		document.execCommand(cmd, true, null);
		setBody(contentArea.current.innerHTML);
	};

	const handleFocus = () => {
		setBody(contentArea.current.innerHTML);
		checkIf(boldButton);
		checkIf(italicButton);
		checkIf(underlineButton);
	};

	const checkIf = ref => {
		const cmd = ref.current.dataset['command'];

		const isActive = document.queryCommandState(cmd);
		if (isActive) ref.current.classList.add('selected');
		else ref.current.classList.remove('selected');
	};

	return (
		<div
			className='rich-text'
			style={{
				overflow: 'auto',
				width: `100%`,
				height: `${height}px`,
			}}
		>
			<ul className='rich-button-list' ref={buttonList}>
				<button
					onClick={handleClick}
					data-command='bold'
					ref={boldButton}
					style={{ fontWeight: 'bold' }}
				>
					B
				</button>
				<button
					onClick={handleClick}
					data-command='italic'
					ref={italicButton}
					style={{ fontStyle: 'italic' }}
				>
					I
				</button>
				<button
					onClick={handleClick}
					data-command='underline'
					ref={underlineButton}
					style={{ textDecoration: 'underline' }}
				>
					U
				</button>
			</ul>
			<div
				ref={contentArea}
				className='rich-text-content'
				contentEditable='true'
				suppressContentEditableWarning={true}
				onKeyDown={handleFocus}
				onClick={handleFocus}
				onKeyUp={handleFocus}
			>
				{value ? parse(value) : null}
			</div>
		</div>
	);
};

export default RichText;
