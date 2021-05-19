<template>
   <div class="card">
      <div class="card-header b-l-primary border-3 p-t-10 p-b-10">
            <section class="row">
               <div class="col-sm-9">
                  <h5>ACCOUNT INFORMATION</h5>
               </div>
               <!-- <div class="col-sm-3">
                  <span><i class="fa fa-circle text-"></i> Approved</span>
               </div> -->
            </section>
      </div>
      <div class="card-body p-t-5 p-b-5">
         <table class=" table-borderless">
            <tbody>
               <tr>
                  <td class="p-r-15" align="right">
                     <i class="fa fa-user fa-user fa-2x circle-icon"></i>
                  </td>
                  <td>{{ client.name }}</td>
            </tr>
               <tr v-if="client.account_type_id == 20">
                  <td class="p-r-15"  align="right">
                     <i class="fa fa-users fa-2x circle-icon" ></i>
                  </td>
                  <td>{{ client.contact_person }}</td>
            </tr>
            <tr>
               <td class="p-r-15"  align="right"><i class="fa fa-phone fa-2x circle-icon"></i></td>
               <td>{{ client.primary_mobile }}</td>
            </tr>
            <tr>
               <td class="p-r-15" align="right"><i class="fa fa-envelope-o fa-2x circle-icon"></i></td>
               <td>{{ client.primary_email }}</td>
            </tr>
            <tr>
               <td class="p-r-15"  align="right"><i class="fa fa-map-marker fa-2x circle-icon"></i></td>
               <td>{{ property.address }}</td>
            </tr>
            </tbody>
         </table>
      </div>
   </div>
</template>

<script>
export default {
   name: 'client-info',
   props: ['client', 'property']

}
</script>

<style scoped>

</style>