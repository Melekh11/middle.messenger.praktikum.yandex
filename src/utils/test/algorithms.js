
class DoublyLinkedList {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    add(value, index) {
        const node = createNode(value);
        if (index === undefined) {
            switch (this.size) {
                case 0: {
                    this.head = node;
                    this.tail = node;
                    break;
                }
                case 1: {
                    this.tail = node;
                    this.tail.next = this.head;
                    this.head.prev = this.tail;
                    break;
                }
                default: {
                    const prevTail = this.tail;
                    this.tail = node;
                    this.tail.next = prevTail;
                    prevTail.prev = this.tail;
                }
            }
            this.size++;
        } else {
            if (index > this.size || index < 0) throw new Error("за границы")
            switch (index) {
                case 0: {
                    if (!this.head) {
                        this.head = node;
                        this.tail = node;
                    } else {
                        const prevHead = this.head;
                        this.head = node;
                        this.head.prev = prevHead;
                        prevHead.next = this.head;
                    }
                    break;
                }
                case this.size: {
                    if (!this.tail) {
                        this.head = node;
                        this.tail = node;
                    } else {
                        const prevTail = this.tail;
                        this.tail = node;
                        this.tail.next = prevTail;
                        prevTail.prev = this.tail;
                    }
                    break;
                }
                default: {
                    let count = 0,
                        iter = this.head;
                    while (count !== index) {
                        count++;
                        iter = iter.prev;
                    }
                    node.next = iter.next;
                    node.prev = iter;
                    iter.next.prev = node;
                    iter.next = node;
                }
            }
            this.size++;
        }
    }

    // Удаляет элемент из списка по значению.
    // Удаляет только первый найденный элемент.
    // Если элемент не найден, ничего делать не нужно.
    removeByValue(value) {
        if (this.size === 0) return "empty list";
        let iter = this.head;
        while(iter.prev && iter.value !== value){
            iter = iter.prev;
        }
        if (iter.value === value){
            this.delete(iter);
            return "success"
        } else return "не нашли :/";
    }

    // Удаляет элемент из списка по индексу.
    // Если индекс за пределами — кидает ошибку.
    removeByIndex(index) {
        if (index >= this.size || index < 0) throw new Error("no");
        if (this.size === 0) throw new Error("no");
        let iter = this.head;
        for(let i=0; i<index; i++){
            iter = iter.prev;
        }
        this.delete(iter);
        return "success"

    }

    delete(iter){
        if (iter === this.head){
            if (this.size !== 0 && this.size !== 1) {
                this.head = this.head.prev;
                this.head.next = null;
            } else {
                this.head = null;
                this.tail = null;
            }
        } else if (iter === this.tail){
            if (this.size !== 0 && this.size !== 1) {
                this.tail = this.tail.next;
                this.tail.prev = null;
            } else {
                this.head = null;
                this.tail = null;
            }
        } else {
            iter.prev.next = iter.next;
            iter.next.prev = iter.prev;
        }
        this.size--;
    }

    // Ищет элемент в списке по индексу.
    // Если индекс за пределами — кидает ошибку.
    searchByIndex(index) {
        if (index >= this.size || index < 0) throw new Error("no");
        let iter = this.head;
        for (let i=0; i<index; i++){
            iter = iter.prev;
        }
        return iter;
    }

    // Ищет элемент в списке по значению.
    // Возвращает первый найденный элемент.
    // Опционально можно указать индекс начала поиска.
    // Если индекс за пределами — кидает ошибку.
    // Если элемент не найден, нужно вернуть null.
    searchByValue(value, startIndex = 0) {
        if (startIndex >= this.size || startIndex < 0) throw new Error("no");
        let iter = this.head;
        for (let i=0; i<startIndex; i++){
            iter = iter.prev;
        }
        while(iter.prev && iter.value !== value){
            iter = iter.prev;
        }

        if (iter.value === value){
            return iter;
        } else return null;
    }

    getValues() {
        const ans = [];
        let iter = this.head;
        if (!iter) {
            return ans;
        }
        while (iter.prev) {
            ans.push(iter.value);
            iter = iter.prev;
        }
        ans.push(iter.value);
        return ans;
    }
}

// Создаёт новую ноду, где
// value — её значение,
// next — ссылка на следующую ноду,
// prev — ссылка на предыдущую ноду
function createNode(value) {
    return {
        value,
        next: null,
        prev: null,
    };
}


function ListNode(val, next) {
    this.value = (value === undefined ? 0 : value)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */


/*
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
*/

const node1 = {
    value: 5,
    next: null
}

const node2 = {
    value: 4,
    next: node1
}

const node3 = {
    value: 3,
    next: node2
}

const node4 = {
    value: 2,
    next: node3
}

const node5 = {
    value: 1,
    next: node4
}



function reverse(head) {
    let iter = head,
        count = 0,
        prevIter;
    while(iter.next){
        if (count === 0){
            const willIter = iter.next;
            iter.next = null;
            prevIter = iter;
            iter = willIter;
            count++;
        } else {
            const willIter = iter.next;
            console.log(willIter)
            iter.next = prevIter;
            console.log(willIter);
            prevIter = iter;
            iter = willIter;
            count++;
        }
    }
    iter.next = prevIter;
    return iter;
}

let iter = reverse(node5);
while (iter.next){
    console.log(iter.value);
    iter = iter.next;
}
console.log(iter.value);

