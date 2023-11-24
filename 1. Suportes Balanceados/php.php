<?php

function validateBrackets(string $text = ""): bool
{
    $stack = [];

    for($i = 0; $i < strlen($text); $i++){
        $char = $text[$i];

        switch($char){
            case '(':
            case '[':
            case '{':
                array_push($stack, $char);
                break;
            case ')':
                if(count($stack) > 0){
                    $lastChar = array_pop($stack);
                    if($lastChar == "("){ break; }
                }
                return false;
            case ']':
                if(count($stack) > 0){
                    $lastChar = array_pop($stack);
                    if($lastChar == "["){ break; }
                }
                return false;
            case '}':
                if(count($stack) > 0){
                    $lastChar = array_pop($stack);
                    if($lastChar == "{"){ break; }
                }
                return false;
        }
    }

    return count($stack) == 0;
}

$testCases = [
    "(){}[]",
    "[{()}](){}",
    "[]{()",
    "[{)]",
    "[](){}{[()()][()][]}"
];

foreach($testCases as $testCase){
    $valid = validateBrackets($testCase);
    echo $testCase." is ".($valid ? "valid" : "invalid").PHP_EOL;
}