<template>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "top-logs",

  data () {
    return {
      box: false
    };
  },
  created () {
  },
  mounted () { },
  computed: {

  },
  props: [],
  methods: {
    handleOpen () {
      this.box = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
