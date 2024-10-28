<template>
    <div>
        <h2>{{this.locationName}}</h2>
        <DeviceComponent v-for="device in devices" :key="device.id" :device="device"></DeviceComponent>
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
    }

}

</script>