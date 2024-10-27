import axios from "axios";

export const api = axios.create({
    baseURL: 'https://venomweb.site/api/consultas/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

