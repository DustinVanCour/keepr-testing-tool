import utils from '../utils.js'

export default {
  state: {
    tests: {
      canCV: {
        success: false,
        name: 'Can Create Vault',
        routeInfo: {
          path: '/vaults',
          data: 'Vault Object {name, description}',
          response: 'Vault',
          description: 'Post request. This will create a vault. You should add userId from backend.'
        }
      },
      canGUV: {
        success: false,
        name: 'Can Get User Vaults',
        routeInfo: {
          path: '/vaults',
          response: 'vaults[]',
          description: 'Get Request. This will get all the vaults for the logged in user.'
        }
      },
      canGV: {
        success: false,
        name: 'Can Get Vault By Id',
        routeInfo: {
          path: '/vaults/:vaultId',
          response: 'vault',
          description: 'Get request. This will get the individual vault (it should also check that you own the vault)'
        }
      },
      canDV: {
        success: false,
        name: 'Can Delete Vault',
        routeInfo: {
          path: '/vaults/:vaultId',
          description: 'This will delete a vault (it should also check that you own the vault.)'
        }
      },
    },
    vaults: []
  },
  mutations: {
    setState(state, prop) {
      state.tests[prop].success = true
    },
    setVaults(state, payload) {
      state.vaults = payload
    }
  },
  actions: {
    createVault({ commit, dispatch }, payload) {
      utils.api.post('vaults', payload)
        .then(res => {
          console.log(res.data)
          commit('setState', 'canCV')
          dispatch('getVaults')
        })
        .catch(err => { console.error(err) })

    },
    getVaults({ commit, dispatch }) {
      utils.api.get('vaults')
        .then(res => {
          commit('setVaults', res.data)
          commit('setState', 'canGUV')
          dispatch('getVaultById', res.data.id)
        })
        .catch(err => { console.error(err) })

    },
    getVaultById({ commit, dispatch }, payload) {
      utils.api.get('vaults/' + payload)
        .then(res => {
          commit('setState', 'canGV')
          dispatch('deleteVault', res.data.id)
        })
        .catch(err => { console.error(err) })

    },
    deleteVault({ commit, dispatch }, payload) {
      utils.api.delete('vaults/' + payload)
        .then(res => {
          commit('setState', 'canDV')
        })
        .catch(err => { console.error(err) })

    },
  }
}