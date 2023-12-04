<script setup>

import { onMounted, ref } from "vue";
import axios from "axios";
import Preloader from "./Preloader.vue";
const isLoading = ref(true);

const team = ref({});

const props = defineProps({
    teamId: String
})

onMounted(() => {
  axios.get(
    `/sportmonks-api/v4/teams/${props.teamId}`,
    { headers: {'X-Auth-Token': '9a6690dd7a9c4faeb5c52dd825313059' }}
).then((response) => {
    team.value = response.data;
    setTimeout(()=>{isLoading.value = false}, 1000);
    console.log(response.data);
  });
});

</script>


<template>
<Preloader v-if="isLoading" />
  <div v-else class="wrapper">

<!-- {{ team }} -->
<a class="BACKBTN" @click.prevent="$router.back()" href="#">BACK</a>
<div class="content">
<div class="info-content">
  <div class="left">
    <img :src="team.crest">
  </div>
  <div class="right">
      <h3>Назва команди: {{ team.name }}</h3>
      <h3>Адресса команди: {{ team.address }}</h3>
      <h3>Рік заснування: {{ team.founded }}</h3>
      <h3>Веб-Сайт: <a :href="team.website">{{ team.website }}</a></h3>
  </div>
</div>

<h1 class="h1-squad">Склад команди:</h1>


<table class="player-table">
  <thead>
    <tr>
      <th>Ім'я</th>
      <th>Позиція</th>
      <th>Национальність</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(player, index) in team.squad" :key="player.id">
      <td>
        <router-link :to="`/persons/${player.id}`">
          {{ player.name }}
        </router-link>
      </td>
      <td>{{ player.position }}</td>
      <td>{{ player.nationality }}</td>
    </tr>
  </tbody>
</table>
<!-- <img :src="team.area.flag" width="50">
  {{ team.squad }}
  //show all players v-for
<router-link :to="`person/:personId`">{{ squad.name }}</router-link> -->

</div>
  </div>
</template>

<style scoped> 
/* .flex-ul{
  display: flex;
}

li, a{
  margin-right: 20px;
} */

.h1-squad{
  display: flex;
    justify-content: center;
    font-size: 25px;

}

.player-info{
  display: flex;
  padding-left: 96px;
  justify-content: space-around;
}

.BACKBTN {
  /* Стили кнопки */
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
  /* Анимация при наведении */
  transform: scale(1.1);
}

.BACKBTN:active {
  /* Анимация при нажатии */
  transform: scale(0.9);
}

template{
  background-color: #aaaaaa;
}

.right h3{
  font-size: 25px;
}

.left{
  margin-right: 20px;
}

.right{
  margin-left: 20px;
}

/* Общие стили */
/* Общие стили */



.content {
  margin: 20px 270px;
  justify-content: center;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    border-radius: 15px;
}

.player-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  padding: 10px;
  text-align: left;
}

/* Стилізація рядків таблиці */
.player-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

/* Підсвічування рядків при наведенні */
.player-table tbody tr:hover {
  background-color: #f9f9f9;
}

.info-content{
  display: flex;
  justify-content: center;
}

/* Стилізація посилань у таблиці */
.player-table a {
  text-decoration: none;
  color: #0366d6;
}

.player-table a:hover {
  text-decoration: underline;
  color: #0336d6;
}

.info-squad{
  font-size: 25px;
}

</style>

