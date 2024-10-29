<template>
    <div >
        <div class="overview" @click="navigateToOverview"><h2>{{location.name}}</h2></div>
        
        <button @click="deleteLocation">Delete</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';


export default {
    props: {
       location : Object
    },
    setup(props) {
        const router = useRouter();
        const navigateToOverview = () => {
           router.push({path: `/device-overview/${props.location.documentId}`});
        }
        return { navigateToOverview }
    },
    methods: {
        deleteLocation(){
            console.log('delete location');
            axios.delete(`http://localhost:8888/api/locations/${this.location.documentId}`,{
                headers: {
                    Authorization: `Bearer ${this.$cookies.get('jwt')}`
                }
            })
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
</script>


<style scoped>
div{
    display: flex;
    border: 1px solid black;
    margin: 10px 0;
    padding: 10px 0;
    width: 100%;
    vertical-align: top;
    border-radius: 1rem;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
}

h2{
    margin-left: 2rem;
}

button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 2rem;
}

.overview{
    border: none;
    padding: 0;
    margin: 0;
}
</style>
