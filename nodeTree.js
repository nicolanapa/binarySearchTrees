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

		//console.log("New sorted array:", this.array);
		return this.array;
	}

	// Builds the Balanced Binary Search Tree
	// Working
	buildTree(array = this.array) {
		let start = 0;
		let end = array.length - 1;
		let mid = Math.round((start + end) / 2);

		if (start > end) {
			return null;
		} else {
			let arrayBeforeMid = array.slice(0, mid);
			let arrayAfterMid = array.slice(mid + 1, mid + end);

			let node = new Node(array[mid]);
			node.left = this.buildTree(arrayBeforeMid);
			node.right = this.buildTree(arrayAfterMid);

			return (this.root = node);
		}
	}

	// Prints the Balanced BST in a horizontally way
	// Working
	prettyPrint(node = this.root, prefix = "", isLeft = true) {
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

	// Inserts a given value in a BST
	// Working
	insert(value) {
		this.array.push(value);
		this.arraySorter();
		let temp = this.root;
		let temp2;

		if (this.root === null) {
			return (this.root = new Node(value));
		}

		while (temp !== null) {
			if (value === temp.data) {
				return new Error("Can't insert the same value");
			} else if (value < temp.data) {
				temp2 = temp;
				temp = temp.left;
			} else if (value > temp.data) {
				temp2 = temp;
				temp = temp.right;
			}
		}

		let node = new Node(value);

		if (value > temp2.data) {
			return (temp2.right = node);
		} else if (value < temp2.data) {
			return (temp2.left = node);
		}

		return null;
	}

	// Removes a given value in a BST
	// Working
	remove(value) {
		let index = this.array.indexOf(value);
		if (index !== -1) {
			this.array.splice(index, 1);
		} else {
			return new Error("Value not found");
		}
		this.arraySorter();
		this.buildTree();
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

	// Returns an array of values by
	// (Breadth First Search) Going from left to right once for level
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
	// Working
	inOrder(callback = this.callback) {
		let defaultCallback = callback();
		let queue;
		let tempNode;
		let array1 = undefined;
		let array2 = undefined;
		if (this.root.left !== null) {
			queue = [this.root.left];
			while (queue.length !== 0) {
				tempNode = queue.pop();
				if (tempNode.left !== null) {
					queue.push(tempNode.left);
				}
				if (tempNode.right !== null) {
					queue.push(tempNode.right);
				}

				defaultCallback.pushNode(tempNode);
			}
			array1 = defaultCallback.array;
			array1 = array1.sort((a, b) => a - b);
			defaultCallback.array = [];
			defaultCallback.pushNode(this.root);
			array1 = array1.concat(defaultCallback.array);
			defaultCallback.array = [];
		}

		let defaultCallback2 = callback();

		if (this.root.right !== null) {
			queue = [this.root.right];
			while (queue.length !== 0) {
				tempNode = queue.pop();
				if (tempNode.left !== null) {
					queue.push(tempNode.left);
				}
				if (tempNode.right !== null) {
					queue.push(tempNode.right);
				}

				defaultCallback2.pushNode(tempNode);
			}

			array2 = defaultCallback2.array;
			array2 = array2.sort((a, b) => a - b);
			defaultCallback2.array = [];
		}

		if (array1 !== undefined && array2 !== undefined) {
			let array = array1;
			array = array.concat(array2);
			return array;
		} else if (array1 !== undefined) {
			return array1;
		} else if (array2 !== undefined) {
			return array2;
		} else {
			return this.root;
		}
	}

	// Returns an array of values by
	// Reading first data then going left then right
	// Working
	preOrder(callback = this.callback) {
		let defaultCallback = callback();
		let queue = [];
		queue.push(this.root);

		while (queue.length !== 0) {
			let tempNode = queue.shift();
			defaultCallback.pushNode(tempNode);

			if (tempNode.right !== null) {
				queue.unshift(tempNode.right);
			}
			if (tempNode.left !== null) {
				queue.unshift(tempNode.left);
			}
		}

		return defaultCallback.array;
	}

	// Returns an array of values by
	// Going first left then right then reading the data
	// Working
	postOrder(callback = this.callback) {
		let defaultCallback = callback();
		let queue;
		let tempNode;
		let array1 = undefined;
		let array2 = undefined;
		if (this.root.left !== null) {
			queue = [this.root.left];

			while (queue.length !== 0) {
				let tempNode = queue.pop();
				defaultCallback.pushNode(tempNode);

				if (tempNode.right !== null) {
					queue.push(tempNode.right);
				}
				if (tempNode.left !== null) {
					queue.unshift(tempNode.left);
				}
			}

			array1 = defaultCallback.array;
			array1.reverse();
			defaultCallback.array = [];
		}

		let defaultCallback2 = callback();

		if (this.root.right !== null) {
			queue = [this.root.right];

			while (queue.length !== 0) {
				let tempNode = queue.shift();
				defaultCallback2.pushNode(tempNode);

				if (tempNode.right !== null) {
					queue.push(tempNode.right);
				}
				if (tempNode.left !== null) {
					queue.push(tempNode.left);
				}
			}

			array2 = defaultCallback2.array;
			defaultCallback2.array = [];
			array2.reverse();
			defaultCallback2.pushNode(this.root);
			array2 = array2.concat(defaultCallback2.array);
			defaultCallback2.array = [];
		}

		if (array1 !== undefined && array2 !== undefined) {
			let array = array1;
			array = array.concat(array2);

			return array;
		} else if (array1 !== undefined) {
			return array1;
		} else if (array2 !== undefined) {
			return array2;
		} else {
			return this.root;
		}
	}

	// Returns the height of a given node to the biggest leaf one
	// Working
	height(node = this.array) {
		if (node == null) {
			return 0;
		}

		return Math.max(this.height(node.left), this.height(node.right)) + 1;
	}

	// Returns the depth of a node from the root
	// Working
	depth(node = this.array) {
		let temp = this.root;
		let depth = 0;
		while (temp !== null) {
			if (node.data === temp.data) {
				return depth;
			} else if (node.data < temp.data) {
				temp = temp.left;
				depth += 1;
			} else if (node.data > temp.data) {
				temp = temp.right;
				depth += 1;
			}
		}

		return null;
	}

	// Checks if a BST is balanced
	// Working
	isBalanced() {
		if (this.array == null) {
			return true;
		}

		let left = this.height(this.root.left) + 1;
		let right = this.height(this.root.right) + 1;

		if (left - right >= -1 && left - right <= 1) {
			return true;
		}

		return false;
	}

	// Sorts the array and rebalances the BST
	// Working
	rebalance() {
		this.array = this.arraySorter();
		this.buildTree();
	}
}

export { Node, Tree };
