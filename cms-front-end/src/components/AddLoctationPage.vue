<template>
    <button class="back" @click="returnToHomePage">Go Back</button>
    <div>
        <h1>Add Location</h1>
        <form @submit.prevent="addLocation">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name">
            <button type="submit">Add Location</button>
        </form>
    </div>
</template>


<script>
import { addLocation } from '@/APICalls';

export default {
    data() {
        return {
            name: '',
            documentId: ''
        }
    },
    methods: {
        addLocation() {
            addLocation(this.name, this.$cookies.get('jwt'), this.$cookies.get('userId'))
                .then(() => {
                    alert('Location added successfully');
                    this.$router.push({ path: '/myHome' });
                })
                .catch(error => {
                    console.error("There was an error adding the location:", error);
                });
        },
        returnToHomePage() {
            this.$router.push({ path: '/myHome' });
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