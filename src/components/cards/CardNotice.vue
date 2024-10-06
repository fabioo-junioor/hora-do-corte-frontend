<script setup>
const props = defineProps(['noticeList']);
const isNotice = defineModel('isNotice');

</script>
<template>
  <div id="card-notice">
    <q-card dark class="my-card row q-pa-xs bg-red-10">
        <q-card-section
            class="col-11 q-pa-none column">
            <div v-for="i in props.noticeList" :key="i"
                class="text-subtitle2 q-my-xs q-ml-md">
                {{ i }}
            </div>
        </q-card-section>
        <q-card-section class="card-notice-btn-close col-1 row justify-end items-start q-pa-none">
            <q-btn
                round
                @click="isNotice = false"
                size="sm"
                color="brown-9"
                icon="close" />
        </q-card-section>
    </q-card>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

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