let currentSection = 'movies';

// Show the selected section
function showSection(section) {
  document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
  document.getElementById(section).style.display = 'block';
  currentSection = section;
  fetchItems(section);
}

// Fetch and display items
async function fetchItems(section) {
  const response = await fetch(`/${section}`);
  const items = await response.json();
  const list = document.getElementById(`${section}-list`);
  list.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <div>
        ${item.imagePath ? `<img src="${item.imagePath}" alt="${item.title}">` : ''}
        <p><strong>${item.title}</strong> (${item.year})</p>
        ${section === 'movies' ? `<p>Director: ${item.director}</p>` : ''}
        ${section === 'series' ? `<p>Creator: ${item.creator}</p>` : ''}
        ${section === 'songs' ? `<p>Artist: ${item.artist} | Genre: ${item.genre}</p>` : ''}
      </div>
      <div>
        ${item.imagePath ? `<a href="/images/download/${item.imagePath.split('/').pop()}" download>Download Image</a>` : 'No Image'}
      </div>
    `;
    list.appendChild(div);
  });
}
fetchItems('movies');