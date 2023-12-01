<script setup>

import { onMounted, ref } from "vue";
import axios from "axios";

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
    console.log(response.data);
  });
});

</script>


<template>

{{ team.squad }}
<h3>Назва команди: {{ team.name }}</h3>
<ul class="flex-ul">
  <li>Ім'я</li>
  <li>Позиція</li>
  <li>Национальність</li>
</ul>
<ul>
  <a>
    <router-link :to="`/persons/${player.id}`">
  <li v-for="(player, index) in team.squad" :key="player.id">
    <div class="player-info">  
    <a>{{ player.name }}</a>
      <a>{{ player.position }}</a>
      <a>{{ player.nationality }}</a>
    </div>
  </li>
  </router-link>
  </a>
</ul>
<!-- <img :src="team.area.flag" width="50">
  {{ team.squad }}
  //show all players v-for
<router-link :to="`person/:personId`">{{ squad.name }}</router-link> -->


</template>

<style scoped> 
/* .flex-ul{
  display: flex;
}

li, a{
  margin-right: 20px;
} */



.flex-ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    justify-content: space-between; /* Равномерное распределение между элементами */
    background-color: #f0f0f0; /* Цвет фона */
    padding: 8px 0; /* Отступы */
  }

  /* Стили для каждого элемента игрока */
  .player-info {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 8px 0;
  }

  .player-info a{
    flex: 1;
    text-align: center;
    text-decoration: none;
    color: #333;
  }

  .flex-ul li{
    flex: 1;
    text-align: center;
    padding: 8px 0;
    font-weight: bold;
  }
</style>

