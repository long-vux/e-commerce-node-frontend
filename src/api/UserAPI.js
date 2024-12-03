import axios from '../utils/axiosInstance'

const apiUrl = process.env.REACT_APP_API_URL

const token = sessionStorage.getItem('user');
const userApi = {

  updateUser: data => axios.put(`${apiUrl}api/user/updateProfile`, data, {})
}

export default userApi
