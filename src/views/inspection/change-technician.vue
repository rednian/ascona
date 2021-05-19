<template>
<section>

   <modal :show="show" :title="title" @close="$emit('close')">
      <template #body>
         <div class="card">
            <div class="card-heading">
               <h5></h5>
            </div>
            <div class="card-body">
               test..
            </div>
         </div>
      </template>
   </modal>

</section>
</template>

<script>
import Modal from '@/components/Modal'
export default {

   name: 'change-technician',
   components: {
      Modal
   },

   props: {
      show: Boolean
   },
   data() {
      return {
         title: 'Change Technician',
      }
   },

}
</script>
