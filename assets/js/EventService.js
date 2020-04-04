import axios from 'axios'

let baseURL = ''

if (process.env.NODE_ENV === 'development') {
  baseURL = process.env.STAGING_BASE_URL
} else if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.PRODUCTION_BASE_URL
}

const apiClient = axios.create({
  baseURL,
  withCredentials: false,
  timeout: 5000
})

export default {
  getProducts() {
    return apiClient.get('/products')
  },

  getProduct(slug) {
    return apiClient.get('/products/' + slug)
  }
}
