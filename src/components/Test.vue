<template>
    <div>
        <b-modal v-model="value">
            test
        </b-modal>
    </div>
</template>

<script>
export default {
    name:'test',
    props:['show'],

    computed:{
        value:{
            get(){
                return this.show
            },
            set(val){
                this.$emit('input', val)
            }
        }
    }
}
</script>