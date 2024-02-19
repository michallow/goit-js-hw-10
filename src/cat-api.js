const url = 'https://api.thecatapi.com/v1/breeds';
const api_key =
  'live_6XgfHVWeHr1Vp0Qc9jpmIcMoHZ9L9uTquqcjtkyD5VB41vjdTvxGn1USKmOULZT9';
let storedBreeds = [];
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

export const breedSelect = document.querySelector('.breed-select');
export const catInfo = document.querySelector('.cat-info');
export const loader = document.querySelector('.loader');
export const error = document.querySelector('.error');

export const showLoader = () => {
  loader.classList.add('visible');
  document.querySelector('.cat-info').style.display = 'none';
};

export const hideLoader = () => {
  loader.classList.remove('visible');
  loader.classList.add('hidden');
  document.querySelector('.cat-info').style.display = 'block';
};

export function fetchBreeds() {
  if (url !== 'https://api.thecatapi.com/v1/breeds') {
    showError('Invalid URL.');
    return;
  }

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
    .then(() => {
      const slim = new SlimSelect({
        select: '#selectElement',
        settings: { placeholderText: 'Select Breed' },
      });
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
    })
    .finally(() => {
      const catInfo = document.querySelector('.cat-info');
      catInfo.style.display = 'none';
    });
}

export async function fetchCatByBreed(breedId) {
  const selectedBreed = storedBreeds.find(breed => breed.id === breedId);
  if (!selectedBreed) {
    throw new Error(`Breed with id ${breedId} not found`);
  }
  return selectedBreed;
}

export async function renderCatInfo(cats) {
  showLoader();
  const catInfoContainer = document.querySelector('.cat-info');
  catInfoContainer.style.display = 'flex';

  const imagePromises = cats.map(cat => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`;
      image.onload = () => resolve(image);
      image.onerror = reject;
    });
  });

  const images = await Promise.all(imagePromises);

  const markup = cats
    .map((cat, index) => {
      return `
      <div class="cat-item">
        <p class="cat-desc"><span class="cat-section">Name</span>:<br> ${cat.name}</p>
        <p class="cat-desc"><span class="cat-section">Description</span>:<br> ${cat.description}</p>
        <p class="cat-desc"><span class="cat-section">Temperament</span>:<br> ${cat.temperament}</p>
        
      </div>
      <div class="cat-image-box">
      <img class="cat-image" src="${images[index].src}" alt="Cat Image">
      </div>
    `;
    })
    .join('');
  hideLoader();
  catInfoContainer.innerHTML = markup;
  catInfoContainer.style.display = 'flex';
}
