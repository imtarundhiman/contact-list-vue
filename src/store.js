import Vue from 'vue'
import Vuex from 'vuex'
import storage from 'local-storage-fallback'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export const store = new Vuex.Store({
    plugins: [createPersistedState()],

	state: {
		status: storage.getItem('contact') ? 'success' : '',
		contact: JSON.parse(storage.getItem('contact')) || [],
	},

	mutations: {
		request(state){
			state.status = 'loading'
		},
		set(state){
			state.state = 'saved'
		},
		fetch(state, detail){
			state.status = 'saved'
			state.contact = detail.contact
		},
		delete(state){
			state.status = ''
			state.contact = ''
		},
	},
	actions: {
		saveData({commit}, contact){
			return new Promise((resolve) => {
                localStorage.setItem('contact', JSON.stringify(contact))
                commit('set')
                resolve()
			})
		},
		fetchData({commit}){
            return new Promise((resolve) => {
                let contact = JSON.parse(storage.getItem('contact'));
                
                commit('fetch',{
                    'contact': contact
                })
                
                resolve(contact)				
            })
        },
        delete({commit}){
            return new Promise((resolve) => {
                
                localStorage.removeItem('contact')
                commit('delete')
                resolve()
            })
		}
	},
	getters : {
        status: state => state.status,
		contact: state => state.contact
	}
})
