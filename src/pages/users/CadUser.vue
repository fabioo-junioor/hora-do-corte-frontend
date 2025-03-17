<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { FormUser, Loader } from "../../components";
import { createUser } from "../../services/api/api.user.js";

const store = useStore();
const isLoaderCad = ref(false);
const dataFormUser = reactive({
  email: "maria@bol.com",
  password: "11111111",
  confirmPassword: "11111111"

});
const create = async () => {
  isLoaderCad.value = true;
  let dataUser = await createUser(dataFormUser);
  if (dataUser.statusCode === 201) {
    isLoaderCad.value = false;
    store.commit("setAlertConfig", { message: dataUser.message, type: "positive" });
    return;

  };
  if (dataUser.statusCode === 200) {
    isLoaderCad.value = false;
    store.commit("setAlertConfig", { message: dataUser.message, type: "warning" });
    return;

  };
  isLoaderCad.value = false;
  //store.commit("setAlertConfig", { message: dataUser.message, type: "negative" });

};
</script>
<template>
  <div id="cad-user">
    <div class="cad-user-img">
      <q-img src="../../assets/logo/logo.png" height="70%" width="70%" />
    </div>
    <div class="cad-user-forms q-px-sm">
      <FormUser
        class="form-user"
        typeForm="cadUser"
        v-model:email="dataFormUser.email"
        v-model:password="dataFormUser.password"
        v-model:confirmPassword="dataFormUser.confirmPassword"
        :isLoaderTime="isLoaderCad"
        @createUser="create"
      >
        <Loader loaderSize="1.2em" loaderColor="white" />
      </FormUser>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#cad-user {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 5rem);
  font-family: "Fredoka", sans-serif;

  .cad-user-img {
    width: 50%;
    min-height: calc(100vh - 5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $darkColorSecondary;

  }
  .cad-user-forms {
    width: 50%;
    min-height: calc(100vh - 5rem);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

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
  #cad-user {
    .cad-user-img {
      width: 40%;

    }
    .cad-user-forms {
      width: 60%;

    }
  }
}
@media only screen and (max-width: 481px) {
  #cad-user {
    flex-direction: column;

    .cad-user-img {
      display: none;

    }
    .cad-user-forms {
      width: 100%;
      
    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>