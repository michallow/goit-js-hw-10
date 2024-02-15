import axios from 'axios';
import {
  fetchBreeds,
  fetchCatByBreed,
  breedSelect,
  renderCatInfo,
  catInfo,
  error,
  hideLoader,
  showLoader,
} from './cat-api.js';

axios.defaults.headers.common['x-api-key'] =
  'live_6XgfHVWeHr1Vp0Qc9jpmIcMoHZ9L9uTquqcjtkyD5VB41vjdTvxGn1USKmOULZT9';

hideLoader();

function hideError() {
  error.style.display = 'none';
}

function showError(message) {
  error.textContent = message;
  error.style.display = 'block';
}

breedSelect.addEventListener('change', () => {
  const breedId = breedSelect.value;
  fetchCatByBreed(breedId)
    .then(cat => renderCatInfo([cat]))
    .catch(error => console.log('Error fetching cat by breed:', error));
});

fetchBreeds().catch(error => {
  console.error('Error fetching breeds:', error);
  showError('Oops! Something went wrong! Try reloading the page!');
});

hideError();
