import axios from 'axios';

async function FetchCategory() {
  try {
    let response = await axios.get('http://localhost:3000/categories');
    console.log('response:', response);

    const categories = response.data.data.map((item) => item.category);
    console.log('categories:', categories);
    return categories;
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default FetchCategory;