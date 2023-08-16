import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"
import { CatService } from "../cats/cat.service"

@Injectable()
export class DiMiddleware implements NestMiddleware {
	constructor(private catService: CatService) {
	}

	use(req: Request, res: Response, next: NextFunction) {
		console.log('DI Request...', this.catService.getCatList())
		next()
	}
}
