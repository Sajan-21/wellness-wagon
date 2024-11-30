import axios from 'axios';

async function FetchCategory() {
  try {
    let response = await axios.get('http://localhost:3000/categories');
    console.log('response:', response);
    // Map the data to extract categories
    const categories = response.data.data.map((item) => item.category);
    console.log('categories:', categories);
    return categories; // Return the data
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default FetchCategory;