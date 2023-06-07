import * as fs from 'fs';

let csvFile = fs.readFileSync('./basket.csv');
const arr = csvFile.toString().split("\r");

//console.log(headers);
let fruitBasket = [];

let headers = arr[0].split(',');

for(let i = 1; i < arr.length; i++) {
    let fruitData = arr[i].split(',');
    let fruit = [];
    for(let j = 0; j < fruitData.length; j++) {
        fruit[j] = fruitData[j];
    };
    fruitBasket.push(fruit);
    
};

function totalNumberOfFruits(arr) {
    let fruitsArr = arr;
    let total = fruitsArr.reduce((total, fruit) => total + Number(fruit[1]), 0);
    return total;
};

function totalTypesOfFruit(arr) {
    let fruitsArr = arr;
    let fruits = fruitsArr.map(fruit => fruit[0]);
    let uniqueFruits = [...new Set(fruits)];
    return uniqueFruits.length;
};

function totalOfEachTypeOfFruitDescending(arr) {
    let fruitsArr = arr;
    let fruits = fruitsArr.map(fruit => fruit.slice(0, 2));

    for(let i = 0; i < fruits.length; i++) {
        for(let j = i + 1; j < fruits.length; j++) {
            if(fruits[i][0] === fruits[j][0]) {
                fruits[i][1] = Number(fruits[i][1]) + Number(fruits[j][1]); 
                fruits.splice(j, 1);
                j--;
            };
        };
    };
    
    fruits.sort(function(a, b) {
        return b[1] - a[1];
    });

    return JSON.stringify(fruits);
};

function characteristicsOfFruitByType(arr) {
    let fruitsArr = arr;
    let fruits = fruitsArr.map(fruit => fruit.slice(0, 4));

    console.log(JSON.stringify(fruits));
};

function fruitsInBasketOverThreeDays(arr) {
    let fruitsArr = arr;
    let fruits = fruitsArr.filter(fruit => fruit.splice(2, 2));

    for(let i = 0; i < fruits.length; i++) {
        if(Number(fruits[i][2]) < 4) {
            fruits.splice(i, 1)
            i--;
        };
    };

    let oldFruits = fruits.filter(fruit => fruit.splice(2, 1));
    return JSON.stringify(oldFruits);
};


console.log(`The total number of fruits is ${totalNumberOfFruits(fruitBasket)}.`);
console.log(`The total number of types of fruits is ${totalTypesOfFruit(fruitBasket)}.`);
console.log(totalOfEachTypeOfFruitDescending(fruitBasket));
console.log(characteristicsOfFruitByType(fruitBasket));
console.log(`${fruitsInBasketOverThreeDays(fruitBasket)} are over 3 days old.`);