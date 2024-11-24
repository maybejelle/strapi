<template>
    <div>
        <h2>{{device.name}}</h2>
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
    margin-left: 1rem;
}

button{
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin-right: 1rem;
}
</style>