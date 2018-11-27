import config from '@/webApi/config.js';
import axios from 'axios';

  export default {
    listRaport(){
        return new Promise(function(resolve, reject) {
            console.log("aqui!",config.getAddress()+ "cliente/ListarRaports")          
            axios.get(config.getAddress() + "cliente/ListarRaports").then(function (res) {
                resolve(res.data);
              }).catch(function (err) {
                reject(err.data);
              })
        })
    },
    listPerson(q){
        console.log("aqui!55")          
        return new Promise(function(resolve, reject) {
            axios.get(config.getAddress() + "cliente/ListarClientes?q=" + q).then(function (res) {
            resolve(res.data);
          }).catch(function (err) {
            reject(err.data);
          })
    })
    },
  }
