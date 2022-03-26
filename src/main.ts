import { createApp } from "vue";
import App from "./App.vue";
import store from "./store"
import router from "./router";
import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Card from 'primevue/card';
import Menubar from 'primevue/menubar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';
import ToastService from 'primevue/toastservice';
import AutoComplete from 'primevue/autocomplete';
import ConfirmationService from 'primevue/confirmationservice';

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeflex/primeflex.css"        
import "primeicons/primeicons.css"   
import "./global-styles.css"                     

const app = createApp(App);

app.use(router)
    .use(PrimeVue)
    .use(store)
    .use(ToastService)
    .use(ConfirmationService)

app
    .component('Menubar', Menubar)
    .component('AutoComplete', AutoComplete)
    .component('Divider', Divider)
    .component('Dialog', Dialog)
    .component('Dropdown', Dropdown)
    .component('Button', Button)
    .component('Password', Password)
    .component('InputText', InputText)
    .component('InputNumber', InputNumber)
    .component('Textarea', Textarea)
    .component('Card', Card)
    .component('DataTable', DataTable)
    .component('Column', Column);

app.mount("#app");
