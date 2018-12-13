import axios from 'axios'
const baseUrl = BACKEND_URL+'/api/users'


const getUsers = async () => {
  const response = await axios.get(baseUrl)
  console.log('GetUSers response data: ', response.data)
  return response.data
}

export default { getUsers }