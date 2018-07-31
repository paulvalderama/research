import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import router from './router';
import ApolloClient, {createBatchingNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';

console.log(`TOKEN: ${process.env.VUE_APP_GITHUB_ACCESS_TOKEN}`);

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'https://api.github.com/graphql',
    opts: {
      headers:{
        Authorization: `Bearer ${process.env.VUE_APP_GITHUB_ACCESS_TOKEN}`
      }
    }
  }),
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VeeValidate);
Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
