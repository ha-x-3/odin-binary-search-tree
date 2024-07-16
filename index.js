import { createTree } from './tree.js';

function generateRandomNumbers(arraySize) {
	const max = 100;
	const randomNumbers = [];
	for (let i = 1; i <= arraySize; i++) {
		const randomNumber = Math.floor(Math.random() * max);
		randomNumbers.push(randomNumber);
	}
	return randomNumbers;
}

const arraySize = 10;
const randomNumbers = generateRandomNumbers(arraySize);
console.log(randomNumbers);

const tree = createTree(randomNumbers);
tree.prettyPrint();
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.prettyPrint();
console.log(tree.isBalanced());

tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
