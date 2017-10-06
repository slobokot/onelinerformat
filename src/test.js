function check(text) {
    var formatted = formatOneLinerInternal(text)
    var newdiv = document.createElement('div')
    newdiv.id = 'block'
    newdiv.className = 'block'
    newdiv.innerHTML = "<pre>" + formatted + "</pre>"
    document.getElementById('result').appendChild(newdiv);
    var hr = document.createElement('hr')
    document.getElementById('result').appendChild(hr);
}

window.onload = function() {
    check("some stuff (goes here)")
    check("some, random, crap")
    check("here (and here, and even=jkljds sjkl=jklsakjdf)")
    //check("with ((errrors, why not) ] [[ ]]]")
    check("with [single liner] [live in one string]")
    check("a=b some=fjklds jkljasd=ejkrlwe")
    check("a=b some=[fdsf=fjklds jkljasd=ejkrlwe]")
}