/* eslint-disable */
export default function ApolloDev(configObj) {
  // Full cache before mutation
  // TODO: Fix this, it runs too many times
  // window.postMessage(
  //   this.$apolloProvider.clients.defaultClient.cache.data.data,
  //   "*"
  // );

  this.$apollo.mutate(configObj).then(res => {
    // Exact mutation
    window.postMessage(res.data, "*");
  });
}
