import Vue from 'vue'
import {
  Vuetify,
  VForm,
  VApp,
  VCard,
  VDivider,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VInput,
  VTextField,
  VSubheader,
  VToolbar,
  VDialog,
  VStepper,
  VSelect,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VSelect,
    VForm,
    VInput,
    VTextField,
    VDivider,
    VSubheader,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VCard,
    VStepper,
    VToolbar,
    VDialog,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})
