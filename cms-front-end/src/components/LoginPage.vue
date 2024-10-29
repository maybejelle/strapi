<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username">
            <input type="password" v-model="password" placeholder="Password">
            <button type="submit">Login</button>
            <p>no account yet? <a href="/register">register here</a></p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            username : '',
            password : ''
        }
    },
    methods : {
        login() {
            axios.post('http://localhost:8888/api/auth/local', {
                identifier : this.username,
                password : this.password
            })
            .then(response => {
                this.$cookies.set('jwt', response.data.jwt);
                this.$router.push({path: '/homePage'});
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
    margin: 1rem;
}

a{
    color: blue;
    text-decoration: none;
}
</style>