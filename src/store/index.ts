import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from '../data/testData'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export interface ClobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<ClobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'renekton' }
    }
  },
  getters: {
    biggerColumnsLen (state) {
      return state.columns.filter(c => c.id > 2).length
    },
    getColumnById (state) {
      return (id: number) => {
        return state.columns.find(c => c.id === id)
      }
    },
    getPostsByCid (state) {
      return (cid: number) => {
        return state.posts.filter(post => post.columnId === cid)
      }
    }
  }
})

export default store
