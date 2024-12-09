<template>
    <div class="wrapper">
        <h2>{{device.name}}</h2>
        <div>
            <p v-for="(data, key) in device.metadata" :key="key">{{key}}: {{data}}</p>
        </div>
        <p>{{device.device_type}}</p>
    </div>
</template>


<script>

export default {
    props: {
       device : Object
    },
}

</script>

<style scoped>
.wrapper{
    display: flex;
    border: 1px solid black;
    margin: 10px 0;
    padding: 10px 0;
    width: 100%;
    vertical-align: top;
    border-radius: 1rem;
    cursor: pointer;
    align-items: center;
    justify-content: space -between;
}

h2, p{
    margin: 1rem;
}


button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 1rem;
}
</style>