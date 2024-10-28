<template>
    <div>
        <h2>{{device.name}}</h2>
        <p>{{device.location}}</p>
    </div>
</template>


<script>

export default {
    props: {
       device : Object
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
}
</style>