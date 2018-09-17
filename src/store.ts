import Vue from "vue";
import Vuex, { ActionTree, MutationTree, GetterTree } from "vuex";
import { CurrencyDataAPI } from "@/logic/api";
import { CurrencyType, HistoryDataItem, HistoryData, HistoryRanges } from "@/logic/classes";
import { toDate } from "@/logic/utils";
import { Mutations, Actions } from "@/logic/store-constants";
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
  [Mutations.SET_FROM_VALUE](state, value: number) {
    state.fromValue = value;
  },
  [Mutations.SET_TO_VALUE](state, value: number) {
    state.toValue = value;
  },
  [Mutations.SET_FROM_CURRENCY](state, currency) {
    state.fromCurrency = currency;
  },
  [Mutations.SET_TO_CURRENCY](state, currency) {
    state.toCurrency = currency;
  },
  [Mutations.SET_PRICE](state, price) {
    state.price = price;
  },
  [Mutations.SET_HISTORY](state, history) {
    state.history = history;
  },
  [Mutations.SET_LAST_DAYS](state, lastDays) {
    state.lastDays = lastDays;
  },
  [Mutations.SET_TIME_RANGE](state, range) {
    state.timeRange = range;
  },
};

const actions: ActionTree<State, any> = {
  [Actions.SET_CURRENCY]({ commit, dispatch, state }, payload: any) {
    const mutationTitle =
      payload.currencyType === CurrencyType.CRYPTO
        ? Mutations.SET_FROM_CURRENCY
        : Mutations.SET_TO_CURRENCY;
    commit(mutationTitle, payload.currency);

    if (!!state.fromCurrency && !!state.toCurrency) {
      dispatch(Actions.UPDATE_PRICE);
    }
  },

  [Actions.SET_VALUE]({ commit, state }, payload: any) {
    const value = parseInt(payload.value, 10);

    if (payload.currencyType === CurrencyType.CRYPTO) {
      commit(Mutations.SET_FROM_VALUE, value);
      commit(Mutations.SET_TO_VALUE, value * state.price);
    } else {
      commit(Mutations.SET_FROM_VALUE, value / state.price);
      commit(Mutations.SET_TO_VALUE, value);
    }
  },

  [Actions.SET_TIME_RANGE]({ commit, dispatch }, range) {
    commit(Mutations.SET_TIME_RANGE, range);
    dispatch(Actions.UPDATE_HISTORY);
  },

  [Actions.UPDATE_PRICE]({ commit, dispatch, state }) {
    CurrencyDataAPI.getPrice(state.fromCurrency, state.toCurrency).then(result => {
      commit(Mutations.SET_PRICE, result[state.toCurrency]);
      dispatch(Actions.UPDATE_LAST_DAYS);
      dispatch(Actions.UPDATE_HISTORY);
    });
  },

  [Actions.UPDATE_HISTORY]({ commit, state }) {
    CurrencyDataAPI.getHistory(state.fromCurrency, state.toCurrency, state.timeRange).then(
      (result: HistoryData) => {
        commit(Mutations.SET_HISTORY, result.Data);
      },
    );
  },

  [Actions.UPDATE_LAST_DAYS]({ commit, state }) {
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
        commit(Mutations.SET_LAST_DAYS, historyData);
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
