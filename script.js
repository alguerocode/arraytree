// first : I change the import script tag to use defer mode
// learn more about defer: https://bitsofco.de/async-vs-defer/

// the plan to solve it:
// select all checkbox and listen to it
// when
// run function traversal the parents elements and add minus icon
// run function to traversal the childs elements and add tick icon
// and reverse that when uncheckbox

const checkboxElements = document.querySelectorAll("input[type='checkbox']");

function traversalParents(target, checkOrUncheck) {
  let targetLevel = parseInt(target.getAttribute("level"));
  let curElement = target.parentElement;

  // select the correct parent element by using level attribute
  for (let i = 0; i < targetLevel; i++) {
    curElement = curElement.parentElement;
  }
  // cur element !== null
  while (curElement) {
    curElement = curElement.previousElementSibling;
    if (curElement) {
      const previousSiblingInput = curElement.querySelector("input[type='checkbox']");
      const previousLevel = parseInt(previousSiblingInput.getAttribute("level"));

      if (targetLevel > previousLevel) {
        previousSiblingInput.indeterminate = checkOrUncheck;
        targetLevel = previousLevel;
      }
    }
  }
}
function traversalChilds(target, checkOrUncheck) {
  let targetLevel = parseInt(target.getAttribute("level"));
  let curElement = target.parentElement;

  // select the correct parent element by using level attribute
  for (let i = 0; i < targetLevel; i++) {
    curElement = curElement.parentElement;
  }

  while (curElement) {
    curElement = curElement.nextElementSibling;
    if (curElement) {
      const previousSiblingInput = curElement.querySelector("input[type='checkbox']");
      const previousLevel = parseInt(previousSiblingInput.getAttribute("level"));

      if (targetLevel < previousLevel) {
        previousSiblingInput.checked = checkOrUncheck;
      } else {
        break;
      }
    }
  }
}

checkboxElements.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.checked) {
      traversalParents(e.target, true);
      traversalChilds(e.target, true);
      console.log(e.target.getAttribute("level"));
    } else {
      traversalParents(e.target, false);
      traversalChilds(e.target, false);
    }
  });
});

// backgound colo effect;