var INDENT_DELTA = "    "
var INDENT_HALF_DELTA = "  "

function advanceToNot(text, index, skipCharacter) {
    while(text[index] == skipCharacter) {
        index++
    }
    return index
}

function getOpeningBracket(closingBracket) {
    switch(closingBracket) {
        case '}': return '{'
        case ')': return '('
        case ']': return '['
    }
    throw 'unknown bracket ' + closingBracket
}

function moveSingleElementInBlockBackToSingleLine(text) {
    var brackets = ['(','{','[']
    var closingBrackets = [')','}',']']
    for(var bracketI = 0; bracketI < brackets.length; bracketI++) {
        var i = text.length - 1
        while(i > 0) {
            var i = text.lastIndexOf(brackets[bracketI], i);
            if (i < 0)
                break;
            var openingBracketIndex = i;
            i--;
            var singleElementStart = i + 3
            if (text[singleElementStart - 1] != '\n')
                continue;
            var singleElementEnd = text.indexOf('\n', singleElementStart)
            if (singleElementEnd < 0)
                continue
            var closingBracketIndex = advanceToNot(text, singleElementEnd + 1, ' ')
            if (text[closingBracketIndex] != closingBrackets[bracketI])
                continue
            singleElementStart = advanceToNot(text, singleElementStart, ' ')
            text = text.substring(0, openingBracketIndex + 1) +
                    text.substring(singleElementStart, singleElementEnd) +
                    text.substring(closingBracketIndex)
        }
    }
    return text
}

function formatWordEqualWordSpaceInternal(text) {
    if (! /([0-9a-z]+=.* )+/gi.test(text))
        return text

    var i = advanceToNot(text, 0, ' ')
    var b = i
    var indent = text.substring(0, i) + INDENT_DELTA
    var result = indent
    while( i < text.length) {
        i = text.indexOf('=', i)
        if ( i < 0 )
            break
        i = text.indexOf(' ', i)
        if ( i < 0 )
            break
        result += text.substring(b, i) + "\n" + indent
        i++
        b=i
    }
    return result + text.substring(b)
}

function formatWordEqualWordSpace(text) {
    var lines = text.split("\n", -1)
    var result = ""
    for(var i = 0 ; i < lines.length; i++) {
        result += formatWordEqualWordSpaceInternal(lines[i]) + "\n"
    }
    return result
}

function formatOneLinerInternal(text) {
    var result = ""
    var indent = ""

    for(var i = 0; i < text.length; i++) {
        switch(text[i]) {
            case '(':
            case '{':
            case '[':
                indent += INDENT_DELTA
                result += text[i] + "\n" + indent
                break;
            case ')':
            case '}':
            case ']':
                indent = indent.substring(INDENT_DELTA.length)
                result += "\n" + indent + text[i]
                break;
            case ',':
                result += text[i] + "\n" + indent
                i = advanceToNot(text, i + 1, ' ') - 1
                break;
            case ' ':
                result += text[i];
                break;
            default:
                result += text[i];
                break;
        }
    }

    result = formatWordEqualWordSpace(result)
    result = moveSingleElementInBlockBackToSingleLine(result)

    return result
}

function formatOneLiner() {
    var text = document.getElementById('oneliner')
    document.getElementById('formattedLine').innerHTML = "<pre>" + text + "</pre>"
}
