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
  <Preloader v-if="isLoading" />
  <div v-else class="wrapper">
  {{ person }}
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
    padding: 20px 270px;
  }
</style>