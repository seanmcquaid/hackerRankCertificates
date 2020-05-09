function findSubstring(s, k) {
    let mostAmountOfVowels = 0;
    let subStringWithMostVowels = "";

    for(let i = 0; i < k - 1; i++){
        
        const subString = s.substring(i, i + k);
        
        const m = subString.match(/[aeiou]/gi);
        const vowelCount = m === null ? 0 : m.length;

        if(vowelCount > mostAmountOfVowels){
            mostAmountOfVowels = vowelCount;
            subStringWithMostVowels = subString;
        }
    }
    if(mostAmountOfVowels === 0){
        return "Not found!"
    }

    return subStringWithMostVowels
}

console.log(findSubstring("caberqiitefg", 5))