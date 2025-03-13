<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { FormEditPasswordUser } from "../../components";
import { updateUser } from "../../services/api/api.user.js";

const store = useStore();
const dataEditPasswordUser = reactive({
  password: "",
  newPassword: "",
  confirmPassword: "",
});
const saveFormPasswordUser = async () => {
  let dataUser = await updateUser(dataEditPasswordUser);
  if (dataUser.statusCode === 200) {
    store.commit("setAlertConfig", { message: dataUser.message, type: "warning" });
    return;

  };
  if (dataUser.statusCode === 201) {
    store.commit("setAlertConfig", { message: dataUser.message, type: "positive" });
    return;

  };
  store.commit("setAlertConfig", { message: dataUser.message, type: "negative" });
  return;

};
</script>
<template>
  <div id="edit-password-user">
    <div class="edit-password-user q-mt-xl text-white">
      <h4 class="q-mb-md">Alterar senha</h4>
      <FormEditPasswordUser
        v-model:dataEditPasswordUser="dataEditPasswordUser"
        @saveFormPasswordUser="saveFormPasswordUser"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");

#edit-password-user {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 5rem);
  font-family: "Fredoka", sans-serif;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05)),
    url("../../assets/background/background-wave.png") no-repeat fixed bottom;
  background-size: cover;

  .edit-password-user {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
}
/* Breakpoints - response*/
@media only screen and (max-width: 1560px) {
}
@media only screen and (max-width: 1200px) {
}
@media only screen and (max-width: 992px) {
  #edit-password-user {
    .edit-password-user {
      width: 90%;

    }
  }
}
@media only screen and (max-width: 720px) {
  #edit-password-user {
    .edit-password-user {
      width: 99%;

    }
  }
}
@media only screen and (max-width: 481px) {
  #edit-password-user {
    .edit-password-user {
      h4 {
        font-size: 2rem;
        
      }
    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>