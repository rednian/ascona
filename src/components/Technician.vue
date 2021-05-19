<template>
     <span 
     class="btn  m-r-5 m-b-5 btn-warning btn-pill drag-cursor"
     style="font-size: .9rem"
     >
     {{ item.memberName }} 
     <i v-if="item.isDriver" class="fa fa-truck"></i>  
     <i v-if="item.isTeamLeader" class="fa fa-user"></i>  
     </span> 
</template>

<script>

export default {
   name: 'Technician',
   props: ['item'],

 
}
</script>

<style scoped>
/* .handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
} */
</style>

