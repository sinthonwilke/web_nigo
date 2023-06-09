import axios from 'axios';
import { logoutUrl } from './apiList';

const logout = (navigate) => {
    axios.get(logoutUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
        .then(response => {
            localStorage.clear();
            window.location.href = '/login';
        })
        .catch(error => {
            console.log(error);
        });
};

export default logout;
