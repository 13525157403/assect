<template>
  <div>
    123
  </div>
</template>

<script>
import { getAlertList } from '@/api/newyquejes/new1'
export default {
  created() {
    console.log(this.$route.query.alertId)
    getAlertList().then((r) => {
      console.log(r)
    })
    // console.log('fffffffffff',getAlertList());
  }
}
</script>

<style>

</style>
