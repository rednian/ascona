<template>
  <tbody>
  <drag @dragstart="handleDrop(item)" v-for="(item, index) in items" :key="index" :data="item" :transfer-data="item"> 
      <tr >
         <td><strong>{{ item.name }}</strong></td>
      </tr>
  </drag>
  </tbody>
</template>
<script>
import { Drag } from 'vue-drag-drop';

export default {
   components:{ Drag },

   name:'family',
   props:['items'],

   methods:{
      handleDrop(item){
         this.$store.dispatch('inspection/dragFamily', item);
         // this.$store.dispatch('inspection/dragFamily', JSON.stringify(item));
      }
   },
}
</script>