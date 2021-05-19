<template>
<div class="right-sidebar" :class="{show: show }" id="right_side_bar">
   <div class="container p-0">
      <div class="modal-header p-l-20 p-r-20">
         <div class="col-sm-8 p-0">
            <h6 class="modal-title font-weight-bold">OBJECT LIST</h6>
         </div>
      </div>
   </div>
   <!-- <div class="friend-list-search mt-0">
      <input v-model="search" type="text" placeholder="search objects"><i class="fa fa-search"></i>
   </div> -->
   <div class="chat-box p-t-0">
      <div class="people-list friend-list">
         <div class="list-group">
            <draggable @start="$emit('startObjectDrag')" @end="$emit('endObjectDrag')"  :sort="false"  tag="ul" :list="items" :group="{ name: 'item2', pull: 'clone', put: false }">
               <li v-for="(item, index) in items" :key="index" class="list-group-item">
                  <span class="fa fa-list"></span>
                   {{ item.value }}
               </li>
            </draggable>
         </div>

      </div>
   </div>
</div>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
   name: 'objects',
   props: ['items', 'show'],
   components: {
      Draggable
   },
   data(){
      return{
         search: null
      }
   },
   computed:{
      filteredItem(){
         return this.items.filter((item)=>{
            return item.value.toLowerCase().includes(this.search.toLowerCase());
         });
      }
   }
}
</script>

<style scoped>
   .chat-box .people-list ul {
    max-height: none;
}

.list-group-item:hover{
   cursor: pointer;
}


</style>
