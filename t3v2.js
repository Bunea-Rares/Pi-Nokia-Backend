const input = "a+b*c-(x+61)2";

const rules = {
  "E": ["TE'"],
  "E'": ["+TE'", "-TE'", null],
  "T": ["FT'"],
  "T'": ["*FT'", "/FT'", null],
  "F": ["(E)","NUM", "ID"],
}

let index = 0;

const isOperatorE = () => {
  return input[index] === "+" || input[index] === "-";
}

const isOperatorT = () => {
  return input[index] === "*" || input[index] === "/";
}

const isNum = () => {
  return input[index] >= "0" && input[index] <= "9";
}

const isId = () => {
  return input[index] >= "a" && input[index] <= "z";
}

const E = () => {
  console.log("E -> TE'");
  if(T()) {
    return E1();
  }
  return false;
}

const E1 = () => {
  if(isOperatorE()) {
    console.log("E' -> " + input[index] + "TE'");
    index++;
    if(T()) {
      return E1();
    }
    return false;
  }
  console.log("E' -> null");
  return true;
}

const T = () => {
  console.log("T -> FT'");
  if(F()) {
    return T1();
  }
  return false;
}

const T1 = () => {
  if(isOperatorT()) {
    console.log("T' -> " + input[index] + "FT'");
    index++;
    if(F()) {
      return T1();
    }
    return false;
  }
  console.log("T' -> null");
  return true;
}


if(E()) {
  console.log("success");
} else {
  console.log("fail");
}