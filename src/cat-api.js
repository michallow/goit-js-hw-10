const url = 'https://api.thecatapi.com/v1/breeds';
const api_key =
  'live_6XgfHVWeHr1Vp0Qc9jpmIcMoHZ9L9uTquqcjtkyD5VB41vjdTvxGn1USKmOULZT9';
let storedBreeds = [];

export const breedSelect = document.querySelector('.breed-select');
export const catInfo = document.querySelector('.cat-info');
export const loader = document.querySelector('.loader');
export const error = document.querySelector('.error');

const showLoader = () => {
  loader.classList.add('visible');
  document.querySelector('.cat-info').style.display = 'none';
};

const hideLoader = () => {
  loader.classList.remove('visible');
  loader.classList.add('hidden');
  document.querySelector('.cat-info').style.display = 'block';
};

export function fetchBreeds() {
  showLoader();

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
      hideLoader();
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
    });
}

export async function fetchCatByBreed(breedId) {
  showLoader();
  const selectedBreed = storedBreeds.find(breed => breed.id === breedId);
  if (!selectedBreed) {
    throw new Error(`Breed with id ${breedId} not found`);
  }
  hideLoader();
  return selectedBreed;
}

export async function renderCatInfo(cats) {
  const catInfoContainer = document.querySelector('.cat-info');
  const markup = cats
    .map(
      cat => `
            <div class="cat-item">
                <p><b>Name:</b> ${cat.name}</p>
                <p><b>Description:</b> ${cat.description}</p>
                <p><b>Temperament:</b> ${cat.temperament}</p>
                ${
                  cat.reference_image_id
                    ? `<img src="https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg" alt="Cat Image">`
                    : '<p>No image found</p>'
                }
            </div>
        `
    )
    .join('');

  catInfoContainer.innerHTML = markup;
}
