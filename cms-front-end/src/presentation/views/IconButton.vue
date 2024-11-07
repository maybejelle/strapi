<template>
    <div @click="onClick">
        <button >
            <img :src="icon" alt="icon">
        </button>
        <p>{{title}}</p>
    </div>
</template>

<script>
export default {
    name: 'IconButton',
    props: {
        icon: {
            type: String,
            required: true
        },
        onClick: {
            type: Function,
            required: true
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>


<style scoped>
button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
}

div{
    background-color: transparent;
    border: 1px solid black;
    border-radius: 1rem;
    cursor: pointer;
    margin: 1rem;
}

img{
    width: 5rem;
    height: 5rem;
    margin: 1rem;
}
</style>