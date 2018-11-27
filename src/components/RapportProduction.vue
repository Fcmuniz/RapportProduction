<template>
   <div id="app" style="padding:20px;margin-top:50px">    
            <v-app id="inspire" style="  width:100%;">
               <div style="width:200px; margin-left:400px;margin-top:0px;position:absolute">
                
               </div>
               <div>
                  <v-btn color="info" slot="activator" v-on:click="Ative(show = !show)" dark class="mb-2">Ajouter un nouveau </v-btn>
                  <div style="margin-left:80%;width:250px;margin-top:-53px">
                     <v-text-field label="Recherche" class="form-control medium"  append-icon="search"  single-line
        v-model="search"></v-text-field>
                  </div>
               </div>
               <v-data-table :headers="headers"
                  :items="values"
                  :search="search">
                  <template slot="items" slot-scope="props" >
                     <td>{{ props.item.Date }}</td>
                     <td>{{ props.item.MachineID }}</td>
                     <td class="text-xs-center">{{ props.item.Shift }}</td>
                     <td class="text-xs-center">{{ props.item.Efficacite }}</td>
                     <td>
                        <v-icon small
                           class="mr-2"
                           v-on:click="editItem(props.item.id,1)">
                           edit
                        </v-icon>
                        <v-icon small
                           v-on:click="deleteItem(props.item.id,0)">
                           delete
                        </v-icon>
                     </td>
                  </template>
                  <template slot="no-data">
                  </template>
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                     Your search for "{{ search }}" found no results.
                  </v-alert>
               </v-data-table>
            </v-app>
         </div>  
</template>
<style>
   .toptable {
   background: #B0D5F5;
   text-align: center;
   }
   .containerValues {
   margin: auto;
   width: 80%;
   background: #fff;
   border: 3px solid #fff;
   padding: 10px;
   margin-top:40px;
   }
   .fade-enter-active, .fade-leave-active {
   transition: opacity .5s
   }
   .fade-enter, .fade-leave-to {
   opacity: 0
   }
</style>
<script>
   //  import messes from '@/webapi/Messes.js';
      import raportProduction from '@/webApi/RapportProductionAPI.js';
     export default {
    
      data: () => ({
         Machine:null,
        menuDate:false,
        show: true,
        valid: true,
        btnDisable: true,
        search: '',      
        seenSave:true ,
        seenUpdate:false,  
        itemsMachine:[],   
        headers: [
          { text: 'Date', value: 'Date',  class: 'toptable' },
          { text: 'Machine', value: 'Machine', class: 'toptable' },
          { text: 'Shift', value: 'Shift',  class: 'toptable',align: 'center', },
          { text: 'Efficacité du shift (%) ', value: 'Efficiency', align: 'center', class: 'toptable' },      
          { text: 'Action', value: 'action', align: 'left', class: 'toptable', sortable: false }
        ],
         select: { code: '1', name: '241' },
         items: [
           { code: '1', name: '241' },
           { code: '2', name: '201' },
           { code: '3', name: '141' },
           { code: '7', name: '221' },
           { code: '8', name: '341' },
         ],   
          values: [],     
        editedIndex: -1,
       
    
      }), 
         mounted: function () {
     
            this.getMachine(); 
     },
      created() {
      this.listRaports( )
      },
      methods: {       
         listRaports() {
          let self = this
          raportProduction.listRaport().then(function(res) {
          self.values = res;
          console.log(res,"oi")
        })
      },  
         getMachine() {
           let self = this;
           raportProduction.listRaport().then(function(res) {
          self.itemsMachine = res;
        })},  
      //   initialize() {     
         //  this.values = [
         //    {
         //      Date: '16/09/2018',
         //      Machine: 241,
         //      Shift: '7 - 19',
         //      Efficiency: '41%',              
         //    },
         //    {
         //      Date: '16/09/2018',
         //      Machine: 241,
         //      Shift: '19 - 7',
         //      Efficiency: '83%',
         //    },
         //    {
         //      Date: '16/09/2018',
         //      Machine: 215,
         //      Shift: '7 - 15',
         //      Efficiency: '74%',             
         //    },
         //    {
         //      Date: '16/09/2018',
         //      Machine: 215,
         //      Shift: '15 - 23',
         //      Efficiency: '53%',             
         //    },
         //    {
         //      Date: '16/09/2018',
         //      Machine: 215,
         //      Shift: '23 - 7',
         //      Efficiency: '36%',             
         //    },
         //  ]
          //   }, 
         //  clear () {
         //    this.$refs.form.reset()
         //  },
           
        submit() {
         
        if (this.$refs.form.validate())
         {
           alert('Metodo Save');
         }},
      
        Ative: function (event) {
            this.$router.push({ name: 'RapportProductionAction', params: { item: 123 }})
            // this.editedItem ={};
            // this.seenSave =true
            // this.seenUpdate=false
           },
   
       formatDate (date) {
           if (!date) return null
           const [year, month, day] = date.split('-')
           return `${year}/${month}/${day}`
         },
   
        editItem(item,valeur) {
           console.log("Alo")
            this.$router.push({ name: 'RapportProductionAction', params: { item: item }})
           this.show = false;   
           this.inspire = false;     
       
        },
    
      
      }
    }
        
</script>