const PORT = 8000;
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage }).single('file');

let filepath;

app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.status(500).json(err);
		}
		filepath = req.file.path;
	});
});

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
