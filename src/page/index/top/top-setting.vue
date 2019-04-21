<template>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      box: false,
      form: {},
    }
  },
  computed: {

  },
  created () {
    this.init();
  },
  methods: {
    close () {
      this.box = false;
      this.$store.commit('SET_SHADE', false);
    },
    set (key) {
      const ele = this.find(key);
      this.$store.commit(ele.commit, eval(this.form[ele.key]));
    },
    find (key) {
      return this.list.filter(ele => ele.key === key)[0]
    },
    init () {
      this.list.forEach(ele => {
        this.form[ele.key] = validatenull(this[ele.key]) ? 'true' : this[ele.key] + '';
        this.set(ele.key);
      })
    },
    open () {
      this.box = true;
      this.$store.commit('SET_SHADE', true);
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  margin-left: 10px;
  &__icon {
    transform: rotate(90deg);
  }
  &__header {
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
    border-bottom: 1px solid #f6f6f6;
    color: #333;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
    small {
      margin-left: 8px;
      color: #999;
    }
  }
  &__body {
    padding: 10px 15px;
    line-height: 24px;
  }
  &__about {
    font-size: 14px;
    line-height: 30px;
  }
  &__shade {
    position: fixed;
    display: none;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2048;
    &--show {
      display: block;
    }
  }
  &__form {
    width: 230px;
    margin: 0 auto;
  }
  &__content {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    position: fixed;
    width: 320px;
    height: 100%;
    right: -450px;
    top: 0;
    z-index: 2048;
    background-color: #fff;
    &--show {
      right: 0;
    }
  }
}
</style>
