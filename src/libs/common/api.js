import user from './api/user'

const apiList = {
  ...user,
  menu_trees: 'v1/admin/core/menu/trees',
  menu_lists: '/v1/admin/core/menu/lists'
}
export default apiList
