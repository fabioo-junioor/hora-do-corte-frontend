<script setup>
</script>
<template>
    <div id="not-found-user">
        <q-img
            src="../assets/imgsDefault/404.png"
            style="filter: drop-shadow(2px 2px 2px white);"
            width="50%" />
        <h4 class="q-ma-md text-black">Opss! Esse usuário não existe.</h4>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#not-found-user{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 5rem);

    h4{
        font-weight: 600;
        filter: drop-shadow(2px 2px 2px white);

    }
}
</style>