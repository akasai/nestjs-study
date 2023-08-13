import { Injectable } from "@nestjs/common"

@Injectable()
export class CatService {
	createCat() {
		return 'cat created'
	}
}
