import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const submitRegistration = async (vendorData) => {
    try {
        console.log(vendorData)
        const response = await api.post('/registration',vendorData);
        const { token , vendor } = response.data;

        localStorage.setItem('token', token); 
        localStorage.setItem('user', JSON.stringify(vendor)); 

        return response
    } catch (error) {
        throw new Error("[ERROR] There was an error with the registration: " + error.message);
    }
}