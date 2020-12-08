import { createStore } from 'vuex'
import axios from 'axios'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'renekton', columnId: 1 }
  },
  mutations: {
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'renekton', columnId: 1 }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    }
  },
  actions: {
    fetchColumns (context) {
      axios.get('/columns').then(res => {
        context.commit('fetchColumns', res.data)
      })
    },
    fetchColumn ({ commit }, cid) {
      axios.get(`/columns/${cid}`).then(res => {
        commit('fetchColumn', res.data)
      })
    },
    fetchPosts ({ commit }, cid) {
      axios.get(`/columns/${cid}/posts`).then(res => {
        commit('fetchPosts', res.data)
      })
    }
  },
  getters: {
    getColumnById (state) {
      return (id: string) => {
        return state.columns.find(c => c._id === id)
      }
    },
    getPostsByCid (state) {
      return (cid: string) => {
        return state.posts.filter(post => post.column === cid)
      }
    }
  }
})

export default store
