const inputData = [
  {
    inputParent: document.querySelector(".question-1"),
    input: "input[name=state-capital]:checked",
    check: "checked",
  },
  {
    inputParent: document.querySelector(".question-2"),
    input: "select[name=largest-Country]",
    check: "value",
  },
  {
    inputParent: document.querySelector(".question-3"),
    input: "input[name=programming]:checked",
    check: "checked",
  },
  {
    inputParent: document.querySelector(".question-4"),
    input: "input[type=email]",
    check: "value",
  },
];

//  check if a value was selected (''||null) or true

const isInputValue = (element) => {
  let isValue;
  isValue = document.querySelector(`${element.input}`);
  if (element.check == "value") {
    isValue = document.querySelector(`${element.input}`).value;
  }
  return isValue && true;
};

const isContainAlert = (elementParent, tagName = "P", className = "alert") => {
  const islastElementPtag =
    elementParent.lastElementChild.tagName === tagName &&
    elementParent.lastElementChild.classList.contains(className);
  return islastElementPtag;
};

// alert message

function addAlert(
  elementParent,
  alert = `<p class="alert">answer needed !</p>`
) {
  const isLastElementPtag = isContainAlert(elementParent);
  if (!isLastElementPtag) {
    elementParent.insertAdjacentHTML("beforeend", alert);
    elementParent.lastElementChild.focus();
    return;
  }
}
// remove alert
const removeAlert = (elementParent) => {
  if (isContainAlert(elementParent)) {
    // elementParent.lastElementChild.innerHTML = "";
    childElement = elementParent.lastElementChild;
    elementParent.removeChild(childElement);
  }
};
// check if field gets no answer and add alert to it
const addAlertToElement = (element) => {
  if (!isInputValue(element)) {
    const elementParent = element.inputParent;
    addAlert(elementParent);
  }
};

// -------------------main-------------------------------------------------
//  sumbit handle
const handleSubmit = (e) => {
  e.preventDefault();
  //1 get all values :
  let values = inputData.map((element) => isInputValue(element));
  // check if all field gets an answer
  const isAllQuestionAnswered = values.every(
    (value) => value != null && value != ""
  );
  // if any of the fields doesnt get answer
  if (!isAllQuestionAnswered) {
    values
      .map((value, index) => {
        if (value == false || value == null) {
          return index;
        }
        return -1;
      })
      .map((value, index) => {
        console.log(value);
        if (value > -1) {
          addAlertToElement({ ...inputData[value] });
        }
        if (value < 0) {
          removeAlert(inputData[index].inputParent);
        }
      });
    // add alert to form
    const form = document.querySelector(".question-form");
    addAlert(form, `<p class="alert">all question must be answered !:)</p>`);
    return;
  }

  // if all questions were answered
  if (isAllQuestionAnswered) {
    // Todo 1: get all questions
    const questionAnswer = inputData.map((element) => {
      // get all question and remove coloumn
      const question = element.inputParent
        .querySelector(".question")
        .innerText.slice(0, -1);

      // get answer from each field
      const answersNode = element.inputParent.querySelectorAll(element.input);
      let answer = [...answersNode].map((answer) => answer.value);
      // if answer from a field is less than 1 return a single string
      if (answer.length < 2) {
        answer = answer.join(",");
      }
      return { question, answer };
    });
    // todo 2: display a message that the form was successfully submited
    const successMessage = `<div class="success-msg form-answer">
                                <h3>successfully submitted :)</h3>
                            </div>`;
    const container = document.querySelector(".questionnaire");
    container.innerHTML = "";
    container.insertAdjacentHTML("afterbegin", successMessage);
    // clear timeout
    clearTimeout(timeout ? timeout : null);
    // add json format object to the screen
    var timeout = setTimeout(() => {
      const jsonQuestionAnswer = `<code>${JSON.stringify(
        questionAnswer
      )}</code>`;
      document
        .querySelector(".success-msg")
        .insertAdjacentHTML("beforeend", jsonQuestionAnswer);
    }, 1000);
    // todo 3: display json format of question answer to the screen
  }
};

document.querySelector(".form").addEventListener("submit", handleSubmit);

// document.querySelectorAll("input[name=programming]:checked");
