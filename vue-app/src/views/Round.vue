<template>
  <router-view />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Round extends Vue {}
</script>

<style scoped lang="scss">
@import '../styles/vars';
@import '../styles/theme';
</style>
