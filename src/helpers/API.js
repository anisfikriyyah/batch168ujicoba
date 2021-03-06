import axios from 'axios'
import apiconfig from '../configs/api.config.json'


const API = {
    login: async (username, password) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.LOGIN,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: username,
                password: password
            }
        }
        try {
            let result = await axios(option)
            return result.data
        } catch (error) {
            return error.response.data

        }
    },
    company: async(kode_buku, nama_buku, kode_pengarang, kode_penerbit, kode_type_buku)=>{
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "GET",
            headers: {
                "Authorization": token
            },
            data:{
                kode_buku: kode_buku,
                nama_buku: nama_buku,
                kode_pengarang: kode_pengarang,
                kode_penerbit: kode_penerbit,
                kode_type_buku: kode_type_buku
            }
        }
        try {
            let result = await axios(option)
            return result.data
        } catch(error){
            return error.response.data
        }
    }
}

export default API
