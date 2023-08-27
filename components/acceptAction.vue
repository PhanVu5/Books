<template>
    <div v-if="checkDelete" class="delete">
        <div class="modal_dlt">
            <div class="handle">
                <p class="text_dlt">Are you sure you want to delete this comment?</p>
                <span class="area_function">
                    <button class="set_color_dlt" id="close_dlt" @click="CloseFunction">Close</button>
                    <button class="set_color_dlt" id="set_text" @click="CallDelete">Accept</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        checkDelete:{
            typeof: Boolean,
            default: false,
        }
    },
    methods: {
        CallDelete(){
            this.$emit('CallDeleteView')
            this.$emit('CloseFunctionDelete', false)
        },
        CloseFunction(){
            this.$emit('CloseFunctionDelete', false)
        },
    }
}
</script>

<style scoped>
.modal_dlt{
    text-align: center;
}

.handle{
    position: fixed;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    background-color: white;
    width: 400px;
    height: 150px;
    border: 1px solid rgba(58, 57, 57, 0.63);
    border-radius: 4px;
    z-index: 4;
}

.text_dlt{
    font-family: ' Calibri';
    padding: 40px;
}

.area_function{
    position: relative;
    bottom: 9px;
}

.set_color_dlt{
    min-width: 100px;
    padding: 5px 10px;
    border: none;
    border-radius: 8px; 
    cursor: pointer;
}

#set_text{
    color: rgb(62, 127, 248);
}

.set_color_dlt:hover{
    background: rgb(153 153 153 / 27%) !important;
}

#close_dlt:hover{
    background: rgb(153 153 153 / 27%) !important;
}
</style>