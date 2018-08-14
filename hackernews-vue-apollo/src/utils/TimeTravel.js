export default function ApolloDev (configObj) {
  // TODO: Fix this, it runs too many times
  // Full cache before mutation
  // window.postMessage(
  //   this.$apolloProvider.clients.defaultClient.cache.data.data,
  //   "*"
  // );

  // this.$apollo.mutate(configObj).then(res => {
  //   // Exact mutation
  //   window.postMessage(res.data, "*");
  // });

  const prevState = JSON.parse(
    JSON.stringify(this.$apolloProvider.clients.defaultClient.cache.data.data)
  )
  const prevStateKeys = Object.keys(prevState)
  console.log('numkeys previous state: ', prevStateKeys.length)
  console.log('previous state: ', prevState)

  return new Promise((resolve, reject) => {
    this.$apollo.mutate(configObj).then(res => {
      // console.log(res);
      const newState = this.$apolloProvider.clients.defaultClient.cache.data
        .data
      const newStateLength = Object.keys(newState).length
      console.log('numkeys new state: ', newStateLength)
      window.postMessage([prevState, newState], '*')
      resolve(res)
    })
  })
}
