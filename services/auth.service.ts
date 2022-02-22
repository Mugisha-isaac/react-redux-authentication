import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";


class AuthService{
    logIn(username:string, password:string){
        return axios.post(API_URL + 'signin',{
            username,
            password
        }).then(response =>{
            if(response.data.accessToken){
                localStorage.setItem('user',JSON.stringify(response.data))
                return response.data;
            }
        })
    }

    logOut(){
        localStorage.removeItem('user');
    }

    register(username:string, email:string, password:string){
        return axios.post(API_URL + 'signup',{
            username,
            email,
            password
        })
    }

    getCurrentUser(){
        const user = localStorage.getItem('user');
        if(user) return JSON.parse(user);
        return null;
    }
}

export default new AuthService;