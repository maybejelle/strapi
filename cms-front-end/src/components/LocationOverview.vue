<template>
    <div class="body">
        <button class="back" @click="returnToHomePage">Go Back</button>
        <div class="wrapper">
            <h1>Your locations</h1>
        </div>
        <LocationComponent v-for="location in locations" :key="location.id" :location="location"></LocationComponent>

    </div>
</template>

<script>
import LocationComponent from './LocationComponent.vue';
import HomeIcon from '../assets/home-icon.png';
import { fetchLocationsUseCase } from '../application/useCases/fetchLocationsUseCase';


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
    async created() {
        this.locations = await fetchLocationsUseCase.execute();
    },
    methods: {
        returnToHomePage() {
            this.$router.push({ path: '/homePage' });
        }
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