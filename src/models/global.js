import { queryGet, queryPost } from '../services/global';

export default {
  namespace: 'global',

  state: {
    queryGet: '',
    queryPost:'',
    isloading: false,
  },

  effects: {
    *queryGet({ payload }, { call, put }) {
      let data = yield call(queryGet);
      // redirect on client when network broken
      // yield put(routerRedux.push(`/exception/${payload.code}`));
      yield put({
        type: 'queryGets',
        payload: data,
      });
    },
    *queryPost({ payload }, { call, put }) {
      let data = yield call(queryPost,payload);
      // redirect on client when network broken
      // yield put(routerRedux.push(`/exception/${payload.code}`));
      yield put({
        type: 'queryPosts',
        payload: data,
      });
    },
  },

  reducers: {
    queryGets(state, action) {
      return {
        global: action.payload,
      };
    },
    queryPosts(state, action) {
      return {
        global: action.payload,
      };
    },
  },
};
