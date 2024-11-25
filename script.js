// Sample data URL (Replace this with your actual JSON file URL if needed)
const dataUrl = 'birthday_preferences.json';

let birthdayData = [];
const searchInput = document.getElementById('searchInput');
const autocompleteList = document.getElementById('autocompleteList');
const resultDiv = document.getElementById('result');

// Fetch JSON data
fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
        birthdayData = data;
    })
    .catch(error => console.error('Error loading JSON data:', error));

// Autocomplete function
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    autocompleteList.innerHTML = '';

    if (query.length === 0) return;

    const matches = birthdayData.filter(person =>
        person.name.toLowerCase().includes(query)
    );

    matches.forEach(person => {
        const item = document.createElement('div');
        item.classList.add('autocomplete-item');
        item.textContent = person.name;
        item.addEventListener('click', () => displayDetails(person));
        autocompleteList.appendChild(item);
    });
});

// Display details function
function displayDetails(person) {
    searchInput.value = person.name;
    autocompleteList.innerHTML = '';

    const { birthday, favorite_treat, gift_preference } = person;

    resultDiv.innerHTML = `
        <h2>${person.name}</h2>
        <p><strong>Birthday:</strong> ${birthday}</p>
        <p><strong>Favorite Treat:</strong> ${favorite_treat}</p>
        <p><strong>Gift Preference:</strong> ${gift_preference}</p>
    `;
}
