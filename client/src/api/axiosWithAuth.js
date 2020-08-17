import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    console.log(`token is ${token}`);
    return axios.create({
        headers:{
            Authorization: token,
        }
    });
};