import { useState } from 'react';

const App = () => {
	const [image, setImage] = useState(null);
	const [value, setValue] = useState('');
	const [response, setResponse] = useState('');
	const [error, setError] = useState('');
	const url = 'http://localhost:8000';

	const surpriseOptions = [
		'Does the image has a whale?',
		'Does the image contain someone doing exercise?',
		'Is there any cat in the image?',
	];

	const surpriseMe = () => {
		const randomValue =
			surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
		setValue(randomValue);
	};

	const analyzeImage = () => {};

	const clearInput = () => {
		setImage(null);
		setValue('');
		setResponse('');
		setError('');
	};

	const uploadImage = async (e) => {
		const formData = new FormData();
		formData.append('file', e.target.files[0]);
		setImage(e.target.files[0]);
		e.target.value = null;

		try {
			const options = {
				method: 'POST',
				body: formData,
			};

			const response = await fetch(`${url}/upload`, options);
			const data = response.json();
		} catch (error) {}
	};

	return (
		<div cla ssName='App'>
			<section className='search-section'>
				<div className='image-container'>
					{image && <img src={URL.createObjectURL(image)} />}
				</div>

				<p className='extra-info'>
					<span>
						<label htmlFor='file'>Upoload an image</label>
						<input
							onChange={uploadImage}
							type='file'
							id='file'
							accept='image/*'
							hidden
						/>
					</span>
					to ask questions about.
				</p>
				<p>
					What do you want to know about the image?
					<button
						className='surprise-me'
						onClick={surpriseMe}
						disabled={response}
					>
						Surprise me
					</button>
				</p>
				<div className='input-container'>
					<input
						type='text'
						value={value}
						placeholder='What is in the image...'
						onChange={(e) => setValue(e.target.value)}
					/>
					{!response && !error && (
						<button onClick={analyzeImage}>Ask me</button>
					)}
					{(response || error) && (
						<button onClick={clearInput}>Clear</button>
					)}
				</div>

				{error && <p>{error}</p>}
				{response && <p>{response}</p>}
			</section>
		</div>
	);
};

export default App;
