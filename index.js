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

	buildTree(array = this.array) {
		// NEED TO: Sort, remove duplicates
		let start = 0;
		let end = array.length - 1;
		let mid = (start + end) / 2;

		if (start > end) {
			return null;
		} else {
			let arrayBeforeMid = array.slice(0, mid - 1);
			let arrayAfterMid = array.slice(mid + 1, end);
			let node = new Node(array[mid]);
			node.left = this.buildTree(arrayBeforeMid);
			node.right = this.buildTree(arrayAfterMid);

			return (this.root = node);
		}
	}
}

function test() {
	//let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
	let array = [1, 7, 4, 23, 8, 9/*, 4*/, 3, 5, 7/*, 9*/, 67, 6345, 324];
	array.sort((a, b) => a - b);
	console.log(array);
	console.log();

	let prova0 = new Tree(array);
	prova0.buildTree();
	console.log(prova0.root);
}

test();
