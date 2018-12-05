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

  listShiftId(id){
    return new Promise(function(resolve, reject) {
        axios.get(config.getAddress() + "api/Shift/GetShiftId?id=" + id).then(function (res) {
          resolve(JSON.parse(res.data));
          }).catch(function (err) {
            reject(err.data);
          })
    })
},

  //////////////////////////////Arrets////////////////////////////////

  listArrets(){
    return new Promise(function(resolve, reject) {
        axios.get(config.getAddress() + "api/Arret/GetArrets").then(function (res) {
          resolve(JSON.parse(res.data));
          }).catch(function (err) {
            reject(err.data);
          })
    })
},

// deleteReservation(Id){
//   return new Promise(function(resolve,reject){
//       const params = new URLSearchParams();
//       params.append('Id', Id);
//       axios.post( config.getAddress() +'cliente/DelCli', params).then(function(res){
//           resolve('ok');
//       })
//       .catch(function(error){
//         reject('err');
   
//       });
//     })
// }


//////////////////////////////Temps////////////////////////////////

listTempsId(id){
  return new Promise(function(resolve, reject) {
      axios.get(config.getAddress() + "api/Temps/GetTempsId?id="+ id).then(function (res) {
        resolve(JSON.parse(res.data));
        }).catch(function (err) {
          reject(err.data);
        })
  })
},

////////////////////////////Rison///////////////////////////////


listRaison(){
  return new Promise(function(resolve, reject) {
      axios.get(config.getAddress() + "api/Raison/GetRaison").then(function (res) {
        resolve(JSON.parse(res.data));
        }).catch(function (err) {
          reject(err.data);
        })
  })
},


}
