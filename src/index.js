import axios from 'axios';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

axios.defaults.headers.common['x-api-key'] =
  'live_6XgfHVWeHr1Vp0Qc9jpmIcMoHZ9L9uTquqcjtkyD5VB41vjdTvxGn1USKmOULZT9';

const breedSelect = document.querySelector('.breed-select');
const breedId = breedSelect.value;

fetchBreeds();

// .then(breeds => {
//   const breedSelect = document.querySelector('.breed-select');
//   const loader = document.querySelector('.loader');

//   loader.style.display = 'none';

//   breeds.forEach(breed => {
//     const option = document.createElement('option');
//     option.value = breed.id;
//     option.textContent = breed.name;
//     breedSelect.appendChild(option);
//   });
// })
// .catch(error => {
//   const errorText = document.querySelector('.error');
//   errorText.style.display = 'block';
//   console.error('Error fetching breeds:', error);
// });

fetchCatByBreed(breedId);
