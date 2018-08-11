/* eslint-disable */ 

export default function ApolloDev(configObj) {
  
  //   console.log('before mutation: ...some state');
    this.$apollo.mutate(configObj).then(res => console.log('after mutation: ', res.data))
  // })()
}
