<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { fielsRequired, phoneValidator, cepValidator, fielsCheckSize } from '../../utils/inputValidators.js';

const emit = defineEmits(['saveFormUser', 'previewImage', 'searchCep']);
const dataEditUser = defineModel('dataEditUser');
const urlApp = ref('');
const rulesUser = reactive({
    required: v => fielsRequired(v) || 'Campo obrigatório!',
    phone: v => phoneValidator(v) || 'Numero incorreto!',
    cep: v => cepValidator(v) || 'Numero incorreto!',
    fielsSize: v => fielsCheckSize(v) || 'Campo deve conter no minimo 3 caracteres!'
    
});
const searchCep = () => {
    emit('searchCep');

};
const onSubmit = () => {
    emit('saveFormUser');

}
const previewImage = (event) => {
    emit('previewImage', event);

};
onMounted(() => {
    urlApp.value = import.meta.env.VITE_LINK_APP;

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
                    label="Nome do estabelecimento *"
                    lazy-rules
                    :rules="[rulesUser.required, rulesUser.fielsSize]">
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
                    label="Nome de usuário (link) *"
                    lazy-rules
                    :hint="!!dataEditUser.slug ? urlApp + dataEditUser.slug : ''"
                    :rules="[rulesUser.required, rulesUser.fielsSize]">
                    <template v-slot:prepend>
                        <q-icon name="person_search" color="white" />
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
                    label="Whatsapp *"
                    mask="(##) ####-#####"
                    lazy-rules
                    :rules="[rulesUser.required, rulesUser.phone]">
                    <template v-slot:prepend>
                        <i class='bx bxl-whatsapp text-white' />
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
                    label="Link do instagram"
                    lazy-rules>
                    <template v-slot:prepend>
                        <i class='bx bxl-instagram-alt text-white' />
                    </template>
                </q-input>
            </div>
            <q-separator dark class="q-ma-lg" color="white" />
            <div class="form-edit-user-inputs">
                <q-input
                    dark
                    filled
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditUser.cep"
                    type="text"
                    label="Cep *"
                    mask="##.###-###"
                    lazy-rules
                    :rules="[rulesUser.required, rulesUser.cep]">
                    <template v-slot:prepend>
                        <q-icon name="location_on" color="white" />
                    </template>
                    <template v-slot:after>
                        <q-btn push icon="search" color="brown-10" @click="searchCep" />
                    </template>
                </q-input>
            </div>
            <div class="form-edit-user-inputs">
                <q-input
                    dark
                    filled
                    disable
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditUser.state"
                    type="text"
                    label="Estado *"
                    lazy-rules
                    :rules="[rulesUser.required]">
                    <template v-slot:prepend>
                        <q-icon name="public" color="white" />
                    </template>    
                </q-input>
            </div>
            <div class="form-edit-user-inputs">
                <q-input
                    dark
                    filled
                    disable
                    class="q-mb-sm"
                    color="white"
                    bg-color="brown-8"
                    v-model="dataEditUser.city"
                    type="text"
                    label="Cidade *"
                    lazy-rules
                    :rules="[rulesUser.required]">
                    <template v-slot:prepend>
                        <q-icon name="location_city" color="white" />
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
                    v-model="dataEditUser.street"
                    type="text"
                    label="Logradouro *"
                    lazy-rules
                    :rules="[rulesUser.required]">
                    <template v-slot:prepend>
                        <q-icon name="signpost" color="white" />
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
                    v-model="dataEditUser.number"
                    type="text"
                    label="Numero *"
                    lazy-rules
                    :rules="[rulesUser.required]">
                    <template v-slot:prepend>
                        <q-icon name="123" color="white" />
                    </template>    
                </q-input>
            </div>
            <q-btn
                push
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