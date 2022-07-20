class DoublyLinkedList {
    size;
    head;
    tail;
    nodes;

    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    add(value, index) {
        if (index !== undefined) {
            if (index < 0 || index > this.size) {
                this.size--;
                throw new Error("no");
            }

            const node = createNode(value);

            switch (index) {
                case 0: {
                    const prevHead = this.head;
                    this.head = node;
                    this.head.prev = prevHead;
                    prevHead.next = this.head;
                    break;
                }
                case this.size: {
                    const prevTail = this.tail;
                    this.tail = node;
                    this.tail.next = prevTail;
                    prevTail.prev = this.tail;
                    break;
                }
                default : {
                    let counter = 0,
                        iter = this.head;

                    while (counter !== index) {
                        counter++;
                        iter = iter.prev;
                    }
                    node.next = iter.next;
                    node.prev = iter;
                    iter.next.prev = node;
                    iter.next = node;
                }
            }
        } else {
            const node = createNode(value);

            switch (this.size) {
                case 0: {
                    this.head = node;
                    this.tail = node;
                    break
                }
                case 1: {
                    this.tail = node;
                    this.tail.next = this.head;
                    this.head.prev = this.tail;
                    break
                }
                default: {
                    const prevTail = this.tail;
                    this.tail = node;
                    this.tail.next = prevTail;
                    prevTail.prev = this.tail;
                    break
                }
            }

        }
        this.size++;
    }

    getAll() {
        if (this.tail === null) {
            return "there is no values";
        } else {
            let iter = this.tail;
            const ans = [];
            while (iter.next !== null) {
                ans.push(iter.value);
                iter = iter.next
            }
            ;
            ans.push(iter.value);
            return ans.reverse();
        }
    }

    removeByValue(value){
        let iter = this.head;
        while(iter.prev !== null && iter.value !== value){
            iter = iter.prev;
        }
        if (iter.value === value){
            this.size--;
            if (iter.prev === null && iter.next === null){
                this.head = null;
                this.prev = null;
            } else if (iter.prev === null && iter.next !== null) {
                this.tail = this.tail.next;
                this.tail.prev = null;
            } else if (iter.prev !== null && iter.next === null) {
                this.head = this.head.prev;
                this.head.next = null;
            } else {
                iter.prev.next = iter.next;
                iter.next.prev = iter.prev;
            }
            return this.size;
        } else {
            return null;
        }
    }

    removeByIndex(index){
        if (){
            throw new Error("qwerty");
        }

        let count = 0,
            iter = this.head;

        switch (index){
            case (index < 0 || index >= this.size):{
                throw new Error('no');
                break;
            }
            case 0: {
                this.size--;
                this.head = this.head.prev;
                this.head.next = null;
                break;
            }

            case this.size-1: {
                this.tail
            }
        }

    }
}

// Удаляет элемент из списка по значению.
// Удаляет только первый найденный элемент.
// Если элемент не найден, ничего делать не нужно.
// removeByValue(value)
// {
// }

// Удаляет элемент из списка по индексу.
// Если индекс за пределами — кидает ошибку.
// removeByIndex(index)
// {
// }

// Ищет элемент в списке по индексу.
// Если индекс за пределами — кидает ошибку.
// searchByIndex(index)
// {
// }

// Ищет элемент в списке по значению.
// Возвращает первый найденный элемент.
// Опционально можно указать индекс начала поиска.
// Если индекс за пределами — кидает ошибку.
// Если элемент не найден, нужно вернуть null.
// searchByValue(value, startIndex = 0)
// {
// }

// Создаёт новую ноду, где
// value — её значение,
// next — ссылка на следующую ноду,
// prev — ссылка на предыдущую ноду
function createNode(val) {
    return {
        prev: null,
        next: null,
        value: val
    }
}

const myList = new DoublyLinkedList();

myList.add(7);
myList.add(-15);
myList.add("new elem", 2);
myList.add("qwerty", 3);
console.log(myList.getAll());
// console.log(myList.head);
console.log(myList.removeByValue(7));
console.log(myList.getAll());


// console.log(myList.nodes);
