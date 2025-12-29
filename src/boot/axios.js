import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'
import axiosInterceptor from 'src/util/axiosInterceptor'

// console.log("axios api url", process.env.API_SERVER)
const api = axios.create({ baseURL: process.env.API_SERVER });
api.interceptors.response.use(axiosInterceptor.res('API'));

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api, axios }
