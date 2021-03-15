/*** Button Actions ***/

/* PEMDAS Evaluate: Evaluate the current expression according to PEMDAS ordering,
 * solving exponents, then multiplcation and division (left to right), and then
 * addition and subtraction (left to right). */
export function pemdasEvaluate(expression) {
  // Create an array of the numbers and operands of the expression
  let elements = expression.split(' ');
  elements = solveExponents(elements);
  elements = solveMultDiv(elements);
  elements = solveAddSub(elements);

  // If the result is NaN, return an error
  if (isNaN(elements[0])) {
    alert('Error: Invalid input.')
    return 'Error';
  }
  return elements[0];

}

/* Backspace: Backspaces numbers and operands from the expression one at a time.
 * Updates appropriate states to reflect these changes. */
export function backspace(expression) {
  let elements = expression.split(' ');
  let deleted = elements.pop();
  if (deleted === '') {
    elements.pop();
  }
  console.log(elements);

  // Re-form the current expression without the backspaced element
  let newExpression = '';
  for (let element of elements) {
    newExpression += element + ' ';
  }

  // Keep track of the type that now appears last in the expression in order
  //  to inform what kinds of characters can be typed to create a valid exprssion
  let lastType;
  if (elements.length === 0) {
    lastType = null;
  } else if (elements.length % 2 === 0) {
    lastType = 'operation';
  } else {
    lastType = 'digits';
    newExpression = newExpression.substring(0, newExpression.length-1);
  }

  return [lastType, newExpression];

}

/*** Helper Functions ***/
function solveExponents(elements) {
  for (let i = 1; i < elements.length; i++) {
    if (elements[i] === '^') {
      let exponent = Math.pow(Number(elements[i-1]), Number(elements[i+1]));
      elements.splice(i-1, 3, exponent.toString());
      i--;
    }
  }
  return elements;
}

function solveMultDiv(elements) {
  for (let i = 1; i < elements.length; i++) {
    if (elements[i] === 'x') {
      let product = Number(elements[i-1]) * Number(elements[i+1]);
      elements.splice(i-1, 3, product.toString());
      i--;
    } else if (elements[i] === '/') {
      let quotient = Number(elements[i-1]) / Number(elements[i+1])
      elements.splice(i-1, 3, quotient.toString());
      i--;
    }
  }
  return elements;
}

function solveAddSub(elements) {
  for (let i = 1; i < elements.length; i++) {
    if (elements[i] === '+') {
      let sum = Number(elements[i-1]) + Number(elements[i+1]);
      elements.splice(i-1, 3, sum.toString());
      i--;
    } else if (elements[i] === '-') {
      let difference = Number(elements[i-1]) - Number(elements[i+1])
      elements.splice(i-1, 3, difference.toString());
      i--;
    }
  }
  return elements;
}
