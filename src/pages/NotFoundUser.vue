<script setup>
import { onMounted, reactive } from 'vue';

const contactHDC = reactive({
  email: '',
  instagram: ''

});
onMounted(() => {
    contactHDC.email = import.meta.env.VITE_CONTACT_EMAIL || '--';
    contactHDC.instagram = import.meta.env.VITE_CONTACT_INSTAGRAM || '';

});
</script>
<template>
    <div id="not-found-page">
        <div class="not-found-page-alert">
            <img
                src="../assets/draw/undraw_page_not_found.svg" />
            <h4 class="q-mt-md text-white">Opss! Esse usuário não existe.</h4>
        </div>
        <div class="not-found-page-footer row full-width q-pa-md">
            <div class="col column justify-end">
                <div class="col row items-end">
                    <a :href="`https://www.instagram.com/${contactHDC.instagram}/`" target="_blank">
                        <i class="bx bxl-instagram" />
                    </a>
                </div>
                <div class="col text-subtitle1 row items-end">
                    Contato: {{ contactHDC.email }}
                </div>
                <div class="col text-subtitle2 row items-end">
                    Hora do Corte, 2025. All Rights Reserved.
                </div>
            </div>
            <div class="col row justify-end">
                <q-img
                height="10rem"
                width="10rem"
                src="../assets/logo/logo_transparent.png"
                fit="contain"
                />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#not-found-page{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 5rem);

    .not-found-page-alert{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: calc(100vh - 17rem);

        img{
            width: 40%;
            height: 40%;

        }        
        h4{
            font-weight: 600;
    
        }
    }
    .not-found-page-footer {
        width: 100%;
        background-color: $darkColorSecondary;
        border-top: 2px solid $brown-8;
        box-shadow: 0 -2px 6px rgba(0, 0, 0, .2);
        padding: 1rem 2rem;

        .col {
            color: $grey-3;

        }
        i {
            font-size: 2rem;
            color: $brown-8;
            transition: color .3s ease;

            &:hover {
                color: $brown-5;

            }
        }
    }
}
/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
    #not-found-page{
        .not-found-page-alert{
            img{
                width: 60%;
                height: 60%;
                
            }       
            h4{
                font-size: 1.5rem;
        
            }
        }
    }
}
@media only screen and (max-width: 992px) {
}
@media only screen and (max-width: 720px) {
    #not-found-page{
        .not-found-page-alert{
            img{
                width: 80%;
                height: 80%;

            }         
            h4{
                font-size: 1.2rem;
        
            }
        }
    }
}
@media only screen and (max-width: 481px) {
}
@media only screen and (max-width: 360px) {
}
</style>