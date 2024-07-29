import { useState } from 'react';

const App = () => {
	const [image, setImage] = useState(null);
	const url = 'http://localhost:8000';

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
			{image && <img src={URL.createObjectURL(image)} />}
			<label htmlFor='file'>Upoload an image</label>
			<input
				onChange={uploadImage}
				type='file'
				id='file'
				accept='image/*'
				hidden
			/>
		</div>
	);
};

export default App;
