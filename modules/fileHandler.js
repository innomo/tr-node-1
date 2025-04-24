const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/data.json');

const initialData = {
  movies: [
    { id: 1, title: 'Tsotsi', director: 'Gavin Hood', year: 2005, imagePath: 'images/movie.jpg' },
    { id: 2, title: 'District 9', director: 'Neill Blomkamp', year: 2009, imagePath: 'images/movie.jpg' },
    { id: 3, title: 'Mandela: Long Walk to Freedom', director: 'Justin Chadwick', year: 2013, imagePath: 'images/movie.jpg' },
    { id: 4, title: 'Inxeba', director: 'John Trengove', year: 2017, imagePath: 'images/movie.jpg' },
    { id: 5, title: 'Five Fingers for Marseilles', director: 'Michael Matthews', year: 2017, imagePath: 'images/movie.jpg' },
  ],
  series: [
    { id: 1, title: 'Isidingo', creator: 'SABC', year: 1998, imagePath: 'images/series.jpg' },
    { id: 2, title: 'Generations', creator: 'SABC', year: 1994, imagePath: 'images/series.jpg' },
    { id: 3, title: '7de Laan', creator: 'SABC', year: 2000, imagePath: 'images/series.jpg' },
    { id: 4, title: 'Blood & Water', creator: 'Netflix', year: 2020, imagePath: 'images/series.jpg' },
    { id: 5, title: 'Rhythm City', creator: 'eTV', year: 2007, imagePath: 'images/series.jpg' },
  ],
  songs: [
    { id: 1, title: "Water", artist: "Kabza de Small", genre: "Amapiano", year: 2020, imagePath: 'images/song.jpg' },
    { id: 2, title: "Umbayimbayi", artist: "Inkabi Zezwe (Sjava & Big Zulu)", genre: "Afropop", year: 2023, imagePath: 'images/song.jpg' },
    { id: 3, title: "iPlan", artist: "Dlala Thukzin ft. Zaba & Sykes", genre: "Amapiano", year: 2023, imagePath: 'images/song.jpg' },
    { id: 4, title: "Mangihlale", artist: "Casswell P ft. Lwami & Master KG", genre: "Amapiano", year: 2023, imagePath: 'images/song.jpg' }
  ]
};

  // Create file if it doesn't exist
  const initializeDataFile = () => {
    if (!fs.existsSync(path.dirname(DATA_FILE))) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    }
  
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      console.log('Data file created successfully');
    }
  };

  
// Read data from the file
const readData = () => {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading data file:', error);
      return initialData;
    }
  };

// Write data to the file
const writeData = (data) => {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing to data file:', error);
      throw new Error('Failed to write to data file');
    }
  };

  module.exports = {
    initializeDataFile,
    readData,
    writeData
  };