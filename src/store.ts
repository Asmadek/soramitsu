import Vue from "vue";
import Vuex, { ActionTree, MutationTree, GetterTree } from "vuex";
import { CurrencyDataAPI } from "./logic/api";
import { CurrencyType, HistoryDataItem, HistoryData, HistoryRanges } from "./logic/classes";
import { toDate } from "./logic/utils";
Vue.use(Vuex);

interface State {
  fromValue: number;
  fromCurrency: string;
  toValue: number;
  toCurrency: string;
  price: number;
  history: HistoryDataItem[];
  lastDays: HistoryDataItem[];
  timeRange: number;
}

const state: State = {
  fromValue: 0,
  toValue: 0,
  fromCurrency: "",
  toCurrency: "",
  price: 1,
  history: [],
  lastDays: [],
  timeRange: HistoryRanges[0].value,
};

const getters: GetterTree<State, any> = {
  historyLabels(state) {
    return state.history.map((item: HistoryDataItem) => toDate(item.time * 1000));
  },
  historyValues(state) {
    return state.history.map((item: HistoryDataItem) => item.close);
  },
};

const mutations: MutationTree<State> = {
  setFromValue(state, value: number) {
    state.fromValue = value;
  },
  setToValue(state, value: number) {
    state.toValue = value;
  },
  setFromCurrency(state, currency) {
    state.fromCurrency = currency;
  },
  setToCurrency(state, currency) {
    state.toCurrency = currency;
  },
  setPrice(state, price) {
    state.price = price;
  },
  setHistory(state, history) {
    state.history = history;
  },
  setLastDays(state, lastDays) {
    state.lastDays = lastDays;
  },
  setTimeRange(state, range) {
    state.timeRange = range;
  },
};

const actions: ActionTree<State, any> = {
  setCurrency({ commit, dispatch, state }, payload: any) {
    const mutationTitle =
      payload.currencyType === CurrencyType.CRYPTO ? "setFromCurrency" : "setToCurrency";
    commit(mutationTitle, payload.currency);

    if (!!state.fromCurrency && !!state.toCurrency) {
      dispatch("updatePrice");
    }
  },

  setValue({ commit, state }, payload: any) {
    const value = parseInt(payload.value, 10);

    if (payload.currencyType === CurrencyType.CRYPTO) {
      commit("setFromValue", value);
      commit("setToValue", value * state.price);
    } else {
      commit("setFromValue", value / state.price);
      commit("setToValue", value);
    }
  },

  setTimeRange({ commit, dispatch }, range) {
    commit("setTimeRange", range);
    dispatch("updateHistory");
  },

  updatePrice({ commit, dispatch, state }) {
    CurrencyDataAPI.getPrice(state.fromCurrency, state.toCurrency).then(result => {
      commit("setPrice", result[state.toCurrency]);
      dispatch("updateLastDays");
      dispatch("updateHistory");
    });
  },

  updateHistory({ commit, state }) {
    CurrencyDataAPI.getHistory(state.fromCurrency, state.toCurrency, state.timeRange).then(
      (result: HistoryData) => {
        commit("setHistory", result.Data);
      },
    );
  },

  updateLastDays({ commit, state }) {
    CurrencyDataAPI.getHistory(state.fromCurrency, state.toCurrency, 10).then(
      (result: HistoryData) => {
        const historyData = result.Data.reduce(
          (result: HistoryDataItem[], item: HistoryDataItem) => {
            if (result.length > 0) {
              result.push({
                ...item,
                change: item.close - result[result.length - 1].close,
              });
            } else {
              result.push(item);
            }

            return result;
          },
          [],
        ).reverse();

        if (historyData.length > 0) {
          historyData.pop();
        }
        commit("setLastDays", historyData);
      },
    );
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
