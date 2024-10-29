import axios from "axios";

export const api = axios.create({
    baseURL: 'https://ghostapis.com.br/api.php',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

