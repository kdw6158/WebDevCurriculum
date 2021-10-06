<template>
  <div>
    <router-link to="/">집으로</router-link><br />
    <router-link to="/about">about</router-link>

    <router-view />
  </div>
</template>
<script>
export default {
  data: () => ({
    aa: 1,
  }),
  async created() {},
  mounted() {},
};
</script>
