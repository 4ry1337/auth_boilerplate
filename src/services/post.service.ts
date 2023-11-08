import {postRepository} from "../database"

export default class PostService {
  async getPost(postId: number) {
    const post = await postRepository.getById(postId)
    return post
  }
  async search(q?: string, p?: number) {
    const posts = await postRepository.search(q, p)
    return {posts, q, p}
  }
}
