// Trong file font-awesome.js
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Các icon solid
import { far } from '@fortawesome/free-regular-svg-icons'; // Các icon regular
import { fab } from '@fortawesome/free-brands-svg-icons'; // Các icon brands
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Thêm tất cả các icon vào thư viện
library.add(fas, far, fab);

Vue.component('font-awesome-icon', FontAwesomeIcon);
