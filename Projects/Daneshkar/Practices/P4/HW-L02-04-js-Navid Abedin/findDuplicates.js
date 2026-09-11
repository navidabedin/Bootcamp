function findDuplicates(str) {
    
  const words = str.toLowerCase().split(/\s+/);
  const count = {};

  for (const word of words) {
    count[word] = (count[word] || 0) + 1;
  }

  return Object.keys(count).filter(word => count[word] > 1);
}

console.log(findDuplicates("Navid Abedin is here for two hours and struggling. this is two how Navid behave here"));

