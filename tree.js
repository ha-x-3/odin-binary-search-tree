import { createNode } from "./node.js";

export function createTree(array = []) {
	let root = buildTree(array);

	function buildTree(array) {
		const uniqueArray = [...new Set(array)];
		const uniqueSortedArray = uniqueArray.sort((a, b) => a - b);

		function createBST(sortedArray, start, end) {
			if (start > end) {
				return null;
			}

			const mid = Math.floor((start + end) / 2);

			const root = createNode(sortedArray[mid]);

			root.left = createBST(sortedArray, start, mid - 1);
			root.right = createBST(sortedArray, mid + 1, end);

			return root;
		}

		return createBST(uniqueSortedArray, 0, uniqueSortedArray.length - 1);
	}

	function insert(value) {
		function insertToLeafNode(currentNode, nodeToInsert) {
			if (currentNode === null) {
				return nodeToInsert;
			}

			if (nodeToInsert.data < currentNode.data) {
				currentNode.left = insertToLeafNode(
					currentNode.left,
					nodeToInsert
				);
			} else {
				currentNode.right = insertToLeafNode(
					currentNode.right,
					nodeToInsert
				);
			}

			return currentNode;
		}

		if (find(value)) {
			return;
		}

		const newNode = createNode(value);
		root = insertToLeafNode(root, newNode);
	}

	function deleteItem(value) {
		function findReplacement(currentNode) {
			if (currentNode.left) {
				currentNode = findReplacement(currentNode.left);
			}
			return currentNode;
		}

		function deleteNode(currentNode, nodeToDelete) {
			if (currentNode === null) {
				return currentNode;
			}

			if (nodeToDelete.data < currentNode.data) {
				currentNode.left = deleteNode(currentNode.left, nodeToDelete);
			} else if (nodeToDelete.data > currentNode.data) {
				currentNode.right = deleteNode(currentNode.right, nodeToDelete);
			} else {
				if (!currentNode.left) {
					return currentNode.right;
				} else if (!currentNode.right) {
					return currentNode.left;
				}

				const replacementNode = findReplacement(currentNode.right);
				deleteNode(currentNode, replacementNode);
				currentNode.data = replacementNode.data;
			}

			return currentNode;
		}

		const nodeToDelete = createNode(value);
		root = deleteNode(root, nodeToDelete);
	}

	function find(value) {
		function findNode(currentNode, nodeToFind) {
			if (!currentNode) {
				return null;
			}

			if (currentNode.data === nodeToFind.data) {
				return currentNode;
			}

			if (currentNode.data > nodeToFind.data) {
				return findNode(currentNode.left, nodeToFind);
			} else {
				return findNode(currentNode.right, nodeToFind);
			}
		}

		const nodeToFind = createNode(value);
		return findNode(root, nodeToFind);
	}

	function levelOrder(callback = null) {
		if (!root) {
			return null;
		}

		const values = [];
		const queue = [root];

		while (queue.length > 0) {
			const currentNode = queue.shift();

			if (callback) {
				callback(currentNode);
			} else {
				values.push(currentNode.data);
			}

			if (currentNode.left) {
				queue.push(currentNode.left);
			}
			if (currentNode.right) {
				queue.push(currentNode.right);
			}
		}

		if (!callback) {
			return values;
		}
	}

	function inOrder(callback = null) {
		function inOrderRecursive(currentNode, callback = null) {
			if (!currentNode) {
				return;
			}

			inOrderRecursive(currentNode.left, callback);
			if (callback) {
				callback(currentNode);
			} else {
				values.push(currentNode.data);
			}
			inOrderRecursive(currentNode.right, callback);
		}

		if (!root) {
			return null;
		}
		const values = [];
		inOrderRecursive(root, callback);
		if (!callback) {
			return values;
		}
	}

	function preOrder(callback = null) {
		function preOrderRecursive(currentNode, callback = null) {
			if (!currentNode) {
				return;
			}

			if (callback) {
				callback(currentNode);
			} else {
				values.push(currentNode.data);
			}
			preOrderRecursive(currentNode.left, callback);
			preOrderRecursive(currentNode.right, callback);
		}

		if (!root) {
			return null;
		}
		const values = [];
		preOrderRecursive(root, callback);
		if (!callback) {
			return values;
		}
	}

	function postOrder(callback = null) {
		function postOrderRecursive(currentNode, callback = null) {
			if (!currentNode) {
				return;
			}

			postOrderRecursive(currentNode.left, callback);
			postOrderRecursive(currentNode.right, callback);
			if (callback) {
				callback(currentNode);
			} else {
				values.push(currentNode.data);
			}
		}

		if (!root) {
			return null;
		}
		const values = [];
		postOrderRecursive(root, callback);
		if (!callback) {
			return values;
		}
	}

	function height(node) {
		if (!node) {
			return 0;
		}

		const leftHeight = height(node.left);
		const rightHeight = height(node.right);

		return Math.max(leftHeight, rightHeight) + 1;
	}

	function depth(node) {
		function findDepth(currentNode, nodeToFind, currentDepth = 0) {
			if (!currentNode) {
				return 0;
			}

			if (currentNode.data === nodeToFind.data) {
				return currentDepth;
			}

			if (currentNode.data > nodeToFind.data) {
				return findDepth(
					currentNode.left,
					nodeToFind,
					currentDepth + 1
				);
			} else {
				return findDepth(
					currentNode.right,
					nodeToFind,
					currentDepth + 1
				);
			}
		}

		return findDepth(root, node);
	}

	function isBalanced() {
		function isBalancedRecursive(currentNode) {
			if (!currentNode) {
				return true;
			}

			const leftHeight = height(currentNode.left);
			const rightHeight = height(currentNode.right);

			if (Math.abs(leftHeight - rightHeight) > 1) {
				return false;
			}

			return (
				isBalancedRecursive(currentNode.left) &&
				isBalancedRecursive(currentNode.right)
			);
		}

		return isBalancedRecursive(root);
	}

	function rebalance() {
		const values = inOrder();
		root = buildTree(values);
	}

	function prettyPrint(node = root, prefix = '', isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			prettyPrint(
				node.right,
				`${prefix}${isLeft ? '│   ' : '    '}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			prettyPrint(
				node.left,
				`${prefix}${isLeft ? '    ' : '│   '}`,
				true
			);
		}
	}

	return {
		insert,
		deleteItem,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
		height,
		depth,
		isBalanced,
		rebalance,
		prettyPrint,
	};
}