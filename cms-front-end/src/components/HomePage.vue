<template>
    <div>
        <h1>Welcome to the CMS Front End</h1>
        <p>Click on the links above to view the content</p>
        <p>{{ intro }}</p>
        <LocationComponent v-for="location in locations" :key="location.id" :location="location"></LocationComponent>
    </div>
</template>

<script>
import axios from 'axios';
import LocationComponent from './LocationComponent.vue';


export default {
    name: 'HomePage',
    components : {
        LocationComponent
    },
    data() {
        return {
            intro : '',
            locations : [],
        }
    },
    created() {
        axios.get('http://localhost:8888/api/home-page?populate=locations',{
            headers: {
                Authorization: `Bearer ${this.$cookies.get('jwt')}`
            }
        })
            .then(response => {
                this.intro = response.data.data.intro;
                this.locations = response.data.data.locations;
            })
            .catch(error => {
                console.log(error);
            });
        }
}
</script>
