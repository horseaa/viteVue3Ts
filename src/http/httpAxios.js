// 1,引入，2设置环境，3，设置请求头，4，请求拦截，5，响应拦截 , 6 get,post
import axios from 'axios'; 

// 2
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = 'https://www.baidu.com';} 
// else if (process.env.NODE_ENV == 'debug') {    
//     axios.defaults.baseURL = 'https://www.ceshi.com';
// } 
// else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = 'https://www.production.com';
// }
axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/2590596-0-default'

// 3
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const instance = axios.create({
    headers: {
        'Content-type': 'application/json'
    }
});
// 4
// instance.interceptors.request.use(
//     config => {
//         return config
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )
// // 5
// instance.interceptors.response.use(
//     config => {
//         return config
//     },
//     error => {
//         return Promise.reject(error);
//     }
// )
const getUrl = (api) => {
    // return `${config.serverUrl}/mapi/${api}`;
    return api
}
const httpAxios = {
    get(api, params){    
        return new Promise((resolve, reject) => {
            instance.get(getUrl(api), {
                params
            }).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    },
    post(api, params) {
        return new Promise((resolve, reject) => {
            instance.post(getUrl(api), params).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
export default httpAxios