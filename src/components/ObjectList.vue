<template>
   <table class="table table-striped" v-if="!is_object_start_drag">
        <thead>
            <th>Item</th>
            <th>Qty</th>
            <th>Size</th>
            <th>Texture</th>
            <th></th>
        </thead> 
        <tbody >
            <template v-for="(obj, index) in objects" >
                <tr v-if="obj.location_id == item.id" :key="index" >
                <td>{{ obj.name }}</td>
                <td>{{ obj.quantity }}</td>
                <td>{{ obj.size }}</td>
                <td>{{ obj.texture_type }}</td>
                <td>
                <!-- <a @click="editItem(obj, index2, item)" href="javascript:void(0)">Edit</a> |  -->
                <a @click="deleteItem(obj, item, index)" href="javascript:void(0)">Delete</a>
                </td>
            </tr>
            </template>
        
        </tbody>
    </table>
</template>

<script>

import {mapActions} from 'vuex'

export default {
    name: 'ObjectList',
    props:[ 'objects', 'item'],
    data(){
        return{
        
            is_object_start_drag: false
        }
    },
    methods:{
        ...mapActions({
            delete:'editinspection/removeItem'
        }),

        deleteItem(obj, item, index){
            
            this.bootbox.confirm(`Are you sure you want to remove the <span class="text-success">${obj.name}</span>?`, result=>{
                if(result){
                    this.delete({
                        api_token: this.$store.getters['auth/token'],
                        id: obj.id
                    })
                    .then(res=>{
                        this.$store.dispatch('notification/addNotification',{
                            message: `${obj.name} has been removed successfully.`,
                            type:'success'
                        });
                    })
                    .catch(e=>{
                        this.$store.dispatch('notification/addNotification',{
                            message: e.message,
                            type:'danger'
                        });
                    });
                }
            });
         
        }
    }
}
</script>

