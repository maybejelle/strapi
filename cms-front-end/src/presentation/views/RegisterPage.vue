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
import { registerUseCase } from '../../application/useCases/registerUseCase';

export default {
    data() {
        return {
            email: '',
            password: '',
            username: ''
        }
    },
    methods: {
        async register() {
            await registerUseCase.execute(this.username, this.email, this.password);
            this.$router.push({ path: '/' });

        }
    }
}
</script>


<style scoped>
div {
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
    display: inline-block;
    border-radius: 1rem;
}

input {
    display: block;
    margin-bottom: 1rem;
}
</style>