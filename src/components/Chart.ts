import { Line, mixins } from "vue-chartjs";
import { Component, Prop } from "vue-property-decorator";

@Component({
  mixins: [mixins.reactiveProp],
})
export default class Chart extends Line {
  @Prop() private chartData: any;
  @Prop() private options: any;

  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
