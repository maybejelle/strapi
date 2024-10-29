<template>
    <div class="body">
        <div class="wrapper">
             <h1>Your locations</h1> 
             <button @click="addNewLocation">+</button>
        </div>
        <LocationComponent v-for="location in locations" :key="location.id" :location="location"></LocationComponent>
       
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

button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
}

.wrapper{
    height: 40px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
}

.body{
    width: 80%;
    justify-self: center;
}
</style>