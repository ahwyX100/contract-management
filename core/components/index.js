import BaseModal from './dialog/BaseModal'
import SnackBar from './notification/SnackBar'

const componentObj = {}

componentObj.install = (Vue) => {
  Vue.component(BaseModal.name, BaseModal)
  Vue.component(SnackBar.name, SnackBar)  
}

export default componentObj