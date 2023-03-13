
function countCharacters() {
  const text = document.getElementById("text").value;
  const count = text.length;
  document.getElementById("count").innerHTML = `Number of characters: ${count}`;
}




function convertToWords() {
  const number = document.getElementById("number").value;
  const words = numberToWords(number);
  document.getElementById("result").innerHTML = words;
}

function numberToWords(number) {
  const units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const scales = ["", "thousand", "million", "billion", "trillion"];

  let numArr = number.split(".");
  let integerPart = numArr[0];
  let decimalPart = numArr[1];

  if (integerPart == "") {
    return "";
  }

  if (integerPart == "0") {
    return "zero";
  }

  if (integerPart.length > 15) {
    return "Number is too large";
  }

  let integerPartWords = "";
  let decimalPartWords = "";

  for (let i = integerPart.length - 1, j = 0; i >= 0; i -= 3, j++) {
    let chunk = integerPart.substring(Math.max(0, i - 2), i + 1);
    let chunkWords = "";

    if (chunk.length == 3) {
      chunkWords += units[chunk.charAt(0)] + " hundred ";
      chunk = chunk.substring(1);
    }

    if (chunk.length == 2) {
      let tensDigit = chunk.charAt(0);
      let unitsDigit = chunk.charAt(1);

      if (tensDigit == "1") {
        chunkWords += teens[unitsDigit] + " ";
      } else {
        chunkWords += tens[tensDigit] + " ";
        chunkWords += units[unitsDigit] + " ";
      }
    }

    if (chunk.length == 1) {
      chunkWords += units[chunk.charAt(0)] + " ";
    }

    if (chunk != "") {
      chunkWords += scales[j] + " ";
    }

    integerPartWords = chunkWords + integerPartWords;
  }

  if (decimalPart != undefined) {
    if (decimalPart.length != 2) {
      return "Invalid number format";
    }

    if (decimalPart == "00") {
      decimalPartWords = "";
    } else {
      decimalPartWords = numberToWords(decimalPart) + " cents";
    }
  }

  return (
    integerPartWords.trim() +
    (decimalPartWords ? " and " + decimalPartWords : "")
  );
}


function reverseNumber() {
  const number = document.getElementById("number_reverce").value;
  if (isNaN(parseFloat(number))) {
    document.getElementById("result_reverse").innerHTML =
      "Please enter a valid number.";
  } else {
    const reversedNumber = parseFloat(
      number.toString().split("").reverse().join("")
    );
    document.getElementById("result_reverse").innerHTML = reversedNumber;
  }
}



let previewContainer = document.querySelector(".click__div");
let previewBox = previewContainer.querySelectorAll(".click");

document.querySelectorAll(".logo").forEach((product) => {
  product.onclick = () => {
    previewContainer.style.display = "flex";
    let name = product.getAttribute("data-name");
    previewBox.forEach((preview) => {
      let target = preview.getAttribute("data-target");
      if (name == target) {
        preview.classList.add("active");
      }
    });
  };
});
//тут функція для закриття
previewBox.forEach((close) => {
  close.querySelector(".fa-times").onclick = () => {
    close.classList.remove("active");
    previewContainer.style.display = "none";
  };
});
