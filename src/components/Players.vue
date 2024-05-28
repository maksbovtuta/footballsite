<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Preloader from "./Preloader.vue";
const isLoading = ref(true);

const person  = ref({});
const props = defineProps({
  personId: String
})
onMounted(() => {
  axios.get(
    `/sportmonks-api/v4/persons/${props.personId}`,
    { headers: {'X-Auth-Token': '9a6690dd7a9c4faeb5c52dd825313059' }}
  ).then((response) => {
    person.value = response.data;
    setTimeout(()=>{isLoading.value = false}, 1000);
  });
});
</script>  

<template>
  <a class="BACKBTN" @click.prevent="$router.back()" href="#">BACK</a>
  <Preloader v-if="isLoading" />
  <div v-else class="wrapper">
    <div class="content">
      <h1>Ім'я: {{ person.name }}</h1>
      <h1>Дата народження: {{ person.dateOfBirth }}</h1>
      <h1>Национальність: {{ person.nationality }}</h1>
      <h1>Позиція: {{ person.position }}</h1>

      <template v-if="person.currentTeam && person.currentTeam.contract && person.currentTeam.contract.start !== null && person.currentTeam.contract.until !== null">
        <h1>Підписав контракт: {{ person.currentTeam.contract.start }} до {{ person.currentTeam.contract.until }}</h1>
      </template>
      
    </div>
  </div>
</template>

<style scoped>
  .content{
    padding: 30px 550px;
  }

  .BACKBTN {
  margin-left: 150px;
  display: inline-block;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease;
  border-radius: 15px;
  box-shadow: -5px 6px 15px rgba(0, 0, 0, 0.2);
}

.BACKBTN:hover {
  transform: scale(1.1);
}

.BACKBTN:active {
  transform: scale(0.9);
}
</style>