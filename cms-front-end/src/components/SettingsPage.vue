<template>
    <div>
        <h1>Settings</h1>
        <button class="back" @click="returnToHomePage">Go Back</button>
        <div class="profile">
            <div>
                <p>name: {{ name }}</p>
                <p>email: {{ email }}</p>
            </div>
            <button @click="changePassword">Change Password</button>
        </div>

    </div>
</template>


<script>
import { getPersonalData } from '../infrastructure/APICalls';
export default {
    data() {
        return {
            name: '',
            email: ''
        }
    },
    created() {
        getPersonalData(this.$cookies.get('jwt'))
            .then(response => {
                this.name = response.data.username
                this.email = response.data.email
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        returnToHomePage() {
            this.$router.push({ path: '/homePage' });
        },
        changePassword() {
            this.$router.push({ path: '/changePassword' });
        }
    }
}
</script>


<style scoped>
.profile {
    display: flex;
    border: 1px solid black;
    border-radius: 1rem;
    text-align: left;
    padding: 0 1rem;
    width: 30%;
}

.profile button {
    margin-left: auto;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

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