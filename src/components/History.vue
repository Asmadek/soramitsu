<template>
  <div class="history">
    <div :v-for="item in history">
      {{item}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { HistoryDataItem } from "../logic/classes";

@Component
export default class Chart extends Vue {
  @Prop() private history?: Array<HistoryDataItem>;

  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
