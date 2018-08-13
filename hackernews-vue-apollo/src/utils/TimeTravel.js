/* eslint-disable */
export default function ApolloDev(configObj) {
  this.$apollo.mutate(configObj).then(res => window.postMessage(res.data, "*"));
}
