const express = require('express');
const path = require('path');
const { initializeDataFile, readData, writeData } = require('./modules/fileHandler');

const app = express();
const PORT = 3000;


app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Initialize the data file
initializeDataFile();

// Utility methods
const getById = (arr, id) => arr.find(item => item.id === id);
const getIndexById = (arr, id) => arr.findIndex(item => item.id === id);

// Serve root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Read data for each request
app.use((req, res, next) => {
  const data = readData();
  req.data = data;
  next();
});

// Get Endpoints
app.get('/movies', (req, res) => {
  res.json(req.data.movies);
});

app.get('/series', (req, res) => {
  res.json(req.data.series);
});

app.get('/songs', (req, res) => {
  res.json(req.data.songs);
});

// Get by ID Endpoints
app.get('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = getById(req.data.movies, id);
  if (!movie) {
    res.status(404).json({ message: 'Movie not found' });
  } else {
    res.status(200).json(movie);
  }
});

app.get('/series/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const serie = getById(req.data.series, id);
  if (!serie) {
    res.status(404).json({ message: 'Series not found' });
  } else {
    res.status(200).json(serie);
  }
});

app.get('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const song = getById(req.data.songs, id);
  if (!song) {
    res.status(404).json({ message: 'Song not found' });
  } else {
    res.status(200).json(song);
  }
});

// Download image endpoint
app.get('/images/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'images', filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'Image not found' });
  }
  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(500).json({ message: 'Error downloading image' });
    }
  });
});

// POST Endpoints
app.post('/movies', (req, res) => {
  const { title, director, year, imagePath } = req.body;
  if (!title || !director || !year) {
    return res.status(400).json({ message: 'Please add all required fields: title, director, year' });
  }
  const data = readData();
  data.movies.push({ id: data.movies.length + 1, title, director, year, imagePath: imagePath || null });
  writeData(data);
  res.status(201).json(data.movies);
});

app.post('/series', (req, res) => {
  const { title, creator, year, imagePath } = req.body;
  if (!title || !creator || !year) {
    return res.status(400).json({ message: 'Please add all required fields: title, creator, year' });
  }
  const data = readData();
  data.series.push({ id: data.series.length + 1, title, creator, year, imagePath: imagePath || null });
  writeData(data);
  res.status(201).json(data.series);
});

app.post('/songs', (req, res) => {
  const { title, artist, genre, year, imagePath } = req.body;
  if (!title || !artist || !genre || !year) {
    return res.status(400).json({ message: 'Please add all required fields: title, artist, genre, year' });
  }
  const data = readData();
  data.songs.push({ id: data.songs.length + 1, title, artist, genre, year, imagePath: imagePath || null });
  writeData(data);
  res.status(201).json(data.songs);
});

// DELETE Endpoints
app.delete('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const index = getIndexById(data.movies, id);
  if (index === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  data.movies.splice(index, 1);
  writeData(data);
  res.status(200).json(data.movies);
});

app.delete('/series/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const index = getIndexById(data.series, id);
  if (index === -1) {
    return res.status(404).json({ message: 'Series not found' });
  }
  data.series.splice(index, 1);
  writeData(data);
  res.status(200).json(data.series);
});

app.delete('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const index = getIndexById(data.songs, id);
  if (index === -1) {
    return res.status(404).json({ message: 'Song not found' });
  }
  data.songs.splice(index, 1);
  writeData(data);
  res.status(200).json(data.songs);
});

// PUT Endpoints
app.put('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const movie = getById(data.movies, id);
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  const { title, director, year, imagePath } = req.body;
  if (title) movie.title = title;
  if (director) movie.director = director;
  if (year) movie.year = year;
  if (imagePath !== undefined) movie.imagePath = imagePath;
  writeData(data);
  res.status(200).json(data.movies);
});

app.put('/series/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const serie = getById(data.series, id);
  if (!serie) {
    return res.status(404).json({ message: 'Series not found' });
  }
  const { title, creator, year, imagePath } = req.body;
  if (title) serie.title = title;
  if (creator) serie.creator = creator;
  if (year) serie.year = year;
  if (imagePath !== undefined) serie.imagePath = imagePath;
  writeData(data);
  res.status(200).json(data.series);
});

app.put('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  const song = getById(data.songs, id);
  if (!song) {
    return res.status(404).json({ message: 'Song not found' });
  }
  const { title, artist, genre, year, imagePath } = req.body;
  if (title) song.title = title;
  if (artist) song.artist = artist;
  if (genre) song.genre = genre;
  if (year) song.year = year;
  if (imagePath !== undefined) song.imagePath = imagePath;
  writeData(data);
  res.status(200).json(data.songs);
});

// 404 Handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});