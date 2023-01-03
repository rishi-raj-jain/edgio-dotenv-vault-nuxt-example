<template>
  <Tutorial />
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData() {
    console.log(process.env.SOMEG2)
  },
}
</script>
