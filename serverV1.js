const http = require('http');

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
    { id: 2, title: "Umbayimbayi", artist: "Inkabi Zezwe (Sjava & Big Zulu)", genre: "Afropop", year: 2023 },
    { id: 3, title: "iPlan", artist: "Dlala Thukzin ft. Zaba & Sykes", genre: "Amapiano", year: 2023 },
    { id: 4, title: "Mangihlale", artist: "Casswell P ft. Lwami & Master KG", genre: "Amapiano", year: 2023 },
];

// Create server
const server = http.createServer((req, res) => {
    const { method, url } = req;
    let body = '';

    // POST/PUT/DELETE handler
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        res.setHeader('Content-Type', 'application/json');

        // Handle routes
        if (url === '/movies') {
            handleRequest(method, movies, body, res);
        } else if (url === '/series') {
            handleRequest(method, series, body, res);
        } else if (url === '/songs') {
            handleRequest(method, songs, body, res);
        } else if (url === '/' || url === '/all') {
            if (method === 'GET') {
                res.statusCode = 200;
                res.end(JSON.stringify({ movies, series, songs }));
            } else {
                res.statusCode = 405;
                res.end(JSON.stringify({ error: 'Method not allowed' }));
            }
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
    });
});

// Handle HTTP methods
function handleRequest(method, dataArray, body, res) {
    if (method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify(dataArray));
    } else if (method === 'POST') {
        try {
            const newItem = JSON.parse(body);
            newItem.id = dataArray.length + 1;
            dataArray.push(newItem);
            res.statusCode = 201;
            res.end(JSON.stringify(dataArray));
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    } else if (method === 'DELETE') {
        try {
            const { id } = JSON.parse(body);
            const index = dataArray.findIndex(item => item.id === id);
            if (index !== -1) {
                dataArray.splice(index, 1);
                res.statusCode = 200;
                res.end(JSON.stringify(dataArray));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Item not found' }));
            }
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    } else if (method === 'PUT') {
        try {
            const updatedItem = JSON.parse(body);
            const index = dataArray.findIndex(item => item.id === updatedItem.id);
            if (index !== -1) {
                dataArray[index] = { ...dataArray[index], ...updatedItem };
                res.statusCode = 200;
                res.end(JSON.stringify(dataArray));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Item not found' }));
            }
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    } else {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});