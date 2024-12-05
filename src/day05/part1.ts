import * as helpers from './helper';
import { Print, Rules, RulesAndPrints } from './models/rules-and-prints';

export const solvePart1 = (): any => {
  const rulesAndPrints: RulesAndPrints = helpers.getRulesAndPrints();
  
  const validPrints = findAllValidPrints(rulesAndPrints);

  const allMiddleNumbersAdded = validPrints.reduce((acc, print) => {
    return acc + print.allValues[Math.ceil(print.allValues.length / 2) - 1];
  } , 0);

  return allMiddleNumbersAdded;
};

function findAllValidPrints(rulesAndPrints: RulesAndPrints): Print[] {
  const validPrints: Print[] = [];
  
  for(let print of rulesAndPrints.prints) {
    let validRules = getAllValidRules(rulesAndPrints.rules, print);
    validRules = Object.fromEntries(Object.entries(validRules).filter(([_, values]) => values.length > 0));
    const printVals = print.allValues;

    // console.log(validRules);
    // console.log(printVals);

    const printIsValid = Object.keys(validRules).every((firstRule) => {
      return Array.from(validRules[parseInt(firstRule)].values()).every((secondRule) => {
        const ruleOne = parseInt(firstRule);
        const firstRuleIndex = printVals.indexOf(ruleOne);
        const secondRuleIndex = printVals.indexOf(secondRule);
        return firstRuleIndex < secondRuleIndex && (firstRuleIndex !== -1 && secondRuleIndex !== -1);
      });
    });

    if (printIsValid) {
      validPrints.push(print);
    }
  }

  return validPrints;
}

function getAllValidRules(rules: Rules, print: Print): Rules {
  return Object.keys(rules).reduce((acc, key) => {
    const numKey = parseInt(key);
    if (print.allValues.includes(numKey)) {
      acc[numKey] = rules[numKey].filter((val) => print.allValues.includes(val));
    }
    return acc;
  }, {} as Rules);
}
