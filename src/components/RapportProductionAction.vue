<
<template>
   <v-app id="app" style="  width:100%;">
      <div class="containerValues">
         <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
               <template>
                  <v-layout row wrap>
                     <v-flex xs12 sm3>
                        <v-autocomplete clearable v-model="rapportProduction.Nemployee"                                 
                           required
                           append-icon="search"
                           :items="person"
                           :search-input.sync="searchPerson"
                           @blur.native="blurPerson()"                         
                           hide-no-data hide-selected
                           item-text="NomeFormart"
                           item-value="Id"
                           label="No employé"
                           solo
                           return-object
                           ></v-autocomplete>
                     </v-flex>
                     <v-flex xs12 sm3>
                        <v-text-field v-model="rapportProduction.NameEmployee"
                           label="Name employé"
                           solo
                           required></v-text-field>
                     </v-flex>
                     <v-flex xs12 sm2>
                        <v-text-field v-model="rapportProduction.HoursWorks"                               
                           label="Nb. heures travaillées"
                           solo
                           required></v-text-field>
                     </v-flex>
                     <v-flex xs12 sm3>
                        <v-select
                           v-model="rapportProduction.select"
                           :items="items"
                           item-text="name"
                           item-value="code"
                           label="Remplaçant"
                           solo
                           ></v-select>
                        <v-flex >  
                        </v-flex>
                     </v-flex>
                     <v-flex xs12 sm1>
                        <v-btn color="info" slot="activator" style="width:10px"  dark class="mb-2" v-on:click="addPersonGrid(rapportProduction)" >+</v-btn>
                     </v-flex>
                     <v-flex xs12 ms8>
                        <v-data-table :headers="headers"
                           :items="values"
                           :search="search"
                           :rows-per-page-items="[10,20]">
                           <template slot="items" slot-scope="props" >
                              <td>{{ props.item.NameEmployee }}</td>
                              <td>{{ props.item.NumberHours }}</td>
                              <td class="text-xs-center">{{ props.item.Substitute }}</td>
                              <td>
                                 <v-icon small
                                    class="mr-2"
                                    v-on:click="editItem(props.item,1)">
                                    edit
                                 </v-icon>
                                 <v-icon small
                                    v-on:click="deleteItem(props.item,0)">
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
                     </v-flex>
                       <v-dialog v-model="dialog" max-width="800px">
                  <v-card>
                     <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                     </v-card-title>
                     <v-card-text>
                        <v-container grid-list-md>
                           <v-layout wrap>
                              <v-flex xs12 sm4 md2>
                                 <v-text-field v-model="editedItem.NameEmployee" label="Nom de l'employé"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                 <v-text-field v-model="editedItem.NumberHours" label="Nb. d'heures travaillées"></v-text-field>
                              </v-flex>
                               <v-flex xs12 sm6 md4>
                                 <v-text-field v-model="editedItem.Remplacant" label="Remplaçant"></v-text-field>
                              </v-flex>
                           </v-layout>
                        </v-container>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat v-on:click.native="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" flat v-on:click.native="save">Save</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-dialog>
                     <v-flex xs12 sm2>
                        <v-select
                           v-model="rapportProduction.Machine"
                           :items="items"
                           item-text="name"
                           item-value="code"
                           label="Machine"
                           v-on:change="changeMachine(`${items.code}`)"
                           solo
                           ></v-select>
                     </v-flex>
                     <v-flex xs12 sm3>
                        <v-select
                           v-model="rapportProduction.Providedby"
                           :items="items"
                           item-text="name"
                           item-value="code"
                           label="Fournis par"
                           solo
                           ></v-select>
                     </v-flex>
                     <v-flex xs12 sm3>
                        <v-select
                           v-model="rapportProduction.Shift"
                           :items="items"
                           item-text="name"
                           item-value="code"
                           label="Shift"
                           solo
                           ></v-select>
                     </v-flex>
                     <v-flex xs12 sm3>  
                     </v-flex>
                     <v-flex xs12 sm2>  
                        SKU 1                             
                     </v-flex>
                     <v-flex xs12 sm1>
                        <v-text-field  v-model="rapportProduction.Sku2Pmd"                              
                           label="PMD"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku2Checkout"                              
                           label="Caisse"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs10 sm1>
                        <v-text-field  v-model="rapportProduction.Sku2NbPmd"                              
                           label="Nb PMD"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku2NbCheckout"                              
                           label="Nb Caisse"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs10 sm1>
                        <v-text-field  v-model="rapportProduction.Sku2Weight"                              
                           label="Poids"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku2PoidsCol2"                              
                           label="Poids"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs12 sm3>  
                     </v-flex>
                     <v-flex xs12 sm3>  
                     </v-flex>
                     <v-flex xs12 sm2>  
                        SKU 2                             
                     </v-flex>
                     <v-flex xs12 sm1>
                        <v-text-field  v-model="rapportProduction.Sku1Pmd"                              
                           label="PMD"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku1Checkout"                              
                           label="Caisse"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs10 sm1>
                        <v-text-field  v-model="rapportProduction.Sku1NbPmd"                              
                           label="Nb PMD"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku1NbCheckout"                              
                           label="Nb Caisse"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs10 sm1>
                        <v-text-field  v-model="rapportProduction.Sku1Weight"                              
                           label="Poids"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku1PoidsCol2"                              
                           label="Poids"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs12 sm8>  
                     </v-flex>
                     <v-flex xs12 sm3>  
                     </v-flex>
                     <v-flex xs12 sm2>  
                        SKU 3                             
                     </v-flex>
                     <v-flex xs12 sm1>
                        <v-text-field  v-model="rapportProduction.Sku3Pmd"                              
                           label="PMD"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku3Checkout"                              
                           label="Caisse"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs10 sm1>
                        <v-text-field  v-model="rapportProduction.Sku3NbPmd"                              
                           label="Nb PMD"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku3NbCheckout"                              
                           label="Nb Caisse"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs10 sm1>
                        <v-text-field  v-model="rapportProduction.Sku3Weight"                              
                           label="Poids"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku3PoidsCol2"                              
                           label="Poids"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs12 sm8>  
                     </v-flex>
                     <v-flex xs12 sm3>  
                     </v-flex>
                     <v-flex xs12 sm2>  
                        SKU 4                             
                     </v-flex>
                     <v-flex xs12 sm1>
                        <v-text-field  v-model="rapportProduction.Sku4Pmd"                              
                           label="PMD"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku4Checkout"                              
                           label="Caisse"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs10 sm1>
                        <v-text-field  v-model="rapportProduction.Sku4NbPmd"                              
                           label="Nb PMD"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku4NbCheckout"                              
                           label="Nb Caisse"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs10 sm1>
                        <v-text-field  v-model="rapportProduction.Sku4Weight"                              
                           label="Poids"                                                                  
                           solo
                           required>
                        </v-text-field>
                        <v-text-field  v-model="rapportProduction.Sku4PoidsCol2"                              
                           label="Poids"                                                                  
                           solo
                           required>
                        </v-text-field>
                     </v-flex>
                     <v-flex xs12 sm6>  
                     </v-flex>
                     <template>
                        <v-container grid-list-md text-xs-center>
                           <v-layout row wrap>
                              <v-flex xs6>
                                 <v-card-text class="px-0">
                                    <v-card-title style="text-align:center;background-color:#C0C0C0;width:600px" >
                                       <v-spacer style="font-weight: bold">Temps opérer</v-spacer>
                                    </v-card-title>
                                    <v-data-table style="width:600px" :headers="headersTemps"
                                       :items="values"
                                       :search="search"                                    
                                       :rows-per-page-items="[10,20]">
                                       <template slot="items" slot-scope="props" >
                                          <td>{{ props.item.NameEmployee }}</td>
                                          <td>{{ props.item.NumberHours }}</td>
                                          <td class="text-xs-center">{{ props.item.Substitute }}</td>
                                       </template>
                                       <template slot="no-data">
                                       </template>
                                       <v-alert slot="no-results" :value="true" color="error" icon="warning">
                                          Your search for "{{ search }}" found no results.
                                       </v-alert>
                                    </v-data-table>
                                 </v-card-text>
                              </v-flex>
                              <v-flex xs6>
                                 <v-card-text >
                                    <v-card-title style="text-align:center;background-color:#C0C0C0;width:600px" >
                                       <v-spacer style="font-weight: bold">Commentaires et Actions</v-spacer>
                                    </v-card-title>
                                    <v-data-table style="width:600px" 
                                       :items="valuesComentaires"
                                       :search="search"   >
                                       <template slot="items" slot-scope="props" >
                                          <td>{{ props.item.Hours }}</td>
                                          <td>{{ props.item.Commentaires }}</td>
                                       </template>
                                       <template slot="no-data">
                                       </template>
                                       <v-alert slot="no-results" :value="true" color="error" icon="warning">
                                          Your search for "{{ search }}" found no results.
                                       </v-alert>
                                    </v-data-table>
                                 </v-card-text>
                              </v-flex>
                              <v-flex  xs3>
                                 <v-card-text>
                                    <v-card-title style="text-align:center;background-color:#C0C0C0;width:600px" >
                                       <v-spacer style="font-weight: bold">Temps d'arrêts en minute</v-spacer>
                                    </v-card-title>
                                    <v-data-table style="width:600px" :headers="headersTemps"
                                       :items="values"
                                       :search="search"                                    
                                       :rows-per-page-items="[10,20]">
                                       <template slot="items" slot-scope="props" >
                                          <td>{{ props.item.NameEmployee }}</td>
                                          <td>{{ props.item.NumberHours }}</td>
                                          <td class="text-xs-center">{{ props.item.Substitute }}</td>
                                       </template>
                                       <template slot="no-data">
                                       </template>
                                       <v-alert slot="no-results" :value="true" color="error" icon="warning">
                                          Your search for "{{ search }}" found no results.
                                       </v-alert>
                                    </v-data-table>
                                 </v-card-text>
                              </v-flex>
                           </v-layout>
                         
                           <br><br>
                           <template>
                              <div>
                                 <div class="d-flex justify-between align-center mb-3">
                                 </div>
                                 <v-expansion-panel
                                    v-model="panel"
                                    expand
                                    >
                                    <v-expansion-panel-content>
                                       <div slot="header">SKU1</div>
                                       <v-card>
                                             <table class="blueTable">
                              <tbody>
                                 <tr>
                                    <td class="tableBlueHead">SKU 1 </td>
                                    <td class="tableBlueHead">Provient</td>
                                    <td class="tableBlueHead">8:45</td>
                                    <td class="tableBlueHead">10:45</td>
                                    <td class="tableBlueHead">12:45</td>
                                    <td class="tableBlueHead">14:45</td>
                                    <td class="tableBlueHead">16:45</td>
                                    <td class="tableBlueHead">18:45</td>
                                    <td class="tableBlueHead">Total</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Montant transféré aux 2hrs <br> (Nb produit(E A))</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Montant transféré aux 2hrs <br> (Nb produit(E A))</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Nb Caisses prod (B)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Nb PMD prod (B)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Total (A+B) C</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Objectif pour 2 hrs (D)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Efficacité % (C/D)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">(1-Eff %) x 120(Mins)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                              </tbody>
                           </table><br><br>
                                          <table class="TableForm">
                                             <tr>
                                                <td>Consommation de rouleaux(Z) &nbsp; </td>
                                                <th>
                                                   <v-text-field  v-model="rapportProduction.Sku1Consommation"
                                                      solo
                                                      required>
                                                   </v-text-field>
                                                </th>
                                                <td>Papier au Départ(C):&nbsp; </td>
                                                <th>
                                                   <v-text-field  v-model="rapportProduction.Sku1Papier"                                               
                                                      solo
                                                      required>
                                                   </v-text-field>
                                                </th>
                                                <th ></th>
                                                <table class="TableFeuillePoids">
                                                   <thead>
                                                      <tr>
                                                         <th colspan="5">Feuile de poids</th>
                                                      </tr>
                                                   </thead>
                                                   <tbody>
                                                      <tr>
                                                         <td>cell1_1</td>
                                                         <td>cell2_1</td>
                                                         <td>cell3_1</td>
                                                         <td>cell4_1</td>
                                                         <td>cell5_1</td>
                                                      </tr>
                                                      <tr>
                                                         <td>cell1_2</td>
                                                         <td>cell2_2</td>
                                                         <td>cell3_2</td>
                                                         <td>cell4_2</td>
                                                         <td>cell5_2</td>
                                                      </tr>
                                                      <tr>
                                                         <td>cell1_3</td>
                                                         <td>cell2_3</td>
                                                         <td>cell3_3</td>
                                                         <td>cell4_3</td>
                                                         <td>cell5_3</td>
                                                      </tr>
                                                      <tr>
                                                         <td>cell1_4</td>
                                                         <td>cell2_4</td>
                                                         <td>cell3_4</td>
                                                         <td>cell4_4</td>
                                                         <td>cell5_4</td>
                                                      </tr>
                                                      <tr>
                                                         <td>cell1_5</td>
                                                         <td>cell2_5</td>
                                                         <td>cell3_5</td>
                                                         <td>cell4_5</td>
                                                         <td>cell5_5</td>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </tr>
                                             <tbody>
                                                <tr>
                                                   <td>"Waste"% </td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku1Waste"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                   <td>Roleaux utilisé (D)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku1RoleauxUtilise"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>Rouleaux a fin(E)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku1RoleauxFin"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>Prod(Cs * Poids)(Y)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku1Prod"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td>"Waste" Commentaires et Actions </td>
                                                   <td colspan="5">
                                                      <v-text-field  v-model="rapportProduction.Sk1WasteCommentaire"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </v-card>
                                    </v-expansion-panel-content>
                                    <v-expansion-panel-content>
                                       <div slot="header">SKU2</div>
                                       <v-card>  <table class="blueTable">
                              <tbody>
                                 <tr>
                                    <td class="tableBlueHead">SKU 2 </td>
                                    <td class="tableBlueHead">Provient</td>
                                    <td class="tableBlueHead">8:45</td>
                                    <td class="tableBlueHead">10:45</td>
                                    <td class="tableBlueHead">12:45</td>
                                    <td class="tableBlueHead">14:45</td>
                                    <td class="tableBlueHead">16:45</td>
                                    <td class="tableBlueHead">18:45</td>
                                    <td class="tableBlueHead">Total</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Montant transféré aux 2hrs <br> (Nb produit(E A))</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Montant transféré aux 2hrs <br> (Nb produit(E A))</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Nb Caisses prod (B)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Nb PMD prod (B)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Total (A+B) C</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Objectif pour 2 hrs (D)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Efficacité % (C/D)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">(1-Eff %) x 120(Mins)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                              </tbody>
                           </table>
                           <br><br>
                                          <table class="TableForm">
                                             <tr>
                                                <td>Consommation de rouleaux(Z) &nbsp; </td>
                                                <th>
                                                   <v-text-field  v-model="rapportProduction.Sku1Consommation"
                                                      solo
                                                      required>
                                                   </v-text-field>
                                                </th>
                                                <td>Papier au Départ(C):&nbsp; </td>
                                                <th>
                                                   <v-text-field  v-model="rapportProduction.Sku1Papier"                                               
                                                      solo
                                                      required>
                                                   </v-text-field>
                                                </th>
                                                <th ></th>
                                                <td rowspan="4">
                                                   <table class="TableFeuillePoids">
                                                      <thead>
                                                         <tr>
                                                            <th colspan="5">Feuile de poids</th>
                                                         </tr>
                                                      </thead>
                                                      <tbody>
                                                         <tr>
                                                            <td>cell1_1</td>
                                                            <td>cell2_1</td>
                                                            <td>cell3_1</td>
                                                            <td>cell4_1</td>
                                                            <td>cell5_1</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_2</td>
                                                            <td>cell2_2</td>
                                                            <td>cell3_2</td>
                                                            <td>cell4_2</td>
                                                            <td>cell5_2</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_3</td>
                                                            <td>cell2_3</td>
                                                            <td>cell3_3</td>
                                                            <td>cell4_3</td>
                                                            <td>cell5_3</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_4</td>
                                                            <td>cell2_4</td>
                                                            <td>cell3_4</td>
                                                            <td>cell4_4</td>
                                                            <td>cell5_4</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_5</td>
                                                            <td>cell2_5</td>
                                                            <td>cell3_5</td>
                                                            <td>cell4_5</td>
                                                            <td>cell5_5</td>
                                                         </tr>
                                                      </tbody>
                                                   </table>
                                                </td>
                                             </tr>
                                             <tbody>
                                                <tr>
                                                   <td>"Waste"% </td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku2Waste"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                   <td>Roleaux utilisé (D)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku2RoleauxUtilise"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>Rouleaux a fin(E)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku2RoleauxFin"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>Prod(Cs * Poids)(Y)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku2Prod"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td>"Waste" Commentaires et Actions </td>
                                                   <td colspan="5">
                                                      <v-text-field  v-model="rapportProduction.Sk2WasteCommentaire"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </v-card>
                                    </v-expansion-panel-content>
                                    <v-expansion-panel-content>
                                       <div slot="header">SKU3</div>
                                       <v-card>
                                             <table class="blueTable">
                              <tbody>
                                 <tr>
                                    <td class="tableBlueHead">SKU 3 </td>
                                    <td class="tableBlueHead">Provient</td>
                                    <td class="tableBlueHead">8:45</td>
                                    <td class="tableBlueHead">10:45</td>
                                    <td class="tableBlueHead">12:45</td>
                                    <td class="tableBlueHead">14:45</td>
                                    <td class="tableBlueHead">16:45</td>
                                    <td class="tableBlueHead">18:45</td>
                                    <td class="tableBlueHead">Total</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Montant transféré aux 2hrs <br> (Nb produit(E A))</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Montant transféré aux 2hrs <br> (Nb produit(E A))</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Nb Caisses prod (B)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Nb PMD prod (B)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Total (A+B) C</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Objectif pour 2 hrs (D)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Efficacité % (C/D)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">(1-Eff %) x 120(Mins)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                              </tbody>
                           </table><br><br>
                                          <table class="TableForm">
                                             <tr>
                                                <td>Consommation de rouleaux(Z) &nbsp; </td>
                                                <th>
                                                   <v-text-field  v-model="rapportProduction.Sku1Consommation"
                                                      solo
                                                      required>
                                                   </v-text-field>
                                                </th>
                                                <td>Papier au Départ(C):&nbsp; </td>
                                                <th>
                                                   <v-text-field  v-model="rapportProduction.Sku1Papier"                                               
                                                      solo
                                                      required>
                                                   </v-text-field>
                                                </th>
                                                <th ></th>
                                                <td rowspan="4">
                                                   <table class="TableFeuillePoids">
                                                      <thead>
                                                         <tr>
                                                            <th colspan="5">Feuile de poids</th>
                                                         </tr>
                                                      </thead>
                                                      <tbody>
                                                         <tr>
                                                            <td>cell1_1</td>
                                                            <td>cell2_1</td>
                                                            <td>cell3_1</td>
                                                            <td>cell4_1</td>
                                                            <td>cell5_1</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_2</td>
                                                            <td>cell2_2</td>
                                                            <td>cell3_2</td>
                                                            <td>cell4_2</td>
                                                            <td>cell5_2</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_3</td>
                                                            <td>cell2_3</td>
                                                            <td>cell3_3</td>
                                                            <td>cell4_3</td>
                                                            <td>cell5_3</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_4</td>
                                                            <td>cell2_4</td>
                                                            <td>cell3_4</td>
                                                            <td>cell4_4</td>
                                                            <td>cell5_4</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_5</td>
                                                            <td>cell2_5</td>
                                                            <td>cell3_5</td>
                                                            <td>cell4_5</td>
                                                            <td>cell5_5</td>
                                                         </tr>
                                                      </tbody>
                                                   </table>
                                                </td>
                                             </tr>
                                             <tbody>
                                                <tr>
                                                   <td>"Waste"% </td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku3Waste"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                   <td>Roleaux utilisé (D)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku3RoleauxUtilise"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>Rouleaux a fin(E)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku3RoleauxFin"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>Prod(Cs * Poids)(Y)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku3Prod"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td>"Waste" Commentaires et Actions </td>
                                                   <td colspan="5">
                                                      <v-text-field  v-model="rapportProduction.Sk3WasteCommentaire"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </v-card>
                                    </v-expansion-panel-content>
                                    <v-expansion-panel-content>
                                       <div slot="header">SKU4</div>
                                       <v-card>
                                             <table class="blueTable">
                              <tbody>
                                 <tr>
                                    <td class="tableBlueHead">SKU 4 </td>
                                    <td class="tableBlueHead">Provient</td>
                                    <td class="tableBlueHead">8:45</td>
                                    <td class="tableBlueHead">10:45</td>
                                    <td class="tableBlueHead">12:45</td>
                                    <td class="tableBlueHead">14:45</td>
                                    <td class="tableBlueHead">16:45</td>
                                    <td class="tableBlueHead">18:45</td>
                                    <td class="tableBlueHead">Total</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Montant transféré aux 2hrs <br> (Nb produit(E A))</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Montant transféré aux 2hrs <br> (Nb produit(E A))</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Nb Caisses prod (B)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Nb PMD prod (B)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Total (A+B) C</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Objectif pour 2 hrs (D)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">Efficacité % (C/D)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                                 <tr>
                                    <td class="tableBlueHead">(1-Eff %) x 120(Mins)</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                 </tr>
                              </tbody>
                           </table><br><br>
                                          <table class="TableForm">
                                             <tr>
                                                <td>Consommation de rouleaux(Z) &nbsp; </td>
                                                <th>
                                                   <v-text-field  v-model="rapportProduction.Sku4Consommation"
                                                      solo
                                                      required>
                                                   </v-text-field>
                                                </th>
                                                <td>Papier au Départ(C):&nbsp; </td>
                                                <th>
                                                   <v-text-field  v-model="rapportProduction.Sku4Papier"                                               
                                                      solo
                                                      required>
                                                   </v-text-field>
                                                </th>
                                                <th ></th>
                                                <td rowspan="4">
                                                   <table class="TableFeuillePoids"  >
                                                      <thead>
                                                         <tr>
                                                            <th colspan="5">Feuile de poids</th>
                                                         </tr>
                                                      </thead>
                                                      <tbody>
                                                         <tr>
                                                            <td>cell1_1</td>
                                                            <td>cell2_1</td>
                                                            <td>cell3_1</td>
                                                            <td>cell4_1</td>
                                                            <td>cell5_1</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_2</td>
                                                            <td>cell2_2</td>
                                                            <td>cell3_2</td>
                                                            <td>cell4_2</td>
                                                            <td>cell5_2</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_3</td>
                                                            <td>cell2_3</td>
                                                            <td>cell3_3</td>
                                                            <td>cell4_3</td>
                                                            <td>cell5_3</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_4</td>
                                                            <td>cell2_4</td>
                                                            <td>cell3_4</td>
                                                            <td>cell4_4</td>
                                                            <td>cell5_4</td>
                                                         </tr>
                                                         <tr>
                                                            <td>cell1_5</td>
                                                            <td>cell2_5</td>
                                                            <td>cell3_5</td>
                                                            <td>cell4_5</td>
                                                            <td>cell5_5</td>
                                                         </tr>
                                                      </tbody>
                                                   </table>
                                                </td>
                                             </tr>
                                             <tbody>
                                                <tr>
                                                   <td>"Waste"% </td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku4Waste"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                   <td>Roleaux utilisé (D)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku4RoleauxUtilise"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>Rouleaux a fin(E)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku4RoleauxFin"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td></td>
                                                   <td></td>
                                                   <td>Prod(Cs * Poids)(Y)</td>
                                                   <td>
                                                      <v-text-field  v-model="rapportProduction.Sku4Prod"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                                <tr>
                                                   <td>"Waste" Commentaires et Actions </td>
                                                   <td colspan="5">
                                                      <v-text-field  v-model="rapportProduction.Sk4WasteCommentaire"                                               
                                                         solo
                                                         required>
                                                      </v-text-field>
                                                   </td>
                                                </tr>
                                             </tbody>
                                          </table>
                                       </v-card>
                                    </v-expansion-panel-content>
                                 </v-expansion-panel>
                              </div>
                           </template>
                        </v-container>
                        
                     </template>
                  </v-layout>
               </template>
            </v-container>
         </v-form>
      </div>
   </v-app>
</template>
<style>
   table.blueTable {
   border: 1px solid ;
   width: 90%;
   text-align: left;
   border-collapse: collapse;
   color: rgb(0, 0, 0)
   }
   table.blueTable td, table.blueTable th {
   border: 1px solid rgb(7, 7, 7);  
   padding: 3px 2px;
   }
   .tableBlueHead {
   background: rgb(100, 168, 214);
   font-weight: bold;
   font-size: 13px;
   }
   table.blueTable tbody td {
   font-size: 13px;
   }
   table.blueTable thead th:first-child {
   border-left: none;
   }
   table.TableFeuillePoids{
   margin-left:150px;
   margin-top: 20px;
   position: absolute;
   border: 1px solid ;
   text-align: center;
   border-collapse: collapse;
   color: rgb(0, 0, 0);
   }
   table.TableFeuillePoids  td{
   border: 1px solid rgb(7, 7, 7);  
   padding: 12px 8px;
   }
   .TableFeuillePoids th {
   background: rgb(100, 168, 214);
   }
</style>
<script>
   //  import messes from '@/webapi/Messes.js';
      import raportProduction from '@/webApi/RapportProductionAPI.js';
     export default {    
      data: () => ({       
        valid: true,
        search: '',
        dialog: false,
        btnDisable: true,
        searchPerson:'',
        person:[],
        editedItem:'',
        panel:null,
        rapportProduction:[],
         headers: [
          { text: "Nom de l'employé", value: 'NameEmployee',  class: 'toptable' },
          { text: "Nb. d'heures travaillées", value: 'NumberHours', class: 'toptable' },
          { text: 'Remplaçant', value: 'Substitute',  class: 'toptable',align: 'center', },         
          { text: 'Action', value: 'action', align: 'left', class: 'toptable', sortable: false }
        ],
        headersTemps: [
          { text: "Nom de l'employé", value: 'NameEmployee',  class: 'toptable' },
          { text: "Nb. d'heures travaillées", value: 'NumberHours', class: 'toptable' },
          { text: 'Remplaçant', value: 'Substitute',  class: 'toptable',align: 'center', }
        ],
        items: [
           { code: '1', name: '241' },
           { code: '2', name: '201' },
           { code: '3', name: '141' },
           { code: '7', name: '221' },
           { code: '8', name: '341' },
         ],
       
      }),
      watch: {
             searchPerson(val) {
        if(val == null || val == "")
          this.person = [];
        if(this.person.length > 0) return
          this.getPerson(val);
      }
      },
      computed: {
           formTitle() {
        return this.editedIndex === -1 ? 'New ' : 'Edit '
      }
       },
      created() {
        this.initialize()
      },
      methods: {
        initialize() {  
              this.values = [
            {
              NameEmployee: 'Felipe Muniz',
              NumberHours: 35,
              Substitute: ' lalala',       
            },
            {
               NameEmployee: 'Isac Muniz',
              NumberHours: 20,
              Substitute: ' lalala',       
            },
            {
               NameEmployee: 'Thais Muniz',
              NumberHours: 35,
              Substitute: ' lalala',               
            },
           
          ]
          ,   this.valuesComentaires = [
            {
              Hours: '8:45',
              Commentaires: "Ai ai ai ",
            },
           {
              Hours: '11:45',
              Commentaires: "Ai ai ai ",
            },
            {
              Hours: '10:45',
              Commentaires: "loren ipsun",
            },
            {
              Hours: '12:45',
              Commentaires: "test test test  ",
            },
            
           
          ]
        }, 

        blurPerson(){
           
         console.log(rapportProduction.Nemployee,"opa!")
        },
       changeMachine(a) {
        
         console.log("Aqui")
      },
         //  clear () {
         //    this.$refs.form.reset()
         //  },
      addPersonGrid(rapportProduction){
         console.log(rapportProduction,"aqui")        
      },
      getPerson(q) {
         let self = this;
            raportProduction.listPerson(q).then(function(res) {             
            self.person = res;            
         })},
           
        submit() {
         
        if (this.$refs.form.validate())
         {
           alert('Metodo Save');
         }},
      
        Ative: function (event) {
        
           },
   
       formatDate (date) {
           if (!date) return null
           const [year, month, day] = date.split('-')
           return `${year}/${month}/${day}`
         },
   
        editItem(item) {
        this.editedIndex = this.values.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        console.log($appName)
      },
      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      
      }
    }
        
</script>