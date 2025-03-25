<script setup>
const props = defineProps(['title', 'value', 'icon', 'color']);

</script>
<template>
  <div id="card-content">
    <q-card dark flat :class="'my-card bg-'+props.color">
      <q-card-section class="card-content-infos">
        <div class="text-h5">{{ props.value }}</div>
        <div class="text-subtitle1">{{ props.title }}</div>
      </q-card-section>

      <q-separator vertical inset color="white" />

      <q-card-section class="card-content-icon q-ma-xs">
        <i :class="props.icon" />
      </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#card-content{
    .my-card{
        display: flex;
        border: 1px solid #EEEEEE;

        .card-content-infos{
            width: 85%;
            color: $whiteColorPrimary;

        }
        .card-content-icon{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 15%;
            
            i{
                font-size: 2.5rem;
                color: $whiteColorPrimary;

            }
        }
    }
}
/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 992px) {
}
@media only screen and (max-width: 720px) {
}
@media only screen and (max-width: 481px) {
}
@media only screen and (max-width: 360px) {
}
</style>