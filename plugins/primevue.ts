import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Badge from 'primevue/badge';
import Dialog from 'primevue/dialog';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component('Button', Button);
  nuxtApp.vueApp.component('Menubar', Menubar);
  nuxtApp.vueApp.component('InputText', InputText);
  nuxtApp.vueApp.component('Card', Card);
  nuxtApp.vueApp.component('Badge', Badge);
  nuxtApp.vueApp.component('Dialog', Dialog);
  nuxtApp.vueApp.component('Toast', Toast);
});