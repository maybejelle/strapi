<template>
    <button class="back" @click="returnToDeviceOverview">Go Back</button>
    <div>
        <h1>Add Device</h1>
        <form @submit.prevent="addDevice">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name">
            <button type="submit">Add Device</button>
        </form>
    </div>
</template>

<script>
import { addDevice } from '../APICalls';

export default {
    data() {
        return {
            name : '',
        }
    },
    methods : {
        addDevice() {
            addDevice(this.name, this.$route.query.locationId, this.$cookies.get('jwt'))
                .then(() => {
                    alert('Device added successfully');
                    this.$router.push({ path: `/device-overview/${this.$route.query.locationId}` });
                })
                .catch(error => {
                    console.error("There was an error adding the device:", error);
                });
        },
        returnToDeviceOverview() {
            this.$router.push({ path: `/device-overview/${this.$route.query.locationId}` });
        }
    }
}
</script>


<style scoped>
.back {
    position: absolute;
    margin: 1rem;
    background-color: transparent;
    border: 1px solid black;
    border-radius: 1rem;
    cursor: pointer;
    top: 2rem;
    right: 2rem;
}
</style>