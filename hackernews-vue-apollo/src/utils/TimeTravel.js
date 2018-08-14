/* eslint-disable */
export default function ApolloDev(configObj) {
  // TODO: Fix this, it runs too many times
  // Full cache before mutation
  // window.postMessage(
  //   this.$apolloProvider.clients.defaultClient.cache.data.data,
  //   "*"
  // );

  this.$apollo.mutate(configObj).then(res => {
    // Exact mutation
    window.postMessage(res.data, "*");
  });
}
