/*
Pig Latin
*/

function igpayAtinlay(str) {
  if (typeof str === "undefined" && typeof document !== "undefined") {
    str = document.getElementById("txtVal").value;
  }
  // TODO: Initialize the word array properly
  var returnArray = [],
    wordArray = str.split(" ");
  // TODO: make sure that the output is being properly built to produce the desired result.
  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var beginning = word.charAt(0);

    if (/[aeiouAEIOU]/.test(beginning)) {
      returnArray.push(word + "way");
      continue;
    }

    for (var ii = 1; ii < word.length; ii++) {
      if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
        break;
      } else {
        beginning += word.charAt(ii);
      }
    }
    returnArray.push(word.substring(beginning.length) + beginning + "ay");
  }
  var result = returnArray.join(" ");
  var lbl = null;
  if (typeof document !== "undefined") {
    lbl = document.getElementById("pigLatLbl");
  }
  if (lbl) {
    lbl.innerHTML = result;
  }
  return result;
}

// Some examples of expected outputs
console.log(igpayAtinlay("pizza")); // "izzapay"
console.log(igpayAtinlay("apple")); // "appleway"
console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"
