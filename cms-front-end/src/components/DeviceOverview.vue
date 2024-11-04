<template>
    <div class="body">
        <button class="back" @click="returnToMyHome">Go Back</button>
        <div class="wrapper">
            <h2>{{ this.locationName }}</h2>
            <button @click="subscribeToTopic">+</button>
        </div>
        <DeviceComponent v-for="device in devices" :key="device.id" :device="device"></DeviceComponent>
    </div>

</template>

<script>
import DeviceComponent from './DeviceComponent.vue';
import { getDevices, addDevice } from '@/APICalls';
import { connectMqtt, subscribe, onMessage } from '../mqttConnection';
export default {
    components: {
        DeviceComponent
    },
    data() {
        return {
            devices: [],
            locationName: ''

        }
    },
    created() {
        getDevices(this.$route.params.id, this.$cookies.get('jwt'))
            .then(response => {
                this.locationName = response.data.data.name
                this.devices = response.data.data.devices;
            })
            .catch(error => {
                console.log(error);
            });
        connectMqtt();
    },
    methods: {
        addNewDevice() {
            this.$router.push({ path: '/add-device', query: { locationId: this.$route.params.id } });
        },
        returnToMyHome() {
            this.$router.push({
                path: '/myHome'
            });
        },
        subscribeToTopic() {
            subscribe('location/devices');
        }
    },
    mounted() {
        onMessage((topic, message) => {
            message = JSON.parse(message.toString());
            if (message.userId !== this.$cookies.get('userId')) {
                return;
            }
            console.log('Message received', message);
            addDevice(message.name,this.$route.params.id,this.$cookies.get('jwt'))
                .then(() => {
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        });
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