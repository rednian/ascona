<template>

    <draggable
   
    handle
    tag="div"
    :sort="false" 
    :list="items"
    :group="{ name: 'technicians', pull: 'clone', put: true }" 
    @start="$emit('startTechnician')" 
    @end="$emit('endTechnician')"
    >
    <technician  v-for="item in items" :item="item" :key="item.id" />
    </draggable>

  
</template>

<script>
import Draggable from 'vuedraggable';
import Technician from '@/components/Technician'
export default {
   name: 'Technicians',
   props: ['items', ''],
   
   components: {
      Draggable,
      Technician
   },
}
</script>

<style scoped>
/* .handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
} */
</style>

