<template>
  <div class="app flex-row align-items-center">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6">
          <h1 class="PageNotFound-icon float-left display-3 mr-4">
            <i class="fa fa-question fa-2x"></i>
          </h1>
          <h4 class="pt-3">{{ $t('pageNotFound.pageTitle') }}</h4>
          <p class="text-muted">{{ $t('pageNotFound.pageSubtitle') }}</p>
          <b-button :to="{ name: 'overview' }" variant="primary">{{
            $t('pageNotFound.backToHome')
          }}</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
.PageNotFound-icon {
  padding-bottom: 0.6em;
  color: rgb(115, 129, 143);
}
</style>
