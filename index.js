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

	arraySorter(array) {
		this.array = array.sort((a, b) => a - b);
		this.array = array.filter((item, index) => array.indexOf(item) === index);

		console.log("New sorted array:", this.array);
		return this.array;
	}

	buildTree(array = this.array) {
		this.array = this.arraySorter(array);
		array = this.array;
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
}

function test() {
	let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

	let prova0 = new Tree(array);
	prova0.buildTree();
	console.log();
	console.log(JSON.stringify(prova0.root, undefined, 4));
	console.log();
	prova0.prettyPrint(prova0.root);
	console.log();
}

test();
