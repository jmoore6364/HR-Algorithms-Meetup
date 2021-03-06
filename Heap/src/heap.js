var Heap = function(comparator) {
    this._data = [];
};

// Helper methods.
Heap.prototype._leftChildOf = function(index) {
    return 2*index + 1;
};
Heap.prototype._rightChildOf = function(index) {
    return 2*index + 2;
};
Heap.prototype._parentOf = function(index) {
    return index ? Math.floor((index - 1)/2) : undefined;
};
Heap.prototype._hasElementAt = function(index) {
    return typeof this._data[index] !== "undefined";
};
Heap.prototype._swap = function(index1, index2) {
    var temp = this._data[index1];
    this._data[index1] = this._data[index2];
    this._data[index2] = temp;
};
Heap.prototype.show = function(noLog) {
    if (!noLog) {
        console.log(this._data);
    }
    return this._data;
};

// For you to complete:
Heap.prototype.peek = function() {
    return this._data[0];
};

Heap.prototype.insert = function(element) {
    this._data.push(element);
    var current = this._data.length - 1;
    var parent = this._parentOf(current);
    var working = true;

    while (working) {
        if (this._data[parent] > this._data[current]) {
            this._swap(current, parent);
            current = parent;
            parent = this._parentOf(current);
        } else {
            working = false;
        }
    }

};

Heap.prototype.extract = function() {
    if (this._data.length === 1) {
        return this._data.pop();
    }

    var toReturn = this._data[0];
    this._data[0] = this._data.pop();
    var current = 0;
    var left = 1;
    var right = 2;
    var working = true;

    while (working) {
        if (this._hasElementAt(left) || this._hasElementAt(right)) {
            // Find which of the two children is smaller.
            var minChild;
            if (!this._hasElementAt(left)) {
                minChild = right;
            } else if (!this._hasElementAt(right)) {
                minChild = left;
            } else if (this._data[right] < this._data[left]) {
                minChild = right;
            } else {
                minChild = left;
            }

            if (this._data[current] > this._data[minChild]) {
                this._swap(current, minChild);
                current = minChild;
                left = this._leftChildOf(current);
                right = this._rightChildOf(current);
            } else {
                working = false;
            }
        } else {
            working = false;
        }
    }

    return toReturn;
};

