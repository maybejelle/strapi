<template>
    <button @click="returnToHomePage">Go Back</button>
    <div>
        <h2>{{this.locationName}}</h2>
        <DeviceComponent v-for="device in devices" :key="device.id" :device="device"></DeviceComponent>
        <div class="button" @click="addNewDevice">
            <p>Add a device</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import DeviceComponent from './DeviceComponent.vue';
export default {
    components : {
        DeviceComponent
    },
    data() {
        return {
            devices : [],

        }
    },
    created() {
        axios.get(`http://localhost:8888/api/locations/${this.$route.params.id}?populate=devices`)
            .then(response => {
                this.devices = response.data.data.devices;
                this.locationName = response.data.data.name;
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods : {
        addNewDevice() {
            this.$router.push({path: '/add-device', query: {locationId: this.$route.params.id}});
        },
        returnToHomePage() {
            this.$router.push({path: '/homePage'});
        }
    }

}

</script>


<style scoped>
.button{
    border: 1px solid black;
    margin: 1rem;
    padding: 1rem;
    display: inline-block;
    border-radius: 1rem;
    cursor: pointer;
}

button{
    position: absolute;
    margin: 1rem;
    background-color: transparent;
    border : 1px solid black;
    border-radius: 1rem;
    cursor: pointer;
    top: 2rem;
    right: 2rem;
}

</style>