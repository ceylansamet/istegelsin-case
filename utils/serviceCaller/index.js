const axios = require('axios');

let axiosInterceptor = null;

module.exports =  (base) => {
    const instance = axios.create({ baseURL: base });

    if (!!axiosInterceptor || axiosInterceptor === 0) {
        instance.interceptors.request.eject(axiosInterceptor);
    }

    axiosInterceptor = instance.interceptors.request.use(

        config => {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            return config;
        },
        error => {
            Promise.reject(error)
        });
    instance.interceptors.response.use((response) => {
        return response
    }, async function (error) {
        return Promise.reject(error);
    });

    return instance;
}