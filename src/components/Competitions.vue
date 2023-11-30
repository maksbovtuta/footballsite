<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const competitions = ref([]);
onMounted(() => {
  axios.get(
    "/sportmonks-api/v4/competitions/",
    { headers: {'X-Auth-Token': '9a6690dd7a9c4faeb5c52dd825313059' }}
  ).then((response) => {
    competitions.value = response.data.competitions;
  });
});
</script>

<template>
  <table class="w-full border-3 text-left">
    <tbody class="bg-slate-400">
      <tr class="border-2" v-for="(competition, index) in competitions" :key="index">

        <td class="px-6 py-4">
          <div class="emblem-card">
           <img :src="competition.emblem" width="100" class="emblem"/>
          </div>
        </td>

        <td class="px-6 py-4"><router-link :to="`/teams-by-country/${competition.code}`" class="underline">{{ competition.area.name }} - {{ competition.name }}</router-link></td>

      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.read-the-docs {
  color: rgb(89, 25, 193)}


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

.emblem {
    width: 120px;
    height: 120px;
    transition: all ease-in-out .2s;
}

  .emblem-card:hover {
    .emblem {
        width: 180px;
        height: 220px;
        transition: all ease-in-out .4s;
    }
}
</style>
