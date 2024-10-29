<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password">
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email : '',
            password : '',
            username : ''
        }
    },
    methods : {
        register() {
            axios.post('http://localhost:8888/api/auth/local/register', {
                username : this.username,
                email : this.email,
                password : this.password
            })
            .then( response => {
                if(response.statusText === 'OK'){
                    alert('Registration successful');
                }
                this.$router.push({path: '/'});
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
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
    display: inline-block;
    border-radius: 1rem;
}

input{
    display: block;
    margin-bottom: 1rem;
}
</style>