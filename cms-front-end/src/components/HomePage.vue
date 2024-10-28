<template>
    <div>
        <h1>Welcome to the CMS Front End</h1>
        <p>Click on the links above to view the content</p>
        <p>{{ intro }}</p>
        <ul>
            <li v-for="device in devices" :key="device.id">
                <h2>{{ device.name }}</h2>
                <p>{{ device.location }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'HomePage',
    data() {
        return {
            intro : '',
            devices : []
        }
    },
    created() {
        axios.get('http://localhost:8888/api/home-page?populate=devices')
            .then(response => {
                this.intro = response.data.data.intro;
                this.devices = response.data.data.devices;
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>
