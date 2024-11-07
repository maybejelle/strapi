<template>
    <div>
        <h2>{{device.name}}</h2>
        <button @click="deleteDevice">Delete</button>
    </div>
</template>


<script>
import { deleteDevice } from '../../infrastructure/APICalls';

export default {
    props: {
       device : Object
    },
    methods: {
        deleteDevice() {
            deleteDevice(this.device.documentId, this.$cookies.get('jwt'))
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}

</script>

<style scoped>
div{
    display: flex;
    border: 1px solid black;
    margin: 10px 0;
    padding: 10px 0;
    width: 100%;
    vertical-align: top;
    border-radius: 1rem;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
}

h2{
    margin-left: 1rem;
}

button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 1rem;
}
</style>