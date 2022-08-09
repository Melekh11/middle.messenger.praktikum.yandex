class Animal {
    public anType: string;
    constructor(type: string) {
        this.anType = type;
    }
}



class Dog extends Animal{
    public name: string;
    constructor(type: string, name: string) {
        super(type);
        console.log(this);
        this.name = name;

    }
}

class Cat extends Animal{
    public sound: string;

    constructor(type: string, sound: string) {
        super(type);
        this.sound = sound;
    }
}

function createAnimal<T extends Animal>(smt: T): T {
    console.log(smt)
    return new smt("ihib");
}

console.log(createAnimal(Cat));