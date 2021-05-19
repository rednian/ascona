<template>
<div class="right-sidebar" :class="{show: show }" id="right_side_bar">
   <div class="container p-0">
      <div class="modal-header p-l-20 p-r-20">
         <div class="col-sm-8 p-0">
            <h6 class="modal-title font-weight-bold">LOCATIONS LIST 
               <!-- <button class="btn btn-xs btn-light active btn-pill"><i class="fa fa-times"></i> Close</button> -->
               </h6>
         </div>
         <!-- <div class="col-sm-4 text-right p-0"><i class="mr-2" data-feather="settings"></i></div> -->
      </div>
   </div>
   <!-- <div class="friend-list-search mt-0">
      <input type="text" placeholder="search family"><i class="fa fa-search"></i>
   </div> -->
   <div class="chat-box p-t-0">
      <div class="people-list friend-list">
         <div class="list-group">
            
            <draggable
            :sort="false" 
            :list="items"
            tag="ul"
            :group="{ name: 'family', pull: 'clone', put: false }" 
            @change="log" 
            @start="$emit('startAreaDrag')" 
            @end="$emit('endAreaDrag')"
            >
               <li v-for="item in items" :key="item.key" class="list-group-item">
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
let idGlobal = 8;
export default {
   name: 'families',
   props: ['families', 'items', 'show'],
   components: {
      Draggable
   },
   computed: {
      isShowFamily() {
         return this.$store.getters['app/inspectionFamilyListShow'];
      },
   },

   methods: {

      start() {
         // console.log('start')
         this.$store.state.app.inspection.family.is_drag = true;
      },
      end(e) {
         // console.log(e);
         this.$store.state.app.inspection.family.is_drag = false;
      },

      log(e){
         console.log(e.draggedContext);
      },

      cloneDog({
         id
      }) {
         return {
            id: idGlobal++,
            name: `FAMILY ${id}`
         };
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

