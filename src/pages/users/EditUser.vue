<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { FormEditUser, CardNotice } from "../../components";
import { cepValidator } from "../../utils/inputValidators.js";
import { cleanSpecialCharacters } from "../../utils/formatters.js";
import { charactersAndSpaces } from "../../utils/inputValidators.js";
import {
  firstCaracterName,
  mainColors,
  numberRandom,
} from "../../utils/dataUtils.js";
import userDefault from "../../assets/imgsDefault/user.png";
import { getCepUser } from "../../services/api/api.viacep.js";
import {
  createUserDetails,
  getUserDetailsByPk,
  updateUserDetails,
} from "../../services/api/api.userDetails.js";
import { getDataUser } from "../../services/storage/settingSession.js";

const store = useStore();
const isNotice = ref(false);
const isDetailsExists = ref(false);
const imageProfile = ref(null);
const numberRandomColor = ref(0);
const dataEditUser = reactive({
  image: null,
  name: "",
  slug: "",
  phone: "",
  instagram: "",
  cep: "",
  state: "",
  city: "",
  street: "",
  number: "",
});
const noticeList = reactive([
  "1. Campos com (*) são obrigatórios!",
  "2. O campo 'nome de usuário (link)' pode ser o mesmo nome do estabelecimento, porem sem [espaços e caracteres especiais]!",
  "2.1. O campo 'nome de usuário (link)' é como os clientes vão achar o seu estabelecimento!",
]);
const saveFormUser = async () => {
  dataEditUser.cep = cleanSpecialCharacters(dataEditUser.cep);
  dataEditUser.phone = cleanSpecialCharacters(dataEditUser.phone);
  let dataUserStorage = getDataUser();

  if (charactersAndSpaces(dataEditUser.slug)) {
    store.commit("setAlertConfig", {
      message: "Nome de usuário (link) inválido!",
      type: "warning",
    });
    return;
  }
  if (isDetailsExists.value) {
    let dataUser = await updateUserDetails(
      dataEditUser,
      dataUserStorage.pkUser
    );
    if (dataUser.statusCode === 201) {
      store.commit("setAlertConfig", {
        message: dataUser.message,
        type: "positive",
      });
      return;
    }
    if (dataUser.statusCode === 200) {
      store.commit("setAlertConfig", {
        message: dataUser.message,
        type: "warning",
      });
      return;
    }
    store.commit("setAlertConfig", {
      message: dataUser.message,
      type: "negative",
    });
    return;
  }
  let dataUser = await createUserDetails(dataEditUser, dataUserStorage.pkUser);
  if (dataUser.statusCode === 201) {
    store.commit("setAlertConfig", {
      message: dataUser.message,
      type: "positive",
    });
    return;
  }
  if (dataUser.statusCode === 200) {
    store.commit("setAlertConfig", { message: dataUser.message, type: "info" });
    return;
  }
  store.commit("setAlertConfig", {
    message: dataUser.message,
    type: "negative",
  });
  return;
};
const previewImage = (event) => {
  var input = event.target;
  if (input.files && input.files[0]) {
    var render = new FileReader();
    render.onload = (e) => {
      imageProfile.value = e.target.result;
    };
    render.readAsDataURL(input.files[0]);
  }
};
const getUserDetails = async () => {
  let dataUserStorage = getDataUser();
  let dataUser = await getUserDetailsByPk(dataUserStorage.pkUser);
  if (dataUser.statusCode === 200 && dataUser.data?.length !== 0) {
    dataEditUser.name = dataUser.data[0].name;
    dataEditUser.slug = dataUser.data[0].slug;
    dataEditUser.phone = dataUser.data[0].phone;
    dataEditUser.instagram = dataUser.data[0].instagram;
    dataEditUser.cep = dataUser.data[0].cep;
    dataEditUser.state = dataUser.data[0].state;
    dataEditUser.city = dataUser.data[0].city;
    dataEditUser.street = dataUser.data[0].street;
    dataEditUser.number = dataUser.data[0].number;
    isDetailsExists.value = true;
    return;
  }
  if (dataUser.statusCode === 200 && dataUser.data?.length === 0) {
    store.commit("setAlertConfig", { message: dataUser.message, type: "info" });
    isDetailsExists.value = false;
    return;
  }
  store.commit("setAlertConfig", {
    message: dataUser.message,
    type: "negative",
  });
  isDetailsExists.value = false;
  return;
};
const searchCep = async () => {
  if (!cepValidator(dataEditUser.cep)) {
    dataEditUser.state = "";
    dataEditUser.city = "";
    dataEditUser.street = "";
    return;
  }
  let cleanString = cleanSpecialCharacters(dataEditUser.cep);
  let dataCep = await getCepUser(cleanString);
  dataEditUser.state = dataCep.estado;
  dataEditUser.city = dataCep.localidade;
  dataEditUser.street = dataCep.logradouro;
  return;
};
watch(
  () => dataEditUser.image,
  () => {
    imageProfile.value = !dataEditUser.image ? userDefault : imageProfile.value;
  }
);
onMounted(async () => {
  numberRandomColor.value = numberRandom(mainColors.length);
  isNotice.value = noticeList.length != 0 || false;
  await getUserDetails();
});
</script>
<template>
  <div id="edit-user">
    <CardNotice
      class="full-width q-pa-md"
      v-if="isNotice"
      v-model:isNotice="isNotice"
      :noticeList="noticeList"
    />
    <div class="edit-user q-mt-xl text-white">
      <h4 class="q-ma-none">Informações do estabelecimento</h4>
      <div class="edit-user-image q-my-md">
        <q-avatar
          :style="
            `background-color: ${mainColors[numberRandomColor].color};` +
            `border: 1px solid ${mainColors[numberRandomColor].colorContrast};`
          "
        >
          <p :style="`color: ${mainColors[numberRandomColor].colorContrast};`">
            {{ firstCaracterName(dataEditUser.name) }}
          </p>
        </q-avatar>
      </div>
      <FormEditUser
        v-model:dataEditUser="dataEditUser"
        @previewImage="previewImage"
        @saveFormUser="saveFormUser"
        @searchCep="searchCep"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap");
#edit-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 5rem);
  font-family: "Fredoka", sans-serif;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05)),
    url("../../assets/background/background-wave.png") no-repeat fixed bottom;
  background-size: cover;

  .edit-user {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .edit-user-image {
      .q-avatar {
        width: 15rem;
        height: 15rem;

        p {
          font-size: 7rem;

        }
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
  #edit-user {
    .edit-user {
      width: 90%;

    }
  }
}
@media only screen and (max-width: 720px) {
  #edit-user {
    .edit-user {
      width: 99%;

      h4 {
        text-align: center;

      }
    }
  }
}
@media only screen and (max-width: 481px) {
  #edit-user {
    .edit-user {
      h4 {
        font-size: 2rem;
        
      }
    }
  }
}
@media only screen and (max-width: 360px) {
}
</style>