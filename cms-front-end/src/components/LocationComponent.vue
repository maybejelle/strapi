<template>
    <div class="wrapper" @click="navigateToOverview">
        <h2>{{ location.name }}</h2>
        <p>{{ location.devices.length }} device(s) registered</p>
        <button @click.stop="deleteLocation">Delete</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import axios from 'axios';


export default {
    props: {
        location: Object
    },
    setup(props) {
        const router = useRouter();

        const navigateToOverview = () => {
            router.push({ path: `/device-overview/${props.location.documentId}` });
        }
        return { navigateToOverview }
    },
    methods: {
        deleteLocation() {
            console.log('delete location');
            axios.delete(`http://localhost:8888/api/locations/${this.location.documentId}`, {
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
.wrapper {
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

h2 {
    margin: 2rem;

}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 2rem;
}

.overview {
    width: 100%;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    border: none;
    padding: 0;
    margin: 0;
}
</style>
