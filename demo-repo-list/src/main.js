import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import router from './router';
import ApolloClient, {createBatchingNetworkInterface } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

console.log(`TOKEN: ${process.env.VUE_APP_GITHUB_ACCESS_TOKEN}`);

const httpLink = new HttpLink({
  uri: 'http://localhost:3020/graphql',
})

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
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
  apollo: {},
  render: h => h(App)
}).$mount('#app')
