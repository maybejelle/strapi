<template>
    <div class="body">
        <button class="back" @click="returnToMyHome">Go Back</button>
        <div class="wrapper">
            <h2>{{ this.locationName }}</h2>
            <button @click="addNewDevice">+</button>
        </div>
        <DeviceComponent v-for="device in devices" :key="device.id" :device="device"></DeviceComponent>
    </div>

</template>

<script>
import axios from 'axios';
import DeviceComponent from './DeviceComponent.vue';
export default {
    components: {
        DeviceComponent
    },
    data() {
        return {
            devices: [],

        }
    },
    created() {
        axios.get(`http://localhost:8888/api/locations/${this.$route.params.id}?populate=devices`, {
            headers: {
                Authorization: `Bearer ${this.$cookies.get('jwt')}`
            }
        })
            .then(response => {
                this.devices = response.data.data.devices;
                this.locationName = response.data.data.name;
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        addNewDevice() {
            this.$router.push({ path: '/add-device', query: { locationId: this.$route.params.id } });
        },
        returnToMyHome() {
            this.$router.push({
                path: '/myHome'
            });
        }
    }

}

</script>


<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
}

.body {
    width: 80%;
    justify-self: center;
}

.back {
    position: absolute;
    margin: 1rem;
    border: 1px solid black;
    border-radius: 1rem;
    cursor: pointer;
    top: 2rem;
    right: 2rem;
    font-size: 1rem;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
}
</style>