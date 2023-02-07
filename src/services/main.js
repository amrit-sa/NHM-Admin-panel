import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
class APIService {

    get(Url) {
      let token = '';
      const loginD = localStorage.getItem('userData');
      if(loginD){
        const adminData = JSON.parse(loginD);
        token = adminData.token;
      }
      const config = {
        headers:{
          Authorization: token,
        }
      };      
      return axios
        .get(API_URL + Url , config)
        .then((response) => {
          return response.data;
        }).catch((err)=>{
          if(err.response.statusText === "Unauthorized"){
            localStorage.clear();
            window.location.href('/login')
          }
        })
    }
  
    post(Url , getdata) {
     
      let token = '';
      const loginD = localStorage.getItem('userData');
      if(loginD){
        const adminData = JSON.parse(loginD);
        token = adminData.token;
      }
      const config = {
        headers:{
          Authorization: token,
        }
      };      

      return axios
        .post(API_URL + Url, getdata ,config  )
        .then((response) => {
          return response.data;
        }).catch((err)=>{
          if(err.response.statusText === "Unauthorized"){
            localStorage.clear();
            window.location.href('/login')
          }
        })
    }
}

export default new APIService();

