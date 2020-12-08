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
  }
})

export default store
