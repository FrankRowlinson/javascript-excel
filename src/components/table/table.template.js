const CODES = {
  A: 65,
  Z: 90,
}

function createCell() {
  return `
    <div class="cell" contenteditable="true"></div>
  `
}

function createColumn(content) {
  return `
    <div class="column">${content}</div>
  `
}

function createRow(content, rowNumber='') {
  return `
    <div class="row">
      <div class="row-info">${rowNumber}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(index + CODES.A)
}

export function createTable(rowsCount=20) {
  const colsCount = CODES.Z - CODES.A + 1
  const titleRow = new Array(colsCount)
      .fill(' ')
      .map(toChar)
      .map(createColumn).join('')
  const cellRow = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')
  const rows = new Array(rowsCount)
      .fill('')
      .map((_, index) => {
        return createRow(cellRow, index + 1)
      })
  rows.unshift(createRow(titleRow))

  return rows.join(' ')
}
