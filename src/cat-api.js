const url = 'https://api.thecatapi.com/v1/breeds';
const api_key =
  'live_6XgfHVWeHr1Vp0Qc9jpmIcMoHZ9L9uTquqcjtkyD5VB41vjdTvxGn1USKmOULZT9';
let storedBreeds = [];
let storedInfo = [];

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

export async function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/breeds/${breedId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const breedData = await response.json();
    renderCatInfo(breedData); // funkcja renderująca informacje o kocie na stronie
  } catch (error) {
    console.error('Error fetching cat by breed:', error);
  }
}

function renderCatInfo(catData) {
  const catInfoContainer = document.querySelector('.cat-info');
  catInfoContainer.innerHTML = '';

  const catImg = document.createElement('img');
  catImg.src = catData.image.url;
  catInfoContainer.appendChild(catImg);

  const description = document.createElement('p');
  description.textContent = catData.description;
  catInfoContainer.appendChild(description);

  const temperament = document.createElement('p');
  temperament.textContent = catData.temperament;
  catInfoContainer.appendChild(temperament);
}
