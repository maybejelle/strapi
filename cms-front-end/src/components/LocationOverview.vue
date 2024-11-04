<template>
    <div class="body">
        <button class="back" @click="returnToHomePage">Go Back</button>
        <div class="wrapper">
            <h1>Your locations</h1>
            <button @click="subscribeToLocation">+</button>
        </div>
        <LocationComponent v-for="location in locations" :key="location.id" :location="location"></LocationComponent>

    </div>
</template>

<script>
import LocationComponent from './LocationComponent.vue';
import HomeIcon from '../assets/home-icon.png';
import { getLocations, addLocation} from '@/APICalls';
import { connectMqtt, subscribe, onMessage} from '../mqttConnection';


export default {
    name: 'HomePage',
    components: {
        LocationComponent,
    },
    data() {
        return {
            locations: [],
            HomeIcon
        }
    },
    created() {
        getLocations(this.$cookies.get('jwt'))
            .then(response => {
                this.locations = response.data.data;
            })
            .catch(error => {
                console.log(error);
            });
        connectMqtt();
    },
    methods: {
        returnToHomePage() {
            this.$router.push({ path: '/homePage' });
        },
        subscribeToLocation(){
            console.log('Subscribing to location');
            subscribe('location');
        }
    },
    mounted(){
        onMessage((topic, message) => {
            message = JSON.parse(message.toString());
            if(message.userId !== this.$cookies.get('userId')){
                return;
            }
            addLocation(message.name, this.$cookies.get('jwt'), this.$cookies.get('userId'))
                .then(response => {
                    this.locations.push(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                });
                window.location.reload();

        });
    }
}
</script>


<style scoped>
button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
}

.wrapper {
    height: 40px;
    display: flex;
    width: 100%;
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
</style>