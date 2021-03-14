export function evaluate(expression) {
  console.log(`evaluated the expression: ${expression}`);

  let elements = expression.split(' ');
  console.log(elements);

  let result = Number(elements[0]);

  for (let i = 1; i < elements.length; i += 2) {
    switch (elements[i]) {
      case '+':
        result += Number(elements[i+1]);
        break;
      case 'x':
        result *= Number(elements[i+1]);
        break;
    }
  }

  console.log('result: ' + result);
  return result;
}
