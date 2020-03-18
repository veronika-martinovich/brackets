module.exports = function check(str, bracketsConfig) {
  let openSymbols = [];
  let permissibleOpenSymbols = [];
  let permissibleCloseSymbols = [];
  let changedOpenSymbol = '';
  let changedCloseSymbol = '';
  let changedSymbols = {};
  
  for (let i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
        changedOpenSymbol += '+';
        changedCloseSymbol += '-';
        changedSymbols[bracketsConfig[i][0]] = {
          openSymbol: changedOpenSymbol,
          closeSymbol: changedCloseSymbol
      }
      console.log(changedSymbols)
      permissibleOpenSymbols.push(changedSymbols[bracketsConfig[i][0]].openSymbol);
      permissibleCloseSymbols.push(changedSymbols[bracketsConfig[i][0]].closeSymbol);
    } else {
      permissibleOpenSymbols.push(bracketsConfig[i][0]);
      permissibleCloseSymbols.push(bracketsConfig[i][1]);
    }
  }

  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (changedSymbols.hasOwnProperty(str[i]) && counter % 2 == 0) {
      str = str.slice(0, str.indexOf(str[i])) + changedSymbols[str[i]].openSymbol + str.slice(str.indexOf(str[i])+1);
      counter++;
    } else if (changedSymbols.hasOwnProperty(str[i]) && counter % 2 != 0) {
      str = str.slice(0, str.indexOf(str[i])) + changedSymbols[str[i]].closeSymbol + str.slice(str.indexOf(str[i])+1);
      counter++;
    }
  }

  for (let i = 0; i < str.length ; i++) {
    if (permissibleOpenSymbols.includes(str[i])) {
      openSymbols.push(str[i]);
    } else if (permissibleCloseSymbols.includes(str[i]) && 
    permissibleCloseSymbols.indexOf(str[i]) === permissibleOpenSymbols.indexOf(openSymbols[openSymbols.length - 1]) ) {
      openSymbols.pop();
    } else if (!permissibleOpenSymbols.includes(str[i]) || !permissibleCloseSymbols.includes(str[i])) {
      return false
    }
  }

  if (openSymbols.length === 0) return true;
  else return false;
}
