<script setup>
import { onMounted, reactive, ref } from 'vue';
import { fielsRequired, emailValidator } from '../../utils/inputValidators.js';

const emit = defineEmits(['loginUser', 'cadUser']);
const props = defineProps(['typeForm']);
const emailUser = defineModel('email');
const passwordUser = defineModel('password');
const repeatPasswordUser = defineModel('repeatPassword');
const isPwd1 = ref(true);
const isPwd2 = ref(true);
const typeFormUser = ref(true);
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório',
    email: v => emailValidator(v) || 'Email inválido'

})
const onSubmit = () => {
    if(props.typeForm == 'loginUser'){
        emit('loginUser');
        return;

    }
    emit('cadteUser');
    return;
    
}
onMounted(() => {
    typeFormUser.value = (props.typeForm == 'loginUser') || false;

})
</script>
<template>
    <div id="form-user" class="q-ma-sm q-pa-sm">
        <q-form @submit="onSubmit">
            <q-input
                dark
                class="q-mb-md"
                color="brown-8"
                v-model="emailUser"
                type="text"
                label="Seu e-mail:"
                lazy-rules
                :rules="[rulesUser.email]" />
            <q-input
                dark
                class="q-mb-md"
                color="brown-8"
                v-model="passwordUser"
                :type="isPwd1 ? 'password' : 'text'"
                label="Sua senha:"
                lazy-rules
                :rules="[rulesUser.required]">
                <template v-slot:append>
                    <q-icon :name="isPwd1 ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd1 = !isPwd1" />
                </template>
            </q-input>
            <q-input
                dark
                v-if="!typeFormUser"
                class="q-mb-md"
                color="brown-8"
                v-model="repeatPasswordUser"
                :type="isPwd2 ? 'password' : 'text'"
                label="Repita a senha:"
                lazy-rules
                :rules="[rulesUser.required, v => (v === passwordUser) || 'Senhas diferentes']">
                <template v-slot:append>
                    <q-icon :name="isPwd2 ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd2 = !isPwd2" />
                </template>
            </q-input>
            <q-btn
                v-if="typeFormUser"
                class="q-mb-md"
                label="Entrar"
                type="submit" />
            <q-btn
                v-else
                class="q-mb-md"
                label="Cadastrar-se"
                type="submit" />
            <div class="links-type-form-user q-pa-sm">
                <a v-if="typeFormUser" href="#">
                    <router-link to="/cadUser">Não tem uma conta?</router-link>
                </a>
                <a v-else href="#">
                    <router-link to="/loginUser">Já tem uma conta?</router-link>
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
                font-size: .9rem;
                
                &:hover{
                    color: $brown-8;

                }
            }
        }
    }
}
</style>