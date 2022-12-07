var obj1 = {
  outer: function () {
    console.log(this); // obj1
    var innerFunc = function () {
      console.log(this); //window
    };
    innerFunc();
    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod(); //obj2
  },
};
obj1.outer();

const circle = {
  radius: 5,
  getDiameter() {
    return 2 * circle.radius;
  },
};
circle.getDiameter(); //this= circle , 10

function square(number) {
  console.log(this); //window
}
