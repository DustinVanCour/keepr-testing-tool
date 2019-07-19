import utils from '../utils.js'
export default {
  state: {
    tests: {
      canGetVK: {
        name: 'Can Get Vault Keeps',
        success: false,
        routeInfo: {
          path: '/vaultkeeps/:vaultId',
          response: 'keeps[]',
          description: 'Get request. This will get all the keeps that match the vualtId on the vaultkeep relationship table.'
        }
      },
      canCreateVK: {
        name: 'Can Create Vault Keep',
        success: false,
        routeInfo: {
          path: '/vaultkeeps',
          data: 'vaultkeep {vaultId, keepId}',
          description: 'This will map a vaultkeep relationship. It needs a vaultId, a keepId, and a userId. You should add your userId from the backend.'
        }
      },
      canDeleteVK: {
        name: 'Can Delete Vault Keep',
        success: false,
        routeInfo: {
          path: '/vaultkeeps',
          data: 'vaultkeep',
          description: 'Put request. This will delete a vaultkeep relationship. It needs a vaultId, a keepId, and a userId.'
        }
      }
    },
    vaultKeep: {},
    user: {},
    keep: {},
    vaults: {}
  },
  mutations: {
    setVKState(state, prop) {
      state.tests[prop].success = true
    },
    setVaultKeep(state, payload) {
      state.vaultKeep = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setVaults(state, payload) {
      state.vaults = payload[0]
    },
    setKeep(state, payload) {
      state.keep = payload
    }
  },
  actions: {
    // getVaultKeeps({ commit, dispatch })
    createVaultKeep({ commit, dispatch, state }) {
      let vaultKeep = {
        vaultId: state.vaults.id,
        userId: state.user.id,
        keepId: state.keep.id
      }
      utils.api.post('vaultkeeps', vaultKeep)
        .then(res => {
          commit('setVKState', 'canCreateVK')
          commit('setVaultKeep', res.data)
          dispatch('getVaultKeeps', res.data)
        }).catch(err => console.error(err))
    },
    getVaultKeeps({ commit, dispatch }, payload) {
      utils.api.get('vaultkeeps/' + payload.vaultId)
        .then(res => {
          commit('setVKState, canGetVK')
          dispatch('deleteVaultKeep', res.data[0])
        }).catch(err => console.error(err))
    },
    deleteVaultKeep({ commit }, payload) {
      utils.api.put('vaultkeeps', payload)
        .then(res => {
          commit('setVKState', 'canDeleteVK')
        })
        .catch(err => console.error(err))
    }
  }
}