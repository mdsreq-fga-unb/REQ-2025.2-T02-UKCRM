import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        // Pega o token de acesso do localStorage.
        const accessToken = localStorage.getItem('accessToken');
        
        // Se o token existir, adiciona ao cabeçalho 'Authorization'.
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        
        return config;
    },
    (error) => {
        // Em caso de erro na configuração da requisição, rejeita a promise.
        return Promise.reject(error);
    }
);

export default apiClient;
