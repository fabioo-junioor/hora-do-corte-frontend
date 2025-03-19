<script setup>
const props = defineProps(['message']);

</script>
<template>
  <div id="card-message">
    <q-card dark bordered class="my-card q-mt-lg">
        <q-card-section>
            <div class="text-h6 row justify-center">
                {{ props.message }}
            </div>
        </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#card-message{
  .my-card{
    background-color: transparent;
    width: 20rem;
    box-shadow: 0px 0px 5px 1px rgba(255, 255, 255, .1);

  }
}

/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 960px) {
}
@media only screen and (max-width: 768px) {
}
@media only screen and (max-width: 480px) {
}
@media only screen and (max-width: 320px) {
}
</style>