<template>
    <div class="body">
        <button class="back" @click="returnToMyHome">Go Back</button>
        <div class="wrapper">
            <h2>Logs</h2>
        </div>
        <div class="log" v-for="log in logs" :key="log.id">
            <p>{{log.logType}}</p>
            <p>{{log.description}}</p>
        </div>
    </div>

</template>

<script>
import { fetchLogsUseCase } from '../../application/useCases/fetchLogsUseCase';
export default {
    data() {
        return {
            logs : [],
        }
    },
    async created() {
        const response = await fetchLogsUseCase.execute();
        this.logs = response;
    },
    methods: {
        returnToMyHome() {
            this.$router.push({ path: '/homePage' });
        }
    }
}

</script>


<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
    height: 2rem;
}

.log{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    border-radius: 0.5rem;
    margin: 1rem 0;
    
}

.log p {
    margin: 1rem;
}


.body {
    width: 80%;
    justify-self: center;
}

.back {
    position: absolute;
    margin: 1rem;
    border: 1px solid black;
    border-radius: 1rem;
    cursor: pointer;
    top: 2rem;
    right: 2rem;
    font-size: 1rem;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
}
</style>