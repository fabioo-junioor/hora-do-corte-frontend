<script setup>
</script>
<template>
    <div id="not-found">
        <div class="not-found-alert">
            <img
                src="../assets/draw/undraw_page_not_found.svg" />
        </div>
        <div class="not-found-footer row full-width q-pa-md">
            <div class="col column justify-end">
                <div class="col row items-end">
                    <a href="https://www.instagram.com/horadocorte.real/" target="_blank">
                        <i class="bx bxl-instagram" />
                    </a>
                </div>
                <div class="col text-subtitle1 row items-end">
                    Contato: contato@gmail.com
                </div>
                <div class="col text-subtitle2 row items-end">
                    Hora do Corte, 2025. All Rights Reserved.
                </div>
            </div>
            <div class="col row justify-end">
                <q-img
                height="10rem"
                width="10rem"
                src="../assets/logo/logo.png"
                fit="contain"
                />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#not-found{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 5rem);

    .not-found-alert{
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
    }
    .not-found-footer {
        background-color: $darkColorSecondary;
        border-top: 2px solid $brown-8;
        box-shadow: 0px -1px 3px 1px $brown-7;

        i {
        font-size: 2.5rem;
        color: $brown-10;

            &:hover {
                color: $brown-8;

            }
        }
    }
}
/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
    #not-found{
        .not-found-alert{
            img{
                width: 60%;
                height: 60%;

            }        
        }
    }
}
@media only screen and (max-width: 992px) {
}
@media only screen and (max-width: 720px) {
    #not-found{
        .not-found-alert{
            img{
                width: 80%;
                height: 80%;

            }        
        }
    }
}
@media only screen and (max-width: 481px) {
}
@media only screen and (max-width: 360px) {
}
</style>