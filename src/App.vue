<template>
  <v-app>
   

    <v-content>
      <RapportProductionAction/>
    
    </v-content>
  </v-app>
</template>

<script>
import RapportProduction from './components/RapportProduction'
import RapportProductionAction from './components/RapportProductionAction'


export default {
  name: 'App',
  components: {
    RapportProduction,RapportProductionAction
  },
  data () {
    return {
      //
    }
  }
}
</script>
