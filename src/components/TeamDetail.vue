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
//покажи тут інфу по teams 

</script>


<template>

{{ team.area.name }}
<img :src="team.area.flag" width="50">
  {{ team.squad }}
  //show all players v-for
<router-link :to="`person/:personId`">{{ squad.name }}</router-link>
</template>

