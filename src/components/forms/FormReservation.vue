<script setup>
import { reactive, ref } from 'vue';
import { fielsRequired, emailValidator, phoneValidator, fielsCheckSize } from '../../utils/inputValidators.js';

const dataFormReservation = defineModel('dataFormReservation');
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório!',
    email: v => emailValidator(v) || 'Email inválido!',
    phone: v => phoneValidator(v) || 'Telefone inválido!',
    fielsSize: v => fielsCheckSize(v) || 'Campo deve conter no minimo 3 caracteres!'

})
</script>
<template>
    <div id="form-user" class="q-ma-sm q-pa-sm">
        <q-form @submit="onSubmit">
            <q-input
                dark
                filled
                class="q-mb-sm"
                color="white"
                bg-color="brown-8"
                v-model="dataFormReservation.name"
                type="text"
                label="Nome completo *"
                lazy-rules
                :rules="[rulesUser.required, rulesUser.fielsSize]">
                <template v-slot:prepend>
                    <q-icon name="person" color="white" />
                </template>
            </q-input>
            <q-input
                dark
                filled
                class="q-mb-sm"
                color="white"
                bg-color="brown-8"
                v-model="dataFormReservation.email"
                type="text"
                label="Seu email "
                lazy-rules
                :rules="[rulesUser.email]">
                <template v-slot:prepend>
                    <q-icon name="mail" color="white" />
                </template>
            </q-input>
            <q-input
                dark
                filled
                class="q-mb-sm"
                color="white"
                bg-color="brown-8"
                v-model="dataFormReservation.phone"
                type="tel"
                label="Seu telefone *"
                mask="(##) #### - #####"
                lazy-rules
                :rules="[rulesUser.required, rulesUser.phone]">
                <template v-slot:prepend>
                    <q-icon name="phone_iphone" color="white" />
                </template>
            </q-input>
            <q-input
                dark
                filled
                clearable
                color="white"
                bg-color="brown-8"
                v-model="dataFormReservation.observation"
                type="textarea"
                label="Observações " />
        </q-form>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

</style>