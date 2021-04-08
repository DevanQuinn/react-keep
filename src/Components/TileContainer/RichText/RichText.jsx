import './RichText.css';

const RichText = ({ width = 500, height = 500, value, setBody, visible }) => {
	return (
		<div
			className='rich-text'
			style={{
				overflow: 'auto',
				width: `${width}px`,
				height: `${height}px`,
			}}
		>
			<textarea
				defaultValue={value}
				onInput={e => setBody(e.target.value)}
				className='rich-text-content'
			></textarea>
		</div>
	);
};

export default RichText;
