<script setup>
import { useStore } from 'vuex';

const store = useStore();
const closeCard = () => {
    store.commit('setAlertNotice', { isAlertNotice: false, message: '' });
    return;

};
</script>
<template>
    <div id="card-alert-notice">
        <q-card dark flat class="my-card">
            <q-card-section class="row justify-start items-center q-pa-sm q-mr-lg">
                <q-icon
                    class="q-ma-xs"
                    name="warning"
                    color="warning"
                    size="1.2rem" />
                    <div class="text-subtitle2">
                        {{ store.getters.getAlertNotice.message }}
                    </div>
            </q-card-section>
            <q-btn
                flat
                rounded
                padding="xs"
                @click="closeCard"
                size="md"
                color="white"
                icon="close" />
        </q-card>
    </div>
</template>
<style lang="scss" scoped>
    #card-alert-notice{
        max-width: 15rem;
        position: fixed;
        left: .3rem;
        bottom: .3rem;

        .my-card{
            background-color: rgba(0, 0, 0, .3);
            border: 1px solid rgba(0, 0, 0, .4);
            color: rgba(255, 255, 255, .7);

            .q-btn{
                position: absolute;
                top: 1px;
                right: 1px;

            }            
        }
    }
</style>