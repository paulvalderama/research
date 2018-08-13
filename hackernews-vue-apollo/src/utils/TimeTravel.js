/* eslint-disable */
export default function ApolloDev(configObj) {
  // Full cache before mutation
  window.postMessage(
    this.$apolloProvider.clients.defaultClient.cache.data.data,
    "*"
  );

  this.$apollo.mutate(configObj).then(res => {
    // Exact mutationr
    window.postMessage(res.data, "*");
  });
}
