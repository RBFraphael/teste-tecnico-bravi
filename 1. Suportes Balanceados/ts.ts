function validateBrackets(text: string = ""): boolean
{
    let stack: string[] = [];

    for(let i = 0; i < text.length; i++){
        let char: string = text.charAt(i);
        let lastChar: string|null = null;

        switch(char){
            case '(':
            case '[':
            case '{':
                stack.push(char);
                break;
            case ')':
                if(stack.length > 0){
                    lastChar = stack.pop() ?? null;
                    if(lastChar == "("){ break; }
                }
                return false;
            case ']':
                if(stack.length > 0){
                    lastChar = stack.pop() ?? null;
                    if(lastChar == "["){ break; }
                }
                return false;
            case '}':
                if(stack.length > 0){
                    lastChar = stack.pop() ?? null;
                    if(lastChar == "{"){ break; }
                }
                return false;
        }
    }

    return stack.length == 0;
}

let testCases: string[] = [
    "(){}[]",
    "[{()}](){}",
    "[]{()",
    "[{)]",
    "[](){}{[()()][()][]}"
];

testCases.forEach((testCase) => {
    let valid: boolean = validateBrackets(testCase);
    console.log(`${testCase} is ${valid ? "valid" : "invalid"}`);
});