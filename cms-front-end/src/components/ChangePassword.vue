<template>
    <div>
        <button class="back" @click="returnToSettingsPage">Go Back</button>
        <div>
            <input type="password" v-model="oldPassword" placeholder="Old Password">
            <input type="password" v-model="newPassword" placeholder="New Password">
            <input type="password" v-model="confirmPassword" placeholder="Confirm Password">
            <button @click="changePassword">Change Password</button>
        </div>
    </div>
</template>


<script>
import { changePassword } from '../APICalls';
export default {
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    },
    methods: {
        changePassword() {
            if (this.newPassword !== this.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            changePassword(this.oldPassword, this.newPassword, this.$cookies.get('jwt'))
                .then(() => {
                    alert('Password changed successfully');
                    this.$router.push({ path: '/settings' });
                })
                .catch(error => {
                    console.error("There was an error changing the password:", error);
                });
        },
        returnToSettingsPage() {
            this.$router.push({ path: '/settings' });
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

button {
    background-color: transparent;
    border: 1px solid black;
    border-radius: 1rem;
    cursor: pointer;
}

input {
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    border: 1px solid black;
}

div {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>