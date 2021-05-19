<template>
<section v-if="show">
   <transition name="modal">
      <div class="modal-mask">
         <div class="modal-wrapper">
            <div class="modal-dialog modal-lg">
               <div class="modal-content">

                  <div class="modal-header">
                     <h4 class="modal-title">
                        {{ title }}
                     </h4>
                     <button type="button" class="close" @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                     </button>

                  </div>
                  <div class="modal-body">
                     <section class="m-5">
                        <slot name="body"></slot>
                     </section>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </transition>
</section>
</template>

<script>
export default {
   name: 'modal',
   props: {
      show: Boolean,
      title: String,

   },
   data() {
      return {
         show_modal: this.show
      }
   },
   computed: {
      showModal() {
         return this.show;
      }
   },
}
</script>

<style scoped>
.modal-mask {
   position: fixed;
   z-index: 9998;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, .5);
   display: table;
   transition: opacity .3s ease;
}

.modal-wrapper {
   display: table-cell;
   vertical-align: middle;
}
</style>
