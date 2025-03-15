<script setup>
import { reactive, ref } from 'vue';
import { fielsRequired, phoneValidator, charactersAndSpaces } from '../../utils/inputValidators.js';

const emit = defineEmits(['saveFormPasswordUser']);
const props = defineProps(['isLoaderTime']);
const isPwd1 = ref(true);
const isPwd2 = ref(true);
const isPwd3 = ref(true);
const dataEditPasswordUser = defineModel('dataEditPasswordUser');
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório!',
    sizePassword: v => (v.length >= 8) || 'Senha deve conter no minimo 8 caracteres!'
    
});
const onSubmit = () => {
    emit('saveFormPasswordUser');

};
</script>
<template>
    <div id="form-edit-password-user">
        <q-form @submit="onSubmit">
            <div class="form-edit-password-user-inputs">
                <q-input
                    dark
                    filled
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditPasswordUser.password"
                    :type="isPwd1 ? 'password' : 'text'"
                    label="Sua senha atual *"
                    lazy-rules
                    :rules="[rulesUser.required, rulesUser.sizePassword]">
                    <template v-slot:append>
                        <q-icon
                            @click="isPwd1 = !isPwd1"
                            :name="isPwd1 ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            color="white" />
                    </template>
                    <template v-slot:prepend>
                        <q-icon name="password" size="md" color="white" />
                    </template>
                </q-input>
            </div>
            <div class="form-edit-password-user-inputs">
                <q-input
                    dark
                    filled
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditPasswordUser.newPassword"
                    :type="isPwd2 ? 'password' : 'text'"
                    label="Sua nova senha *"
                    lazy-rules
                    :rules="[rulesUser.required, rulesUser.sizePassword]">
                    <template v-slot:append>
                        <q-icon
                            @click="isPwd2 = !isPwd2"
                            :name="isPwd2 ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            color="white" />
                    </template>
                    <template v-slot:prepend>
                        <q-icon name="password" size="md" color="white" />
                    </template>
                </q-input>
            </div>
            <div class="form-edit-password-user-inputs">
                <q-input
                    dark
                    filled
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditPasswordUser.confirmPassword"
                    :type="isPwd3 ? 'password' : 'text'"
                    label="Confirmar sua nova senha *"
                    lazy-rules
                    :rules="[rulesUser.required, rulesUser.sizePassword, v => (v === dataEditPasswordUser.newPassword) || 'Senhas são diferentes!']">
                    <template v-slot:append>
                        <q-icon
                            @click="isPwd3 = !isPwd3"
                            :name="isPwd3 ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            color="white" />
                    </template>
                    <template v-slot:prepend>
                        <q-icon name="password" size="md" color="white" />
                    </template>
                </q-input>
            </div>
            <q-btn
                push
                :disable="isLoaderTime"
                class="q-my-lg"
                color="brown-9"
                :label="!isLoaderTime ? 'Salvar' : ''"
                type="submit">
                <slot v-if="isLoaderTime" />    
            </q-btn>
        </q-form>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
#form-edit-password-user{
    width: 100%;
    font-family: "Fredoka", sans-serif;

    .q-form{
        width: 100%;

        .form-edit-password-user-inputs{
            display: flex;
            align-items: flex-start;

            .q-input{
                width: 100%;

            }
        }
        .q-btn{
            height: 3rem;
            width: 100%;

        }
    }
}
</style>