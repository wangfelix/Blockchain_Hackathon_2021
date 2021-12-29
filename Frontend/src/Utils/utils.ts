export interface HashTable<T> {
    [key: string]: T;
}

export const parseMediCoin = (medicoin: string) => {
    let temp = medicoin;

    if (temp.length < 19) {
        const diffToEigtheen = 18 - temp.length;

        for (let i = 0; i <= diffToEigtheen; i++) {
            temp = "0" + temp;
        }
    }

    temp = temp.substring(0, temp.length - 18) + "." + temp.substring(temp.length - 18);

    let decimalIndex = temp.indexOf(".");

    return temp.substring(0, decimalIndex + 3);
};

export const isEven = (num: number) => num % 2 === 0;

export const getRandomNumberBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

export const getRandomElementFromArray = (array: any[]) => array[Math.floor(Math.random() * array.length)];

export const isEmptyString = (str: string) => str === "";
