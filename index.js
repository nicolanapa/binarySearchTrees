/*
    Root: the half of the array

    (while (array.size !== 1)) Continue like this until the array is size 1
        Root: the half of the array
    If left half of Root is lower then place it as the left of the node
    If it's greater then place it as the right of the node
    (end while)

    Output the balanced Binary Search Tree array
*/

class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(array) {
		this.array = array;
		this.root = null;
	}

	// Sorts and removes duplicates
	// Working
	arraySorter(array = this.array) {
		this.array = array.sort((a, b) => a - b);
		this.array = array.filter((item, index) => array.indexOf(item) === index);

		console.log("New sorted array:", this.array);
		return this.array;
	}

	// Builds the Balanced Binary Search Tree
	// Working
	buildTree(array = this.array) {
		/*this.array2 = this.arraySorter(array);
		array = this.array2;*/
		// NEED TO: Sort, remove duplicates
		let start = 0;
		let end = array.length - 1;
		let mid = Math.round((start + end) / 2);

		if (start > end) {
			return null;
		} else {
			let arrayBeforeMid = array.slice(0, mid);
			let arrayAfterMid = array.slice(mid + 1, mid + end);
			console.log("Mid:", array[mid]);
			console.log("Before:", arrayBeforeMid);
			console.log("After:", arrayAfterMid);

			let node = new Node(array[mid]);
			node.left = this.buildTree(arrayBeforeMid);
			node.right = this.buildTree(arrayAfterMid);

			return (this.root = node);
		}
	}

	// Prints the Balanced BST in a horizontally way
	// Working
	prettyPrint(node, prefix = "", isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
		}
		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
	}

	// Returns the node with a given value or null
	// Working
	find(value) {
		let temp = this.root;

		while (temp !== null) {
			if (value === temp.data) {
				return temp;
			} else if (value < temp.data) {
				temp = temp.left;
			} else if (value > temp.data) {
				temp = temp.right;
			}
		}

		return null;
	}

	// Callback function which pushes a data of a given node in an array
	// Working
	callback() {
		let array = [];
		function pushNode(tempNode) {
			array.push(tempNode.data);
		}
		return {
			array,
			pushNode,
		};
	}

	// Returns an array of values (Breadth-First-Search) if no callback is given
	// Working
	levelOrder(callback = this.callback) {
		let defaultCallback = callback();
		let queue = [];
		queue.push(this.root);

		while (queue.length !== 0) {
			let tempNode = queue.shift();
			defaultCallback.pushNode(tempNode);

			if (tempNode.left !== null) {
				queue.push(tempNode.left);
			}
			if (tempNode.right !== null) {
				queue.push(tempNode.right);
			}
		}

		return defaultCallback.array;
	}

	// Returns an array of values by
	// Going first left, reading the data and then right
	inOrder(callback = this.callback) {
		let defaultCallback = callback();
		let queue = [this.root];
		let temp = this.root;
		let temp2 = this.root;
		while (queue.length !== 0) {
			let tempNode = queue.shift();

			if (temp.left !== null) {
				temp = temp.left;
			} else {
				queue.push(temp);
			}
			if (temp.right !== null) {
			} else {
				queue.push(temp2);
			}
		}

		for (let i = 0; i < queue.length; i++) {
			console.log("1");
			defaultCallback.pushNode(queue[i]);
		}

		return defaultCallback.array;
	}

	preOrder(callback) {}

	postOrder(callback) {}

	height(node = this.array) {}

	depth(node = this.array) {}

	isBalanced() {}

	rebalance() {}
}

function test() {
	let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
	//let array = [1, 2, 3, 4];
	let prova0 = new Tree(array);
	prova0.arraySorter();
	prova0.buildTree();
	console.log();
	console.log(JSON.stringify(prova0.root, undefined, 4));
	console.log();
	prova0.prettyPrint(prova0.root);
	console.log();

	//console.log(prova0.find(6345));
	console.log(prova0.levelOrder(/*prova0.callback*/));
	console.log(prova0.inOrder());
}

test();
