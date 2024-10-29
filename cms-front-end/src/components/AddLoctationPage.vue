<template>
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
import axios from 'axios';

export default {
    data() {
        return {
            name : '',
        }
    },
    methods : {
        addLocation() {
            axios.post('http://localhost:8888/api/locations',
                {
                    "data": {
                        "name": this.name,
                        "devices": []
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get('jwt')}`
                    }
                }
            )
                .then(response => {
                    if (response.status === 201) {
                        alert('Location added successfully');
                        // Redirect if needed
                        // this.$router.push({ path: '/homePage' });
                    }
                })
                .catch(error => {
                    console.error("There was an error adding the location:", error);
                });
        }
    }
}
</script>