import { Module, VuexModule, Mutation } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class App extends VuexModule {
  waitingForConnection = false;
  online = false;

  @Mutation
  SET_ONLINE() {
    this.online = true;
  }

  @Mutation
  SET_OFFLINE() {
    this.online = false;
  }

  @Mutation
  SET_WAITING_FOR_CONNECTION() {
    this.waitingForConnection = true;
  }

  @Mutation
  UNSET_WAITING_FOR_CONNECTION() {
    this.waitingForConnection = false;
  }
}
