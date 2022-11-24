# 타입스크립트 PICK
~~~ ts
interface User {
  id?: number;
  firstname: string;
  lastname?: string;
  age: number;
  telephone?: number;
  twitter?: string;
}
type UserFullname = Pick<User, 'firstname' | 'lastname'>;

const userName: UserFullname = {
  firstname: 'Chris',
  lastname: 'Bongers',
};

// 정의된 타입 속성중에서 원하는것만 골라서 사용할수있음

~~~
> Props drill로 값을 받을떄 원하는속성만 타입으로 지정한다.