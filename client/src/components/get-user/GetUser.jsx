import axios from 'axios';

const GetUser = async (auth_id, token) => {
  console.log(token, auth_id);
  
  try {
    const response = await axios.get(`http://localhost:3000/user/${auth_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('response-getUser:', response);
    return response.data.data;
  } catch (error) {
    console.error('Error in GetUser:', error);
    return null;
  }
};

export default GetUser;