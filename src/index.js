import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

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

Notiflix.Notify.init({
  width: '350px',
  position: 'center-center',
  timeout: 5000,
  background: '#32c682',
  textColor: '#fff',

  warning: {
    background: '#e60000',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
});

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
    .catch(
      error =>
        Notiflix.Notify.warning('Error fetching cat by breed', hideLoader()),
      error
    );
});

fetchBreeds().catch(error => {
  console.error('Error fetching breeds:', error);
  showError('Oops! Something went wrong! Try reloading the page!');
});



hideError();
