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

      if (targetLevel < previousLevel || targetLevel === 0) {
        previousSiblingInput.checked = checkOrUncheck;
      } else {
        break;
      }
    }
  }
}

checkboxElements.forEach((element) => {
  element.addEventListener("click", ({ target }) => {
    if (target.checked) {
      traversalParents(target, true);
      traversalChilds(target, true);
      console.log(target.getAttribute("level"));
    } else {
      traversalParents(target, false);
      traversalChilds(target, false);
    }
  });



  element.addEventListener("mouseenter", ({ target }) => {
    let targetLevel = parseInt(target.getAttribute("level"));
    target.parentElement.style.backgroundColor  = "#f9866d";
    let curElement = target.parentElement;

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
          previousSiblingInput.parentElement.style.backgroundColor = "#f9866d";
          targetLevel = previousLevel;
        }
      }
    }
  });



  element.addEventListener("mouseleave", ({ target }) => {
    let targetLevel = parseInt(target.getAttribute("level"));
    target.parentElement.style.backgroundColor  = "#ffff";

    let curElement = target.parentElement;

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
          previousSiblingInput.parentElement.style.backgroundColor = '#ffff';
          targetLevel = previousLevel;
        }
      }
    }
  });
});

// backgound color hover effect effect;
