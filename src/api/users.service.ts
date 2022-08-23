import axios from 'axios'

/* export const usersService =async ({username, password}) => {
    console.log('credencials', username, password)
    await axios.post('http://172.108.1.24:18001/api/v1/auth/login', {username, password})
    .then( ({ data }) => {
        console.log(data);
    });
} */

export const usersService = axios.create({
    baseURL: 'http://172.108.1.24:18001/api/v1/'
});