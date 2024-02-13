const url = 'https://api.thecatapi.com/v1/breeds';
const api_key =
  'live_6XgfHVWeHr1Vp0Qc9jpmIcMoHZ9L9uTquqcjtkyD5VB41vjdTvxGn1USKmOULZT9';
let storedBreeds = [];

const fetchCatByBreedSelector = document.querySelector('breed-select');
const catInfo = document.querySelector('cat-info');

export function fetchBreeds() {
  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      storedBreeds = data;
      const breedSelect = document.querySelector('.breed-select');

      for (let i = 0; i < storedBreeds.length; i++) {
        const breed = storedBreeds[i];
        let option = document.createElement('option');
        option.value = breed.id;
        option.innerHTML = breed.name;
        breedSelect.appendChild(option);
      }
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
    });
}

fetchCatByBreedSelector.addEventListener('change', () => {
  const selectedBreedId = fetchCatByBreedSelector.value;
  fetchCatByBreed(selectedBreedId)
    .then(cat => renderCatInfo(cat))
    .catch(error => console.log('Error fetching cat by breed:', error));
});

export async function fetchCatByBreed(breedId) {
  const breedUrl = `https://api.thecatapi.com/v1/breeds/${breedId}`;
  return fetch(breedUrl, {
    headers: {
      'x-api-key': api_key,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderCatInfo(cat) {
  catInfo.innerHTML = `
      <p><b>Name:</b> ${cat.name}</p>
      <p><b>Description:</b> ${cat.description}</p>
      <p><b>Temperament:</b> ${cat.temperament}</p>
    `;
}
