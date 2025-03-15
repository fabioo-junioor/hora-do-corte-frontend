<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { fielsRequired, emailValidator } from '../../utils/inputValidators.js';

const route = useRoute();
const emit = defineEmits(['loginUser', 'createUser', 'recoverPass']);
const props = defineProps(['typeForm', 'isLoaderTime']);
const emailUser = defineModel('email');
const passwordUser = defineModel('password');
const confirmPasswordUser = defineModel('confirmPassword');
const isPwd1 = ref(true);
const isPwd2 = ref(true);
const typeFormUser = ref('');
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório!',
    email: v => emailValidator(v) || 'Email inválido!',
    sizePassword: v => (v.length >= 8) || 'Senha deve conter no minimo 8 caracteres!'

});
const onSubmit = () => {
    if(props.typeForm == 'loginUser'){
        emit('loginUser');
        return;

    };
    if(props.typeForm == 'cadUser'){
        emit('createUser');
        return;

    };
    emit('recoverPass');
    return;
    
};
onMounted(() => {
    if(props.typeForm == 'loginUser'){
        typeFormUser.value = 'loginUser';
        return;

    };
    if(props.typeForm == 'cadUser'){
        typeFormUser.value = 'cadUser';
        return;

    };
    typeFormUser.value = 'recoverPass';
    return;

});
</script>
<template>
    <div id="form-user" class="q-ma-sm q-pa-sm">
        <q-form @submit="onSubmit">
            <q-input
                dark
                class="q-mb-md"
                color="white"
                v-model="emailUser"
                type="text"
                label="Seu e-mail *"
                lazy-rules
                :rules="[rulesUser.required, rulesUser.email]">
                <template v-slot:prepend>
                    <q-icon name="person" color="white" />
                </template>
            </q-input>
            <q-input
                dark
                v-if="typeFormUser == 'loginUser' || typeFormUser == 'cadUser'"
                class="q-mb-md"
                color="white"
                v-model="passwordUser"
                :type="isPwd1 ? 'password' : 'text'"
                label="Sua senha *"
                lazy-rules
                :rules="[rulesUser.required, rulesUser.sizePassword]">
                <template v-slot:append>
                    <q-icon :name="isPwd1 ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd1 = !isPwd1" />
                </template>
                <template v-slot:prepend>
                    <q-icon name="password" color="white" />
                </template>
            </q-input>
            <q-input
                dark
                v-if="typeFormUser == 'cadUser'"
                class="q-mb-md"
                color="white"
                v-model="confirmPasswordUser"
                :type="isPwd2 ? 'password' : 'text'"
                label="Repita a senha *"
                lazy-rules
                :rules="[rulesUser.required, rulesUser.sizePassword, v => (v === passwordUser) || 'Senhas são diferentes!']">
                <template v-slot:append>
                    <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd2 = !isPwd2" />
                </template>
                <template v-slot:prepend>
                    <q-icon name="password" color="white" />
                </template>
            </q-input>
            <q-btn
                push
                v-if="typeFormUser == 'loginUser'"
                :disable="isLoaderTime"
                class="q-mb-md"
                color="brown-14"
                :label="!isLoaderTime ? 'Entrar' : ''"
                type="submit">
                    <slot v-if="isLoaderTime" />
                </q-btn>
            <q-btn
                push
                v-if="typeFormUser == 'cadUser'"
                :disable="isLoaderTime"
                class="q-mb-md"
                color="brown-14"
                :label="!isLoaderTime ? 'Cadastrar-se' : ''"
                type="submit">
                <slot v-if="isLoaderTime" />
            </q-btn>
            <q-btn
                push
                v-if="typeFormUser == 'recoverPass'"
                :disable="isLoaderTime"
                class="q-mb-md"
                color="brown-14"
                :label="!isLoaderTime ? 'Enviar' : ''"
                type="submit">
                <slot v-if="isLoaderTime" />
            </q-btn>
            <div class="links-type-form-user column">
                <a v-if="typeFormUser == 'loginUser'"
                 href="#" class="q-my-xs">
                    <router-link to="/cadUser">Não tem uma conta?</router-link>
                </a>
                <a v-if="typeFormUser == 'cadUser'"
                    href="#" class="q-my-xs">
                    <router-link to="/loginUser">Já tem uma conta?</router-link>
                </a>
                <a v-if="typeFormUser == 'loginUser'"
                    href="#" class="q-my-xs">
                    <router-link to="/recoverPassUser">Esqueci minha senha!</router-link>
                </a>
                <a v-if="typeFormUser == 'recoverPass'"
                 href="#" class="q-my-xs">
                    <router-link to="/loginUser">Voltar</router-link>
                </a>
            </div>
        </q-form>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#form-user{
    font-family: "Fredoka", sans-serif;

    .q-form{
        width: 100%;

        .q-btn{
            height: 3rem;
            width: 100%;
            color: $whiteColorPrimary;
            background-color: $darkColorPrimary;

        }
        .links-type-form-user{
            width: 100%;
            text-align: center;
            
            a{
                text-decoration: underline;
                color: $whiteColorPrimary;
                font-size: 1rem;
                
                &:hover{
                    color: $brown-3;

                }
            }
        }
    }
}
</style>