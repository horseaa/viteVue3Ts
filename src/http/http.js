// import Vue from 'vue'
import httpAxios from './httpAxios'
import { ElLoading } from 'element-plus'
// loading和请求失败重新请求
const http = {
    run(api, params, requestConfig = {}){
        // loading实例
        const loadingOptions = {
            background: 'black'
        }
        const loadingInstance = ElLoading.service(loadingOptions)
        let type = (requestConfig.hasOwnProperty('method') ? requestConfig.method : 'post').toLowerCase();
        return httpAxios[type](api, params, requestConfig).then((res) => {
            loadingInstance.close()
            return Promise.resolve(res.data);
        }, (err) => {
            loadingInstance.close()
            return Promise.reject(err);
        });
    }
}
export default http