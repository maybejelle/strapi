<template>
    <div>
        <h1>Welcome to the CMS Front End</h1>
        <p>Click on the links above to view the content</p>
        <p>{{ intro }}</p>
        <DeviceComponent v-for="device in devices" :key="device._id" :device="device"/>
    </div>
</template>

<script>
import axios from 'axios';
import DeviceComponent from './DeviceComponent.vue';

export default {
    name: 'HomePage',
    components : {
        DeviceComponent
    },
    data() {
        return {
            intro : '',
            devices : [],
        }
    },
    created() {
        axios.get('http://localhost:8888/api/home-page?populate=devices')
            .then(response => {
                this.intro = response.data.data.intro;
                this.devices = response.data.data.devices;
                console.log(this.devices[0].location);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>
