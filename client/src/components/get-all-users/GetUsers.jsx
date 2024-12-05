import axios from 'axios';

async function GetUsers(token, user_type) {
    try {
        let response = await axios({
            method : "GET",
            url : `http://localhost:3000/users/${user_type}`,
            headers : {Authorization : `Bearer ${token}`}
        });
        console.log("response of fetching users : ",response);
        return response.data.data;
    } catch (error) {
        console.log("error while fetching users : ",error);
        return [];
    }
}

export default GetUsers