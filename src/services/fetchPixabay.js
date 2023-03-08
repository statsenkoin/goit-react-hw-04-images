import axios from 'axios';
import { pixabayConstants } from 'constants';

const { API_KEY, PER_PAGE } = pixabayConstants;
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PER_PAGE,
};

/**
 *
 * @param {String} query - userInput
 * @param {Number} page - requested page
 * @returns array of objects or error message
 * response.data = {total: 1159760, totalHits: 500, hits: Array(12)}
 */
export default async function fetchPixabay(query, page) {
  const response = await axios.get(`?q=${query}&page=${page}`);
  return response.data;
}
