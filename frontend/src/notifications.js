import Vue from 'vue';

import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const defaultOptions = {
  show: {
    theme: 'dark',
    icon: 'icon-person',
    position: 'topCenter',
    progressBarColor: 'rgb(0, 255, 184)'
  },
  info: {
    position: 'bottomLeft'
  },
  success: {
    position: 'bottomLeft'
  },
  warning: {
    position: 'bottomLeft'
  },
  error: {
    position: 'topCenter'
  }
};

Vue.use(VueIziToast, defaultOptions);
