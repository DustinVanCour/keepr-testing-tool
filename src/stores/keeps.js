import utils from '../utils.js'

export default {
  state: {
    tests: {

      canCreateKeep: {
        success: false,
        name: 'Can Create Keep',
        routeInfo: {
          path: '/keeps',
          data: 'Keep object {name, description, img, isPrivate}',
          response: 'keep',
          description: 'Post request. This should create a keep in your database. Your backend should attach a userId.'
        }

      },
      canGetPublicKeeps: {
        success: false,
        name: 'Can Get Public Keeps',
        routeInfo: {
          path: '/keeps',
          response: 'keeps[]',
          description: 'Get request. This should get all public keeps.'
        }
      },
      canGetUserKeeps: {
        success: false,
        name: 'Can Get User',
        routeInfo: {
          path: '/keeps/user',
          response: 'keeps[]',
          description: 'Get request. This should get all keeps by logged in user.'
        }

      },
      canGetKeepById: {
        success: false,
        name: 'Can Get Keep By Id',
        routeInfo: {
          path: '/keeps/:keepId',
          response: 'keep',
          description: 'Get request. This should get one keep by its id.'
        }
      },
      canEditKeep: {
        success: false,
        name: 'Can Edit Keep',
        routeInfo: {
          path: '/keeps/:keepId',
          data: 'keep {name, description, img, isprivate}',
          response: 'keep',
          description: 'Put request. This should update the old keep object with the new keep object.'
        }
      },
      canDeleteKeep: {
        success: false,
        name: 'Can Delete Keep',
        routeInfo: {
          path: 'keeps/:keepId',
          description: 'Delete request. This should delete the object by its id.'
        }
      },
    },
    keeps: [],
    keep: {},
  },
  mutations: {
    setKeepState(state, prop) {
      state.tests[prop].success = true
    },
    setKeeps(state, payload) {
      state.keeps = payload
    },
    setKeep(state, payload) {
      state.keep = payload
    }

  },
  actions: {
    createKeep({ commit, dispatch, state }, payload) {
      utils.api.post('/keeps', payload)
        .then(res => {
          console.log(res.data);
          commit('setKeepState', 'canCreateKeep')
          dispatch('testKeeps')
        })
        .catch(err => { console.error(err) })
    },

    testKeeps({ commit, dispatch, state }) {
      utils.api.get('keeps/user')
        .then(res => {
          commit('setKeeps', res.data)
          commit('setKeep', res.data[0])
          commit('setKeepState', 'canGetUserKeeps')
          dispatch('getKeepById')
        })
      utils.api.get('/keeps')
        .then(res => {
          console.log(res.data)
          commit('setKeepState', 'canGetPublicKeeps')
        })
    },
    getKeepById({ commit, dispatch, state }) {
      utils.api.get('keeps/' + state.keep.id)
        .then(res => {
          commit('setKeepState', 'canGetKeepById')
          dispatch('updateKeep', res.data)
        })
        .catch(err => console.error(err))
    },
    updateKeep({ commit, dispatch }, payload) {
      utils.api.put('keeps/' + payload.id, payload)
        .then(res => {
          dispatch('deleteKeep')
        })
        .catch(err => { console.error(err) })

    },
    deleteKeep({ commit, dispatch, state }) {
      utils.api.delete('keeps/' + state.keep.id)
        .then(res => {
          console.log('deleted keep')
          commit('setKeepState', 'canDeleteKeep')
        })
        .catch(err => { console.error(err) })

    }
  }
}