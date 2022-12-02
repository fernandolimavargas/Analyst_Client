export const addClassRowSelected = (id, className) => {
  let rows = document.querySelectorAll(className);

  for (let row of rows) {
    if (row.id == id) {
      row.classList.add('row-selected');
    } else {
      row.classList.remove('row-selected');
    }
  }
};

export const removeClassRowSelected = (className) => {
  let rows = document.querySelectorAll(className);

  for (let row of rows) {
    if (row.classList.contains('row-selected')) {
      row.classList.remove('row-selected');
    }
  }
};
