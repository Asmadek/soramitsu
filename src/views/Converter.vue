<template>
  <div class="section">
    <div class="currencies">
      <div class="currency-selection">
                  <v-text-field
            label="Regular" type="number" v-bind:value="valueFirst" @input="onFirstInput"
          ></v-text-field>
        <v-select
          :items="fiat"
          label="Standard"
          @change="onChangeCurrency($event, 1)"

        ></v-select>
      </div>
      <div class="currency-selection">
                  <v-text-field
            label="Regular" type="number" v-bind:value="valueSecond" @input="onSecondInput"
          ></v-text-field>
        <v-select
          :items="crypto"
          label="Standard"
          @change="onChangeCurrency($event, 2)"
        ></v-select>
      </div>
    </div>
    <div class="history">
      <div class="history-chart">
        <div class="chart-controls">
        </div>
        <Chart :chartData="getData" :options="getOptions"></chart>
      </div>
      <ul class="history-items" v-if="getHistoryItems.length > 0">
        <li class="history-item" v-for="historyItem in getHistoryItems">
          {{historyItem.time}} - {{historyItem.close}} 
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Fiatcurrencies, Cryptocurrencies, HistoryData, HistoryDataItem } from "../logic/classes";
import { CurrencyDataAPI as API } from "../logic/api";
import Chart from "../components/Chart";

@Component({
  components: { Chart },
})
export default class Converter extends Vue {
  constructor() {
    super();
  }

  firstValue = 0;
  price = 1;
  secondValue = 0;

  firstCurrency: string = "";
  secondCurrency: string = "";

  fiat: Array<string> = Object.keys(Fiatcurrencies);
  crypto: Array<string> = Object.keys(Cryptocurrencies);

  historyItems: Array<any> = [];
  get getHistoryItems() {
    return this.historyItems;
  }
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        data: [40, 39, 10, 40, 39, 80, 40],
      },
    ],
  };

  get getData() {
    console.log(this.data);
    return this.data;
  }

  get getOptions() {
    return this.options;
  }

  updateHistory() {
    API.getHistory(this.firstCurrency, this.secondCurrency).then((result: HistoryData) => {
      let labels: Array<string> = [];
      let data: Array<number> = [];
      let timeOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      result.Data.forEach(item => {
        labels.push(new Date(item.time * 1000).toLocaleString("ru", timeOptions));
        data.push(item.close);
      });

      let newData = { ...this.data };

      newData.labels = labels;
      newData.datasets[0].data = data;
      this.historyItems = result.Data;
      this.data = newData;
    });
  }

  options = { responsive: true, maintainAspectRatio: false };
  onChangeCurrency(value: string, currency: any) {
    if (currency === 1) {
      this.firstCurrency = value;
    } else {
      this.secondCurrency = value;
    }

    this.updatePrice(currency);
  }

  updatePrice(currency: any) {
    if (this.firstCurrency !== "" && this.secondCurrency !== "") {
      API.getPrice(this.firstCurrency, this.secondCurrency).then((price: any) => {
        this.price = price[this.secondCurrency];

        if (currency === 1) {
          this.updateFirst();
        } else {
          this.updateSecond();
        }

        this.updateHistory();
      });
    }
  }

  get valueFirst() {
    return this.firstValue;
  }

  get valueSecond() {
    return this.secondValue;
  }

  updateSecond() {
    this.secondValue = this.firstValue * this.price;
  }

  updateFirst() {
    this.firstValue = this.secondValue / this.price;
  }

  onFirstInput(value: number) {
    this.firstValue = value;
    this.updateSecond();
  }

  onSecondInput(value: number) {
    this.secondValue = value;
    this.updateFirst();
  }
}
</script>
