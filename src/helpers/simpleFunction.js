function simplefunction1(a = 10, b) {
  console.log("First function consoling");
  console.log(a + b);
}
simplefunction1(10, 5);

const simplefunction2 = () => {
  console.log("Second function consoling");
};

simplefunction2();

///two digit number
///return reversed number
function swap(a) {
  const storedString = a.toString();
  const firstdigit = storedString.slice(0, 1);
  const secondDigit = storedString.slice(1);
  const reversedNumber = parseInt(secondDigit + firstdigit);
  console.log(reversedNumber);
}

swap(49);
