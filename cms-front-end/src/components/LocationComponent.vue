<template>
    <div @click="navigateToOverview">
        <h2>{{location.name}}</h2>
        <button>Delete</button>
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
    display: flex;
    border: 1px solid black;
    margin: 10px 0;
    padding: 10px 0;
    width: 100%;
    vertical-align: top;
    border-radius: 1rem;
    cursor: pointer;
    align-items: center;
    justify-content: space-between;
}

h2{
    margin-left: 2rem;
}

button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 2rem;
}
</style>
