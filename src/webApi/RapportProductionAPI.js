import config from '@/webApi/config.js';
import axios from 'axios';

//Todo Separa as WebAPI por Controler
  export default {
    ////////////////////////////RAPORT/////////////////////////////////////
    listRaport(){
        return new Promise(function(resolve, reject) {          
            axios.get(config.getAddress() + "api/Rapport/GetRapport").then(function (res) {
                resolve(JSON.parse(res.data));
              }).catch(function (err) {
                reject(err.data);
              })
        })
    },
    ////////////////////////PERSON/////////////////////////////////////////
    listPerson(q){
        console.log("aqui!55")          
        return new Promise(function(resolve, reject) {
            axios.get(config.getAddress() + "api/Person/GetPersonByName?q=" + q).then(function (res) {
              resolve(JSON.parse(res.data));
          }).catch(function (err) {
            reject(err.data);
          })
    })
    },
    //////////////////////////////MACHINE////////////////////////////////
    listMachine(){
      return new Promise(function(resolve, reject) {
          axios.get(config.getAddress() + "api/Machine/GetMachine").then(function (res) {
            resolve(JSON.parse(res.data));
            }).catch(function (err) {
              reject(err.data);
            })
      })
  },

    //////////////////////////////Shift////////////////////////////////
    listShift(){
      return new Promise(function(resolve, reject) {
          axios.get(config.getAddress() + "api/Shift/GetShift").then(function (res) {
            resolve(JSON.parse(res.data));
            }).catch(function (err) {
              reject(err.data);
            })
      })
  },
  }
