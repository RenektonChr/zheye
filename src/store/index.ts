import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps } from '../data/testData'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: true, name: 'renekton', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'renekton', columnId: 1 }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
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
