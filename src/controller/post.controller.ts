import { Request, Response, NextFunction } from "express";
import { postService } from "../services";
import { NotFound } from "../shared/libs/exceptions";

export default class PostController {
  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params
      let postId: number | undefined
      if (typeof params.id !== "string" && isNaN(Number(params.id))) {
        throw new NotFound()
      }
      postId = Number(params.id)
      const post = postService.getPost(postId)
      return res.status(200).json(post)
    } catch (e) {
      next(e)
    }
  }
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query
      let q: string | undefined
      let p: number | undefined
      if (typeof query.q === "string") {
        q = query.q
      }
      //TODO: add validation
      if (typeof query.q === "string" && !isNaN(Number(query.p))) {
        p = Number(query.p)
      }
      const posts = await postService.search(q, p)
      return res.json(posts)
    } catch (e) {
      next(e)
    }
  }
}