class Person {
  static init = 0; //정적필드
  count = 0; // 클래스필드

  // this ? => 인스턴스
  increment() {
    return this.count++;
  }
}

