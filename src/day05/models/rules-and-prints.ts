export interface Rules {
    [key: number]: number[];
}

export interface Print {
    allValues: number[];
}

export interface RulesAndPrints {
    rules: Rules;
    prints: Print[];
}