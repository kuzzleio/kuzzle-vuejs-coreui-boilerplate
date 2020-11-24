import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Auth extends VuexModule {
  currentUser: any = null;

  @Mutation
  SET_CURRENT_USER(user: any) {
    this.currentUser = user;
  }

  @Mutation
  UNSET_CURRENT_USER() {
    this.currentUser = null;
  }

  get currentUsername() {
    return this.currentUser ? this.currentUser.username : null;
  }

  @Action
  async LOGIN(payload: { credentials: any; kuzzle: any }) {
    let jwt;
    try {
      jwt = await payload.kuzzle.auth.login(
        'local',
        payload.credentials,
        '7 days'
      );
      await this.context.dispatch('FETCH_CURRENT_USER', payload.kuzzle);
    } catch (error) {
      localStorage.removeItem('user_token');
      throw error;
    }

    localStorage.setItem('user_token', jwt);
  }

  @Action
  async CHECK_TOKEN(kuzzle: any) {
    const jwt = localStorage.getItem('user_token');

    if (!jwt) {
      return false;
    }

    const { valid } = await kuzzle.auth.checkToken(jwt);

    if (!valid) {
      await this.context.dispatch('LOG_OUT', kuzzle);
      return false;
    }

    kuzzle.jwt = jwt;

    if (!this.currentUser) {
      await this.context.dispatch('FETCH_CURRENT_USER', kuzzle);
    }

    return true;
  }

  @Action
  async FETCH_CURRENT_USER(kuzzle: any) {
    let currentUser;
    try {
      currentUser = await kuzzle.auth.getMyCredentials('local');
    } catch (error) {
      throw error;
    }

    this.context.commit('SET_CURRENT_USER', currentUser);

    /**
     * Here, you can perform some data fetch related to your user-session.
     */
  }

  @Action
  async LOG_OUT(kuzzle: any) {
    /**
     * You should tear down your session here.
     */
    this.context.commit('UNSET_CURRENT_USER');
    kuzzle.jwt = null;
    localStorage.removeItem('user_token');
  }
}
