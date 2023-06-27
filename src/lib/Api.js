import axios from 'axios'

export const ENDPOINTS = {
  register: { method: 'POST', url: '/register' },
  verifyAccount: { method: 'GET', url: '/verify-account' },
  login: { method: 'POST', url: '/login' },
  forgotPasswordRequest: {method: "POST", url: '/forgot-password-request'},
  resetPassword: {method: "POST", url: '/reset-password'},
  products: { method: 'GET', url: '/products' },
  newProduct: { method: 'POST', url: '/products' },
  categories: {method: 'GET', url: '/categories'},


}
const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

export const apiCall = async (endpoint, options = null) => {

  let data = {}
  
  if (options) {
    data = options.data
  }

  try {
    const response = await apiInstance({
      ...endpoint,
      data :data,
    })
    return response.data
  } catch (err) {
    return false
  }
}
