<script setup>

import { onMounted, ref } from "vue";
import axios from "axios";

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
    console.log(response.data);
  });
});
//покажи тут інфу по teams 

</script>


<template>
  <table class="w-full border-3 text-left">
    <tbody class="bg-slate-400">
      <tr class="border-2" v-for="(team, index) in teams" :key="index">
        <td class="px-6 py-4"><img :src="team.crest" width="100" /></td>
        <td class="px-6 py-4">
          <router-link :to="`/teams/${team.id}`" class="underline">
            {{ team.name }} - {{ team.clubColors }}
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

