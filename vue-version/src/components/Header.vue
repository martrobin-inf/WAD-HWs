<template>
    <header>
        <nav>
            <router-link to="/">Main</router-link>
            <router-link to="/signup">Sign Up</router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'AppHeader'
}
</script>

<style scoped>
header {
    padding: 10px;
    background-color: #f0f0f0;
    align-items: center;
}

nav a {
    margin: 20px;
    text-decoration: none;
    font-size: 26px;
    font-weight: 600;
    color:#111; 
    padding:2px 4px; 
    border-radius:4px;
    transition: background-color 0.5s;
}

nav a:hover {
    background-color: #dbdbdb;
}
</style>