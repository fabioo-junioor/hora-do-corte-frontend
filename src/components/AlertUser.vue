<script setup>
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';

const store = useStore();
const $q = useQuasar();
const trigger = () => {
    $q.notify({
        message: store.getters.getAlertConfig.message,
        type: store.getters.getAlertConfig.type,
        progress: true,
        position: 'bottom',
        timeout: 2000
    });
};
onMounted(() => {
    trigger();

});
</script>
<template>
</template>