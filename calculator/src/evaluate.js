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
      case '-':
        result -= Number(elements[i+1]);
        break;
      case 'x':
        result *= Number(elements[i+1]);
        break;
      case '/':
        if (Number(elements[i+1]) === 0) {
          alert('Error: Invalid input.')
          return 'Error';
        }
        result /= Number(elements[i+1]);
        break;
      case '^':
        result = result ** Number(elements[i+1]);
        break;
    }
  }

  console.log('result: ' + result);
  if (isNaN(result)) {
    alert('Error: Invalid input.')
    return 'Error';
  }
  return result.toString();
}

export function backspace(expression) {
  let elements = expression.split(' ');
  let deleted = elements.pop();
  if (deleted === '') {
    elements.pop();
  }
  console.log(elements);

  let lastType;
  if (elements.length === 0) {
    lastType = null;
  } else if (elements.length % 2 === 0) {
    lastType = 'operation';
  } else {
    lastType = 'digits';
  }

  // if it was odd, deleted a Number. iff it was even, deleted an opp

  let newExpression = '';
  for (let element of elements) {
    newExpression += element + ' ';
  }
  return [lastType, newExpression];

}
