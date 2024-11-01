<template>
    <div class="wrapper">
        <IconButton :icon="HomeIcon" @click="returnToHomePage" title="My home"></IconButton>
        <IconButton :icon="SettingsIcon" @click="goToSettings" title="Settings"></IconButton>
    </div>
</template>

<script>
import axios from 'axios';
import IconButton from './IconButton.vue';
import SettingsIcon from '../assets/settings.png';
import HomeIcon from '../assets/home-icon.png';


export default {
    name: 'HomePage',
    components : {
        IconButton,
    },
    data() {
        return {
            locations : [],
            HomeIcon,
            SettingsIcon
        }
    },
    created() {
        axios.get('http://localhost:8888/api/locations',{
            headers: {
                Authorization: `Bearer ${this.$cookies.get('jwt')}`
            }
        })
            .then(response => {
                console.log(response.data.data);
                this.locations = response.data.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
        methods: {
            returnToHomePage() {
                this.$router.push({ path: '/myHome' });
            },
            goToSettings() {
                this.$router.push({ path: '/settings' });
            }
        }
}
</script>


<style scoped>
div{
    width: 10rem;
}
</style>