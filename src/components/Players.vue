<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const competitions = ref([]);
onMounted(() => {
  axios.get(
    `/sportmonks-api/v4/persons/${teamId}`,
    { headers: {'X-Auth-Token': '9a6690dd7a9c4faeb5c52dd825313059' }}
  ).then((response) => {
    competitions.value = response.data.competitions;
  });
});
</script>  

<template>
    <div>
      <h2>Player</h2>
      <ul>
        <li v-for="(player, index) in players" :key="index">
          
          {{ player.name }} - {{ player.position }}
        </li>
      </ul>
    </div>
  </template>