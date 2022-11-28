import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import http from "./http";
import { Button } from "vant";
import { Form } from "vant";
import { Field } from "vant";
import { NavBar } from "vant";
import { Toast } from "vant";
import { Tabbar, TabbarItem } from "vant";
import { Tab, Tabs } from "vant";
import { Cell, CellGroup } from "vant";
import { Calendar } from "vant";
import { Col, Row } from "vant";
import { Popup } from "vant";
import { Icon } from "vant";

Vue.use(Icon);
// import "vue2-animate/dist/vue2-animate.min.css";
import "./style.scss";

Vue.use(Popup);

Vue.use(Col);
Vue.use(Row);

Vue.use(Calendar);

Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Tab);
Vue.use(Tabs);

Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.use(Toast);

Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.config.productionTip = false;
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
