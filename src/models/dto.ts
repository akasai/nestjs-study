import { IsInt, IsString } from "class-validator"

// interface, class 모두 가능하지만 인터페이스는 es6 스탠다드가 아니기 때문에 빌드 후 확인이 불가능
// Pipe등의 사용을 위해 class를 추천한다.
export class CreateDto {
  name: string
  age: number
}

export class CreateDogDto {
  @IsString()
  name: string

  @IsInt()
  age: number
}
