<template>
    <div @click="navigateToOverview">
        <h2>{{location.name}}</h2>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';


export default {
    props: {
       location : Object
    },
    setup(props) {
        const router = useRouter();
        const navigateToOverview = () => {
           router.push({path: `/device-overview/${props.location.documentId}`});
        }
        return { navigateToOverview }
    }
}
</script>


<style scoped>
div{
    border: 1px solid black;
    margin: 10px;
    padding: 10px;
    width: 200px;
    display: inline-block;
    vertical-align: top;
    border-radius: 1rem;
    cursor: pointer;
}

div:hover{
    transform: scale(1.05);
    transition: transform 0.2s;
}
</style>
