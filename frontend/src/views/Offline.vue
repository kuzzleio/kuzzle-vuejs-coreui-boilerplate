<template>
  <div class="OfflinePage app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <h1 class="OfflinePage-icon float-left display-3 mr-4">
            <i class="fa fa-chain-broken fa-2x"></i>
          </h1>
          <h4 class="pt-3">{{ $t('offline.pageTitle') }}</h4>
          <p class="text-muted">{{ $t('offline.pageSubtitle') }}</p>
          <b-progress
            striped
            variant="info"
            :value="100"
            :animated="true"
            class="mb-2"
          ></b-progress>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.OfflinePage-icon
  padding-bottom: 0.6em
  color: rgb(115, 129, 143)

.app
  height: 100vh;
  display: flex;
</style>
