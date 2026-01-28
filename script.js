(function () {
  "use strict";

  function el(selector) {
    return selector[0] === "#"
      ? document.querySelector(selector)
      : document.querySelectorAll(selector);
  }

  var viewer = el("#viewer");
  var equals = el("#equals");
  var nums = el(".num");
  var ops = el(".ops");

  var currentNum = "";
  var previousNum = "";
  var operator = "";
  var result = "";

  function setNumber() {
    if (result !== "") {
      currentNum = this.getAttribute("data-num");
      result = "";
    } else {
      currentNum += this.getAttribute("data-num");
    }
    viewer.innerHTML = currentNum;
  }

  function setOperator() {
    if (currentNum === "") return;
    previousNum = currentNum;
    currentNum = "";
    operator = this.getAttribute("data-ops");
    equals.setAttribute("data-result", "");
  }

  function calculate() {
    var a = parseFloat(previousNum);
    var b = parseFloat(currentNum);

    // If user hits "=" without typing the second number
    if (isNaN(b)) b = a;

    switch (operator) {
      case "plus":
        result = a + b;
        break;
      case "minus":
        result = a - b;
        break;
      case "times":
        result = a * b;
        break;
      case "divided by":
        result = a / b;
        break;
      default:
        result = b;
    }

    if (!isFinite(result)) {
      result = isNaN(result) ? "Error" : "Infinity";
      el("#calculator").classList.add("broken");
      var reset = el("#reset");
      if (reset) reset.classList.add("show");
    }

    viewer.innerHTML = result;
    equals.setAttribute("data-result", result);
    currentNum = String(result);
    previousNum = "";
  }

  function clearAll() {
    currentNum = "";
    previousNum = "";
    operator = "";
    result = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", "");
    el("#calculator").classList.remove("broken");
    var reset = el("#reset");
    if (reset) reset.classList.remove("show");
  }

  // Bind all buttons (not just the first)
  for (var i = 0; i < nums.length; i++) nums[i].onclick = setNumber;
  for (var j = 0; j < ops.length; j++) ops[j].onclick = setOperator;

  equals.onclick = calculate;
  el("#clear").onclick = clearAll;
})();
