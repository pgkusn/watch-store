import { createStore } from 'vuex';
import product from './modules/product';
import member from './modules/member';

export default createStore({
    state: {
        alertMsg: ''
    },
    mutations: {
        setAlertMsg (state, msg) {
            state.alertMsg = msg;
        }
    },
    actions: {
        setAlertMsgHandler ({ commit }, msg) {
            return new Promise(resolve => {
                commit('setAlertMsg', msg);
                setTimeout(() => {
                    commit('setAlertMsg', '');
                    resolve();
                }, 1300);
            });
        }
    },
    modules: {
        product,
        member
    }
});