<template>
    <div class="body">
        <button class="back" @click="returnToMyHome">Go Back</button>
        <div class="wrapper">
            <h2>{{ this.locationName }}</h2>
        </div>
        <DeviceComponent v-for="device in devices" :key="device.id" :device="device"></DeviceComponent>
    </div>

</template>

<script>
import DeviceComponent from './DeviceComponent.vue';
import { fetchDevicesUseCase } from '../application/useCases/fetchDevicesUseCase';
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
    async created() {
        const data = await fetchDevicesUseCase.execute(this.$route.params.id)
        this.devices = data.devices;
        this.locationName = data.name;

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
    height: 2rem;
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