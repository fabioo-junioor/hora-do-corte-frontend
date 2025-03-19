<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FormUser, Loader } from "../../components";
import { loginUser, recoverPassUser } from "../../services/api/api.user.js";
import { setDataUser } from "../../services/storage/settingSession.js";

const store = useStore();
const router = useRouter();
const isLoaderRecover = ref(false);
const dataFormUser = reactive({
  email: ""

});
const recoverPass = async () => {
  isLoaderRecover.value = true;
  let dataUser = await recoverPassUser(dataFormUser.email);
  if(dataUser?.statusCode === 201){
    isLoaderRecover.value = false;
    store.commit("setAlertConfig", { message: dataUser?.message, type: "positive" });
    return;  

  };
  if(dataUser?.statusCode === 200){
    isLoaderRecover.value = false;
    store.commit("setAlertConfig", { message: dataUser?.message, type: "warning" });
    return;  

  };
  isLoaderRecover.value = false;
  return;

};
const reloadPage = () => {
  setTimeout(() => {
    location.reload();
  }, 3000);

};
</script>
<template>
  <div id="recover-pass-user">
    <div class="recover-pass-user-img">
      <q-img
        src="../../assets/logo/logo.png"
        height="70%"
        width="70%"
        fit="contain"
      />
    </div>
    <div class="recover-pass-user-forms">
      <FormUser
        class="form-user"
        typeForm="recoverPass"
        v-model:email="dataFormUser.email"
        :isLoaderTime="isLoaderRecover"
        @recoverPass="recoverPass"
      >
        <Loader loaderSize="1.2em" loaderColor="white" />
      </FormUser>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#recover-pass-user {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Fredoka", sans-serif;

  .recover-pass-user-img {
    width: 50%;
    min-height: calc(100vh - 5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $darkColorSecondary;

  }
  .recover-pass-user-forms {
    width: 50%;
    min-height: calc(100vh - 5rem);
    display: flex;
    justify-content: center;
    align-items: center;

    .form-user {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .q-form {
        width: 100%;

      }
    }
  }
}
/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 992px) {
}
@media only screen and (max-width: 720px) {
  #recover-pass-user {
    .recover-pass-user-img {
      width: 40%;

    }
    .recover-pass-user-forms {
      width: 60%;

    }
  }
}
@media only screen and (max-width: 481px) {
  #recover-pass-user {
    flex-direction: column;

    .recover-pass-user-img {
      display: none;

    }
    .recover-pass-user-forms {
      width: 100%;
      
    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>