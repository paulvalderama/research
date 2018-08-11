/* eslint-disable */ 

export default function ApolloDev(configObj) {
  console.log('full cache before mutation: ', this.$apolloProvider.clients.defaultClient.cache.data.data);
  this.$apollo.mutate(configObj).then(res => {
      console.log('exact mutation: ', res.data)
  })
}
