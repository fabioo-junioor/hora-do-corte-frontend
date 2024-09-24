<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { fielsRequired, phoneValidator } from '../../utils/inputValidators.js';

const emit = defineEmits(['saveFormUser', 'previewImage']);
const dataEditUser = defineModel('dataEditUser');
const url = ref('');
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório',
    phone: v => phoneValidator(v) || 'Numero incorreto'
    
});
const onSubmit = () => {
    emit('saveFormUser');

}
const previewImage = (event) => {
    emit('previewImage', event);

};
onMounted(() => {
    url.value = 'https://horadocorte.netlify.app/';

});
</script>
<template>
    <div id="form-edit-user">
        <q-form @submit="onSubmit">
            <div class="form-edit-user-inputs">
                <q-file
                    dark
                    filled
                    class="q-mb-md"
                    @input="previewImage"
                    v-model="dataEditUser.image"
                    label="Adicionar nova imagem"
                    color="white"
                    bg-color="brown-8"
                    max-files="1">
                        <template v-if="dataEditUser.image" v-slot:append>
                            <q-icon name="cancel" 
                                @click.stop.prevent="dataEditUser.image = null"
                                class="cursor-pointer" />
                        </template>
                        <template v-slot:prepend>
                            <q-icon name="add_photo_alternate" color="white" />
                        </template>
                    </q-file>
            </div>
            <div class="form-edit-user-inputs">
                <q-input
                    dark
                    filled
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditUser.name"
                    type="text"
                    label="Nome do estabelecimento"
                    lazy-rules
                    :rules="[rulesUser.required]">
                    <template v-slot:prepend>
                        <q-icon name="person" color="white" />
                    </template>
                </q-input>
            </div>
            <div class="form-edit-user-inputs">
                <q-input
                    dark
                    filled
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditUser.slug"
                    type="text"
                    label="Nome de usuário"
                    lazy-rules
                    :hint="!dataEditUser.slug ? null : url + dataEditUser.slug"
                    :rules="[rulesUser.required]">
                    <template v-slot:prepend>
                        <q-icon name="attribution" color="white" />
                    </template>
                </q-input>
            </div>
            <div class="form-edit-user-inputs">
                <q-input
                    dark
                    filled
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditUser.phone"
                    type="tel"
                    label="Seu telefone"
                    lazy-rules
                    mask="(##) ####-#####"
                    :rules="[rulesUser.required, rulesUser.phone]">
                    <template v-slot:prepend>
                        <q-icon name="phone_iphone" color="white" />
                    </template>    
                </q-input>
            </div>
            <div class="form-edit-user-inputs">
                <q-input
                    dark
                    filled
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditUser.instagram"
                    type="text"
                    label="Link do instagram:"
                    lazy-rules>
                    <template v-slot:prepend>
                        <i class='bx bxl-instagram-alt' />
                    </template>
                </q-input>
            </div>
            <q-btn
                class="q-my-lg"
                color="brown-9"
                label="Salvar"
                type="submit" />
        </q-form>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
#form-edit-user{
    width: 100%;
    font-family: "Fredoka", sans-serif;

    .q-form{
        width: 100%;

        .form-edit-user-inputs{
            display: flex;
            align-items: flex-start;

            i{
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 2rem;

            }
            .q-input, .q-file{
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