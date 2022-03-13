import { createApp } from 'vue';
import App from './App.vue';
import VueNumberFormat from 'vue-number-format';

const app = createApp(App);

app.use(VueNumberFormat, {
  prefix: '',
  decimal: ',',
  thousand: ' ',
  isInteger: false,
});

app.mount('#app');
