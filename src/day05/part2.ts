import * as helpers from './helper';
import { RulesAndPrints, Print, Rules } from './models/rules-and-prints';

export const solvePart2 = (): any => {
  const rulesAndPrints: RulesAndPrints = helpers.getRulesAndPrints();
  
  const validPrints = findAllInvalidPrints(rulesAndPrints);

  const allMiddleNumbersAdded = validPrints.reduce((acc, print) => {
    return acc + print.allValues[Math.ceil(print.allValues.length / 2) - 1];
  } , 0);

  return allMiddleNumbersAdded;
};

function findAllInvalidPrints(rulesAndPrints: RulesAndPrints): Print[] {
  const invalidPrints: Print[] = [];
  for(let print of rulesAndPrints.prints) {
    let validRules = getAllValidRules(rulesAndPrints.rules, print);
    validRules = Object.fromEntries(Object.entries(validRules).filter(([_, values]) => values.length > 0));
    const printVals = print.allValues;

    const printIsValid = Object.keys(validRules).every((firstRule) => {
      return Array.from(validRules[parseInt(firstRule)].values()).every((secondRule) => {
        const ruleOne = parseInt(firstRule);
        const firstRuleIndex = printVals.indexOf(ruleOne);
        const secondRuleIndex = printVals.indexOf(secondRule);
        return firstRuleIndex < secondRuleIndex && (firstRuleIndex !== -1 && secondRuleIndex !== -1);
      });
    });

    if (!printIsValid) {
      invalidPrints.push(sortInvalidPrints(print, validRules));
    }
  }

  return invalidPrints;
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

function sortInvalidPrints(invalidPrint: Print, validRules: Rules): Print {
  invalidPrint.allValues.sort((a: number, b: number) => {
    if(validRules[a] === undefined) {
      return 1;
    } else if(validRules[b] === undefined) {
      return -1;
    }
    return validRules[b].length - validRules[a].length;
  });
  return invalidPrint;
}
