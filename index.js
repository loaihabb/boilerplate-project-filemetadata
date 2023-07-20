const express = require('express');
const multer = require('multer');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
// Set up Multer middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Handle the file upload and return file metadata
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Please upload a file.' });
  } else {
    const fileMetadata = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    };
    res.json(fileMetadata);
  }
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
