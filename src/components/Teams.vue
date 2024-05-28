<script setup>

import { onMounted, ref } from "vue";
import axios from "axios";
import Preloader from "./Preloader.vue";
const isLoading = ref(true);

const teams = ref([]);

const props = defineProps({
  id: String
})

onMounted(() => {
  axios.get(
    `/sportmonks-api/v4/competitions/${props.id}/teams`,
    { headers: {'X-Auth-Token': '9a6690dd7a9c4faeb5c52dd825313059' }}
).then((response) => {
    teams.value = response.data.teams;
    setTimeout(()=>{isLoading.value = false}, 1000);
    console.log(response.data);
  });
});
</script>


<template>
  <Preloader v-if="isLoading" />
  <div v-else class="wrapper">
    <a class="BACKBTN" @click.prevent="$router.back()" href="#">BACK</a>
  <div class="cardpack">
      <div v-for="(team, index) in teams" :key="index">
        
          <router-link :to="`/teams/${team.id}`">
            <div class="emblem-card">
              <img :src="team.crest" width="100" class="emblem"/>
              <p class="p-emblem">{{ team.name }} - {{ team.clubColors }}</p>
            </div>
          </router-link>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.emblem-card {
      height: 220px;
      width: 180px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 20px 10px 33px;
      border-radius: 10px;
      box-shadow: -5px 6px 15px rgba(0, 0, 0, 0.2);
      background-color: #fff;
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

.emblem {
    width: 120px;
    height: 120px;
    transition: all ease-in-out .2s;
}
  .cardpack{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      padding: 0px 200px;
    }


  .emblem-card:hover {
    .emblem {
        width: 180px;
        height: 220px;
        transition: all ease-in-out .4s;
    }

    .p-emblem {
      display: none;
      transition: all ease-in-out .4s;
    }

    
}
</style>

