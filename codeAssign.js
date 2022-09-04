class Dog {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }

    describe() {
        return `${this.name} lives ${this.location}.`;
    }
}

class Shelter {
    constructor(name) {
        this.name = name;
        this.dogs = [];
    }

    addDog(dog) {
        if(dog instanceof Dog) {
          this.dogs.push(dog);  
        } else {
            throw new Error(`You can only add an instance of dog. Arugment is not a dog: ${Dog}`);
        }
    }

    describe() {
        return `${this.name} has ${this.dogs.length} dogs.`;
    }
}

class Menu {
    constructor() {
        this.shelters = [];
        this.selectedShelter = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createShelter();
                    break;
                case '2':
                    this.viewShelter();
                    break;
                case '3':
                    this.deleteShelter();
                    break;
                case '4':
                    this.displayShelters();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new shelter
        2) view shelter
        3) delete shelter   
        4) display all shelters
    `);
    }

    showShelterMenuOptions(shelterInfo) {
        return prompt(`
        0) back
        1) create dog
        2) delete dog
        -----------------------
        ${shelterInfo}
        `);
    }

    displayShelters() {
        let shelterString = '';
        for (let i = 0; i < this.shelters.length; i++) {
            shelterString += i + ') ' + this.shelters[i].name + '\n';
        }
        alert(shelterString);
    }
    
    createShelter() {
        let name = prompt('Enter name for Shelter:');
        this.shelters.push(new Shelter(name));
    }
    
    viewShelter() {
        let index = prompt('Enter the index of the shelter you wish to view:');
        if (index > -1 && index < this.shelters.length) {
            this.selectedShelter = this.shelters[index];
            let description = 'Shelter Name: ' + this.selectedShelter.name + '\n';
        
            for (let i = 0; i < this.selectedShelter.dogs.length; i++) {
            description += i + ') ' + this.selectedShelter.dogs[i].name 
            + ' - ' + this.selectedShelter.dogs[i].location + '\n';
            }

        let selection = this.showShelterMenuOptions(description);
        switch (selection) {
            case '1':
                this.createDog();
                break;
            case '2':
                this.deleteDog();
            }
        }
    }

    deleteShelter() {
        let index = prompt('Enter the index of the shelter you wish to delete:');
        if (index > -1 && index < this.shelters.length) {
            this.shelters.splice(index, 1);
        }
    }

    createDog() {
        let name = prompt('Enter name for new dog:');
        let location = prompt('Enter location for new dog:');
        this.selectedShelter.dogs.push(new Dog(name, location));
    }
    
    deleteShelter() {
        let index = prompt('Enter the index of the shelter you wish to delete:');
        if (index > -1 && index < this.selectedShelter.Dogs.length) {
            this.selectedShelter.Dogs.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();