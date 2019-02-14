<template>
  <div class="PageNotFound app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <h1 class="PageNotFound-icon float-left display-3 mr-4">
              <i class="fa fa-question fa-2x"></i>
            </h1>
            <h4 class="pt-3">{{ $t('pageNotFound.pageTitle') }}</h4>
            <p class="text-muted">{{ $t('pageNotFound.pageSubtitle') }}</p>
            <b-button :to="{ name: 'overview' }" variant="primary">{{
              $t('pageNotFound.backToHome')
            }}</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.PageNotFound-icon
  padding-bottom: 0.6em
  color: rgb(115, 129, 143)
</style>
