<template>
  <div class="info">
      <div v-if="cantContribute">The round is now closed for contributions.</div>
      <div v-if="reallocationPhase">If you contributed, you have X days to change your cart before we close the round.</div>
      <div v-if="finalisedPhase">Calling all project owners: your funds are ready to claim. Head to your project page.</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class UserStatus extends Vue { 
    cantContribute = true
    reallocationPhase = true
    finalisedPhase = true
  @Prop() message!: string
}
</script>

<style scoped lang="scss">
@import '../styles/vars';
@import '../styles/theme';

.info {
    background: $bg-transparent;
    border: 1px solid $highlight-color;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 16px;
    font-family: Inter;
    line-height: 150%;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    @media (max-width: $breakpoint-m) {
    flex-direction: column;
    padding-bottom: 1rem;
    align-items: flex-start;
  }
}

.icon {
    font-size: 24px;
    padding: 0.5rem;
    @media (max-width: $breakpoint-m) {
    padding: 0.5rem 0rem;
  }
}

</style>