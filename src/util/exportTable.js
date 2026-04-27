import { exportFile } from 'quasar';

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default function (filename, columns, rows, vm = null) {
  const content = [columns.map(col => wrapCsvValue(col.label))]
    .concat(
      rows.map(row =>
        columns
          .map(col =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(',')
      )
    )
    .join('\r\n')

  const status = exportFile(filename, '\ufeff' + content, 'text/csv')

  if (status !== true) {
    if (vm) {
      vm.$q.notify({
        type: 'negative',
        message: '브라우저가 다운로드 권한이 없습니다.',
      })
    }
  }
}
