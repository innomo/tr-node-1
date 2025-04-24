const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());
let movies = [
    { id: 1, title: 'Tsotsi', director: 'Gavin Hood', year: 2005 },
    { id: 2, title: 'District 9', director: 'Neill Blomkamp', year: 2009 },
    { id: 3, title: 'Mandela: Long Walk to Freedom', director: 'Justin Chadwick', year: 2013 },
    { id: 4, title: 'Inxeba', director: 'John Trengove', year: 2017 },
    { id: 5, title: 'Five Fingers for Marseilles', director: 'Michael Matthews', year: 2017 },
  ];
  
  let series = [
    { id: 1, title: 'Isidingo', creator: 'SABC', year: 1998 },
    { id: 2, title: 'Generations', creator: 'SABC', year: 1994 },
    { id: 3, title: '7de Laan', creator: 'SABC', year: 2000 },
    { id: 4, title: 'Blood & Water', creator: 'Netflix', year: 2020 },
    { id: 5, title: 'Rhythm City', creator: 'eTV', year: 2007 },
  ];
  
  let songs = [
    { id: 1, title: "Water", artist: "Kabza de Small", genre: "Amapiano", year: 2020 },
    { id: 2, title: "Umbayimbayi", artist: "Inkabi Zezwe (Sjava & Big Zulu)", genre: "Afropop", year: 2023},
    { id: 3, title: "iPlan", artist: "Dlala Thukzin ft. Zaba & Sykes", genre: "Amapiano", year: 2023},
    { id: 4, title: "Mangihlale", artist: "Casswell P ft. Lwami & Master KG", genre: "Amapiano", year: 2023}
];

let allData = {
    movies: movies,
    series:series,
    songs:songs
}
// Utility methods
getById = (arr, id) => {
    return arr.find(item => item.id === id);
  }
getIndexById = (arr, id) => {
    return arr.findIndex(item => item.id === id);
  }

app.get('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie =  getById(movies, id);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.status(200).json(movie);
    }
  });
// End of Utility methods

//Get Endpoints
app.get('/', (req, res) => {
    res.json(allData);
  });

app.get('/movies', (req, res) => {
    res.json(movies);
  });
  
  app.get('/series', (req, res) => {
    res.json(series);
  });
  
  app.get('/songs', (req, res) => {
    res.json(songs);
  });

// Get by Id endpoints

  app.get('/series/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const serie =  getById(series, id);
    if (!serie) {
        res.status(404).json({ message: 'Series not found' });
    } else {
        res.status(200).json(serie);
    }
  });
  
  app.get('/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const song =  getById(songs, id);
    if (!song) {
      res.status(404).json({ message: 'Song not found' });
    } else {
      res.status(200).json(song);
    }
  });

// POST endpoints
app.post('/movies', (req, res) => {
    const { title, director, year } = req.body;
    if (!title || !director || !year) {
      res.status(400).json({ message: 'Please add all required fields: title, director, year' });
    } else {
      movies.push({ id: movies.length + 1, title, director, year });
      res.status(201).json(movies);
    }
  });
  
  app.post('/series', (req, res) => {
    const { title, creator, year } = req.body;
    if (!title || !creator || !year) {
        res.status(400).json({ message: 'Please add all required fields: title, creator, year' });
    } else {
      series.push({ id: series.length + 1, title, creator, year });
      res.status(201).json(series);
    }
  });
  
  app.post('/songs', (req, res) => {
    const { title, artist,genre, year } = req.body;
    if (!title || !artist || !year || !genre) {
        res.status(400).json({ message: 'Please add all required fields: title, artist, year' });
    } else {
      songs.push({ id: songs.length + 1, title, artist, genre, year });
      res.status(201).json(songs);
    }
  });

// DELETE endpoints
app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = getIndexById(movies, id);
    if (index === -1) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      movies.splice(index, 1);
      res.status(200).json(movies);
    }
  });
  
app.delete('/series/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = getIndexById(series, id);
    if (index === -1) {
      res.status(404).json({ message: 'Series not found' });
    } else {
      series.splice(index, 1);
      res.status(200).json(series);
    }
  });
  
app.delete('/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = getIndexById(songs, id);
    if (index === -1) {
      res.status(404).json({ message: 'Song not found' });
    } else {
      songs.splice(index, 1);
      res.status(200).json(songs);
    }
  });

// PUT endpoints
app.put('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = getById(movies, id);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      const { title, director, year } = req.body;
      if (title) movie.title = title;
      if (director) movie.director = director;
      if (year) movie.year = year;
      res.status(200).json(movies);
    }
  });
  
  app.put('/series/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const serie = getById(series, id);
    if (!serie) {
      res.status(404).json({ message: 'Series not found' });
    } else {
      const { title, creator, year } = req.body;
      if (title) serie.title = title;
      if (creator) serie.creator = creator;
      if (year) serie.year = year;
      res.status(200).json(series);
    }
  });
  
  app.put('/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const song = getById(songs, id);
    if (!song) {
      res.status(404).json({ message: 'Song not found' });
    } else {
      const { title, artist,genre, year } = req.body;
      if (title) song.title = title;
      if (artist) song.artist = artist;
      if (genre) song.genre = genre;
      if (year) song.year = year;
      res.status(200).json(songs);
    }
  });

// 404 endpoint
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


