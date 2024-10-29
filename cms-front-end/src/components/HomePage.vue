<template>
    <div>
        <h1>Welcome to the CMS Front End</h1>
        <p>Click on the links above to view the content</p>
        <LocationComponent v-for="location in locations" :key="location.id" :location="location"></LocationComponent>
        <div class="button" @click="addNewLocation">
            <p>Add a location</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import LocationComponent from './LocationComponent.vue';
import { useRouter } from 'vue-router';


export default {
    name: 'HomePage',
    components : {
        LocationComponent
    },
    data() {
        return {
            locations : [],
        }
    },
    created() {
        axios.get('http://localhost:8888/api/locations',{
            headers: {
                Authorization: `Bearer ${this.$cookies.get('jwt')}`
            }
        })
            .then(response => {
                console.log(response.data.data);
                this.locations = response.data.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
        setup(){
            const router = useRouter();
            const addNewLocation = () => {
                router.push({path: '/add-location'});
            }
            return { addNewLocation }
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
</style>