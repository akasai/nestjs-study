import { Injectable } from "@nestjs/common"

@Injectable()
export class CatService {
	getCatList() {
		return []
	}

	createCat() {
		return 'cat created'
	}
}
