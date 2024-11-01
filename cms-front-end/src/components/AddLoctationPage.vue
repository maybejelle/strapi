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
import axios from 'axios';

export default {
    data() {
        return {
            name : '',
            documentId : ''
        }
    },
    created(){
        axios.get('http://localhost:8888/api/users/me',{
            headers: {
                Authorization: `Bearer ${this.$cookies.get('jwt')}`
            }
        })
            .then(response => {
                this.documentId = response.data.documentId;

            })
            .catch(error => {
                console.log(error);
            });
    },
    methods : {
        addLocation() {
            axios.post('http://localhost:8888/api/locations',
                {
                    "data": {
                        "name": this.name,
                        "devices": [],
                        "user" : this.documentId
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
                        this.$router.push({ path: '/myHome' });
                    }
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