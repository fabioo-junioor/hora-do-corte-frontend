<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { FormUser, Loader } from "../../components";
import { loginUser } from "../../services/api/api.auth.js";
import { setDataUser } from "../../services/storage/settingSession.js";

const store = useStore();
const router = useRouter();
const isLoaderLogin = ref(false);
const dataFormUser = reactive({
  email: "",
  password: ""

});
const login = async () => {
  isLoaderLogin.value = true;
  let dataUser = await loginUser(dataFormUser);
  if(dataUser?.data.length !== 0 && dataUser?.statusCode === 200) {
    isLoaderLogin.value = false;
    setDataUser(dataUser?.data);
    store.commit("setStateUser", { login: true });
    router.push({ path: "/reservations" });
    location.reload();
    return;

  };
  if(dataUser?.data.length === 0 && dataUser?.statusCode === 200) {
    isLoaderLogin.value = false;
    store.commit("setAlertConfig", { message: dataUser?.message, type: "warning" });
    return;

  };
  isLoaderLogin.value = false;
  return;

};
const reloadPage = () => {
  setTimeout(() => {
    location.reload();

  }, 3000);

};
</script>
<template>
  <div id="login-user">
    <div class="login-user-img">
      <q-img
        src="../../assets/logo/logo.png"
        height="70%"
        width="70%"
        fit="contain"
      />
    </div>
    <div class="login-user-forms">
      <FormUser
        class="form-user"
        typeForm="loginUser"
        v-model:email="dataFormUser.email"
        v-model:password="dataFormUser.password"
        :isLoaderTime="isLoaderLogin"
        @loginUser="login"
      >
        <Loader loaderSize="1.2em" loaderColor="white" />
      </FormUser>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#login-user {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Fredoka", sans-serif;

  .login-user-img {
    width: 50%;
    min-height: calc(100vh - 5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $darkColorSecondary;

  }
  .login-user-forms {
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
  #login-user {
    .login-user-img {
      width: 40%;

    }
    .login-user-forms {
      width: 60%;

    }
  }
}
@media only screen and (max-width: 481px) {
  #login-user {
    flex-direction: column;

    .login-user-img {
      display: none;

    }
    .login-user-forms {
      width: 100%;
      
    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>