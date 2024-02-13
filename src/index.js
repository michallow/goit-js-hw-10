import axios from 'axios';
import {
  fetchBreeds,
  fetchCatByBreed,
  breedSelect,
  renderCatInfo,
  catInfo,
} from './cat-api.js';

axios.defaults.headers.common['x-api-key'] =
  'live_6XgfHVWeHr1Vp0Qc9jpmIcMoHZ9L9uTquqcjtkyD5VB41vjdTvxGn1USKmOULZT9';

  breedSelect.addEventListener('change', () => {
    const breedId = breedSelect.value;
    fetchCatByBreed(breedId)
      .then(cat => renderCatInfo([cat]))
      .catch(error => console.log('Error fetching cat by breed:', error));
  });

fetchBreeds();
