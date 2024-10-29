<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username">
            <input type="password" v-model="password" placeholder="Password">
            <button type="submit">Login</button>
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