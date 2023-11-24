function validateBrackets(text = "")
{
    let stack = [];

    for(let i = 0; i < text.length; i++){
        let char = text.charAt(i);
        let lastChar = "";

        switch(char){
            case '(':
            case '[':
            case '{':
                stack.push(char);
                break;
            case ')':
                if(stack.length > 0){
                    lastChar = stack.pop();
                    if(lastChar == "("){ break; }
                }
                return false;
            case ']':
                if(stack.length > 0){
                    lastChar = stack.pop();
                    if(lastChar == "["){ break; }
                }
                return false;
            case '}':
                if(stack.length > 0){
                    lastChar = stack.pop();
                    if(lastChar == "{"){ break; }
                }
                return false;
        }
    }

    return stack.length == 0;
}

let testCases = [
    "(){}[]",
    "[{()}](){}",
    "[]{()",
    "[{)]",
    "[](){}{[()()][()][]}"
];

testCases.forEach((testCase) => {
    let valid = validateBrackets(testCase);
    console.log(`${testCase} is ${valid ? "valid" : "invalid"}`);
});