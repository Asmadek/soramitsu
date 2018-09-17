<template>
  <div class="section">
    <div class="currencies">
      <h1 class="headline">Bidirectional currency converter</h1>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3 class="pa-1">
          <v-text-field 
            label="Input amount to convert from" 
            type="number" 
            :value="fromValue" 
            @input="onValueChange($event, CurrencyType.CRYPTO)"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 class="pa-1">
          <v-select 
            :items="Crypto" 
            label="Choose currency to convert from" 
            @change="onCurrencyChange($event, CurrencyType.CRYPTO)"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm6 md3 class="pa-1">
          <v-text-field 
            label="Input amount to convert to" 
            type="number" 
            :value="toValue" 
            @input="onValueChange($event, CurrencyType.FIAT)"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md3 class="pa-1">
          <v-select 
            :items="Fiat" 
            label="Choose currency to convert to" 
            @change="onCurrencyChange($event, CurrencyType.FIAT)"
          ></v-select>
        </v-flex>
      </v-layout>

    </div>
    <div class="history" v-if="lastDays.length > 0">
      <v-layout row wrap>
          <v-flex xs12 sm8 md9 class="pa-1 history-header">
            <h2 class="headline">Course history for {{fromCurrency}} to {{toCurrency}}</h2>
          </v-flex>
          <v-flex xs12 sm4 md3 class="pa-1">
            <v-select 
              :items="HistoryRanges" 
              item-text="text" 
              item-value="value" 
              label="Time range" 
              :value="timeRange"
              @change="onTimeRangeChange($event)"></v-select>
          </v-flex>
          <v-flex xs12>
            <v-card class="pa-3">
            <Chart :chartData="chartData" :options="options"></chart>
            </v-card>
          </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
        <h2 class="headline my-3">Last 10 days course</h2>
          <v-data-table :headers="headers" :items="lastDays" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.time * 1000 | toDate }}</td>
              <td class="text-xs-right">{{ props.item.close }}</td>
              <td class="text-xs-right">{{ props.item.change.toFixed(2) }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Fiatcurrencies,
  Cryptocurrencies,
  CurrencyType,
  HistoryData,
  HistoryDataItem,
  HistoryRanges,
} from "@/logic/classes";
import { CurrencyDataAPI as API } from "@/logic/api";
import { toDate } from "@/logic/utils";
import Chart from "@/components/Chart";
import { Actions } from "@/logic/store-constants";

@Component({
  components: { Chart },
  filters: {
    toDate(value: number) {
      return toDate(value);
    },
  },
})
export default class Converter extends Vue {
  constructor() {
    super();
  }

  options = { responsive: true, maintainAspectRatio: false };
  Fiat: Array<string> = Object.keys(Fiatcurrencies);
  Crypto: Array<string> = Object.keys(Cryptocurrencies);
  CurrencyType = CurrencyType;
  HistoryRanges = HistoryRanges;

  headers = [
    {
      text: "Date",
      align: "left",
      sortable: false,
      value: "time",
    },
    {
      text: "Course",
      align: "right",
      sortable: false,
      value: "close",
    },
    {
      text: "Change",
      align: "right",
      sortable: false,
      value: "change",
    },
  ];

  get price() {
    return this.$store.state.price;
  }

  get fromCurrency() {
    return this.$store.state.fromCurrency;
  }

  get toCurrency() {
    return this.$store.state.toCurrency;
  }

  get lastDays() {
    return this.$store.state.lastDays;
  }

  get timeRange() {
    return this.$store.state.timeRange;
  }

  get chartData() {
    return {
      labels: this.$store.getters.historyLabels,
      datasets: [
        {
          label: `${this.fromCurrency} to ${this.toCurrency}`,
          backgroundColor: "#f87979",
          data: this.$store.getters.historyValues,
        },
      ],
    };
  }

  get fromValue() {
    return this.$store.state.fromValue;
  }

  get toValue() {
    return this.$store.state.toValue;
  }

  onCurrencyChange(currency: string, currencyType: CurrencyType) {
    this.$store.dispatch(Actions.SET_CURRENCY, {
      currency,
      currencyType,
    });
  }

  onTimeRangeChange(range: number) {
    this.$store.dispatch(Actions.SET_TIME_RANGE, range);
  }

  onValueChange(value: number, currencyType: CurrencyType) {
    this.$store.dispatch(Actions.SET_VALUE, { value, currencyType });
  }
}
</script>

<style lang="scss">
.history-header {
  display: flex;
  align-items: center;
}
</style>
