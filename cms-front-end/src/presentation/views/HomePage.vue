<template>
    <div class="wrapper">
        <IconButton :icon="HomeIcon" @click="returnToHomePage" title="My home"></IconButton>
        <IconButton :icon="SettingsIcon" @click="goToSettings" title="Families"></IconButton>
    </div>
</template>

<script>
import IconButton from './IconButton.vue';
import SettingsIcon from '../../assets/settings.png';
import HomeIcon from '../../assets/home-icon.png';


export default {
    name: 'HomePage',
    components: {
        IconButton,
    },
    data() {
        return {
            HomeIcon,
            SettingsIcon
        }
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
.wrapper {
    display: flex;
    width: 10rem;
}
</style>