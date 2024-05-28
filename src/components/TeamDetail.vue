<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Preloader from "./Preloader.vue";

const isLoading = ref(true);
const isMatchesLoading = ref(true);

const team = ref({});
const matches = ref([]);
const data_of_match = ref(null);

const props = defineProps({
    teamId: String,
    competitionId: String
});

onMounted(async () => {
  try {
    const teamResponse = await axios.get(
      `/sportmonks-api/v4/teams/${props.teamId}`,
      { headers: { 'X-Auth-Token': '9a6690dd7a9c4faeb5c52dd825313059' } }
    );
    team.value = teamResponse.data;
    isLoading.value = false;
    console.log('Team data:', teamResponse.data);
  } catch (error) {
    console.error('Error fetching team data:', error);
    isLoading.value = false;
  }

  try {
    const matchesResponse = await axios.get(
      `/sportmonks-api/v4/teams/${props.teamId}/matches`,
      { headers: { 'X-Auth-Token': '9a6690dd7a9c4faeb5c52dd825313059' } }
    );
    matches.value = matchesResponse.data.matches;
    isMatchesLoading.value = false;
    console.log('Matches data:', matchesResponse.data);
  } catch (error) {
    console.error('Error fetching matches data:', error);
    isMatchesLoading.value = false;
  }
});
const findByDate = () => {
    matches.value = matches.value.filter(match => { 
      console.log( data_of_match.value)
      return (new Date(match.utcDate).toLocaleDateString()).toString() == new Date(data_of_match.value).toLocaleDateString().toString();
  })
  console.log(matches.value);
}
</script>

<template>
  <Preloader v-if="isLoading || isMatchesLoading" />
  <div v-else class="wrapper">
    <a class="BACKBTN" @click.prevent="$router.back()" href="#">BACK</a>
    <div class="content">
      <div class="info-content">
        <div class="left">
          <img :src="team.crest" />
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

      <h1 class="h1-matches">Матчи команды:</h1>

      <input type="date" v-model="data_of_match"><button @click="findByDate()">Знайти по даті</button>
      <button @click="showAll()">Показати всі</button>
      <table class="matches-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Домашняя команда</th>
            <th>Гостевая команда</th>
            <th>Счет</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(match, index) in matches" :key="match.id">
            <td>{{ new Date(match.utcDate).toLocaleDateString() }}</td>
            <td>{{ match.homeTeam.name }}</td>
            <td>{{ match.awayTeam.name }}</td>
            <td>{{ match.score.fullTime.home }} - {{ match.score.fullTime.away }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.h1-squad {
  display: flex;
  justify-content: center;
  font-size: 25px;
}

.player-info {
  display: flex;
  padding-left: 96px;
  justify-content: space-around;
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

template {
  background-color: #aaaaaa;
}

.right h3 {
  font-size: 25px;
}

.left {
  margin-right: 20px;
}

.right {
  margin-left: 20px;
}

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

.matches-table th{
  background-color: #f2f2f2;
  font-weight: bold;
  padding: 10px;
  text-align: left;
}

.matches-table td{
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.player-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.matches-table tbody tr:hover {
  background-color: #f9f9f9;
}

.player-table tbody tr:hover {
  background-color: #f9f9f9;
}

.info-content {
  display: flex;
  justify-content: center;
}

.player-table a {
  text-decoration: none;
  color: #0366d6;
}

.player-table a:hover {
  text-decoration: underline;
  color: #0336d6;
}

.info-squad {
  font-size: 25px;
}

.h1-matches{
  display: flex;
  justify-content: center;
  font-size: 25px;
}


</style>
