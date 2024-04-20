function test() {
	let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
	//let array = [1, 2, 3, 4, 5, 6];
	let prova0 = new Tree(array);
	prova0.arraySorter();
	prova0.buildTree();
	console.log();

	prova0.insert(1);
	prova0.insert(8000);
	prova0.insert(2);
	prova0.insert(2.5);

	prova0.remove(8000);
	prova0.remove(67);
	console.log(prova0.array);
	prova0.prettyPrint(prova0.root);
	console.log();
	console.log(prova0.array);

	//console.log(prova0.find(6345));
	//console.log(prova0.levelOrder(/*prova0.callback*/));
	console.log();
	//console.log(prova0.inOrder());
	//console.log();
	//console.log(prova0.preOrder());
	//console.log();
	//console.log(prova0.postOrder());
	//console.log();
	//console.log(prova0.depth(prova0.root.left));
	console.log(prova0.height(prova0.root.left));
	console.log(prova0.isBalanced());
	//console.log();
}

function randomArray(size, maxNumbers) {
	function getRandomInt(maxNumbers) {
		return Math.floor(Math.random() * maxNumbers);
	}
	let array = [];
	array.length = size;

	for (let i = 0; i < size; i++) {
		array[i] = getRandomInt(maxNumbers);
	}

	return array;
}

function driverScript() {
	// 1
	let binarySearchTree = new Tree(randomArray(10, 100));
	binarySearchTree.arraySorter();
	binarySearchTree.buildTree();
	console.log();
	binarySearchTree.prettyPrint();
	console.log();

	// 2
	console.log(binarySearchTree.isBalanced());
	console.log();

	// 3
	console.log("Level Order");
	console.log(binarySearchTree.levelOrder());
	console.log("In Order");
	console.log(binarySearchTree.inOrder());
	console.log("Pre Order");
	console.log(binarySearchTree.preOrder());
	console.log("Post Order");
	console.log(binarySearchTree.postOrder());
	console.log();

	// 4
	binarySearchTree.insert(160);
	binarySearchTree.insert(165);
	binarySearchTree.insert(165.5);
	binarySearchTree.insert(166);
	binarySearchTree.insert(125);
	binarySearchTree.insert(185);
	binarySearchTree.prettyPrint();

	// 5
	console.log(binarySearchTree.isBalanced());

	// 6
	binarySearchTree.rebalance();
	binarySearchTree.prettyPrint();

	// 7
	console.log(binarySearchTree.isBalanced());

	// 8
	console.log("Level Order");
	console.log(binarySearchTree.levelOrder());
	console.log("In Order");
	console.log(binarySearchTree.inOrder());
	console.log("Pre Order");
	console.log(binarySearchTree.preOrder());
	console.log("Post Order");
	console.log(binarySearchTree.postOrder());
	console.log();
}

//test();
driverScript();
