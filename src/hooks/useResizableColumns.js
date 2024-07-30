import { useEffect } from 'react'

const useResizableColumns = (tableRef, styles) => {
  useEffect(() => {
    const table = tableRef.current
    if (!table) return

    const handleMouseMove = (e) => {
      if (table.isResizing) {
        const th = table.th
        const nextTh = table.nextTh
        const tdElements = table.tds
        const nextTdElements = table.nextTds

        const startOffset = table.startOffset
        const nextStartOffset = table.nextStartOffset
        let width = startOffset + (e.pageX - table.startX)
        let nextWidth = nextStartOffset - (e.pageX - table.startX)

        const minWidth = 60
        const maxWidth = 1000

        if (nextWidth <= minWidth) {
          nextWidth = minWidth
          width = startOffset + nextStartOffset - minWidth
        } else if (width <= minWidth) {
          width = minWidth
          nextWidth = nextStartOffset + startOffset - minWidth
        }

        width = Math.max(minWidth, Math.min(maxWidth, width))
        nextWidth = Math.max(minWidth, Math.min(maxWidth, nextWidth))

        th.style.width = `${width}px`
        nextTh.style.width = `${nextWidth}px`

        const thMinFontSize = 12
        const thMaxFontSize = 18
        const tdMinFontSize = 12
        const tdMaxFontSize = 18
        const tdMinPadding = 0
        const tdMaxPadding = 15

        const thFontSize = thMinFontSize + (thMaxFontSize - thMinFontSize) * ((width - minWidth) / (maxWidth - minWidth))
        const nextThFontSize = thMinFontSize + (thMaxFontSize - thMinFontSize) * ((nextWidth - minWidth) / (maxWidth - minWidth))
        const tdFontSize = tdMinFontSize + (tdMaxFontSize - tdMinFontSize) * ((width - minWidth) / (500 - minWidth))
        const nextTdFontSize = tdMinFontSize + (tdMaxFontSize - tdMinFontSize) * ((nextWidth - minWidth) / (500 - minWidth))
        const tdPadding = tdMinPadding + (tdMaxPadding - tdMinPadding) * ((width - minWidth) / (maxWidth - minWidth))
        const nextTdPadding = tdMinPadding + (tdMaxPadding - tdMinPadding) * ((nextWidth - minWidth) / (maxWidth - minWidth))

        th.style.fontSize = `${thFontSize}px`
        nextTh.style.fontSize = `${nextThFontSize}px`
        tdElements.forEach(td => {
          td.style.fontSize = `${tdFontSize}px`
          td.style.padding = `${tdPadding}px`
        })
        nextTdElements.forEach(td => {
          td.style.fontSize = `${nextTdFontSize}px`
          td.style.padding = `${nextTdPadding}px`
        })
      }
    }

    const handleMouseUp = () => {
      table.isResizing = false
    }

    const handleMouseDown = (e, th, nextTh) => {
      table.isResizing = true
      table.startX = e.pageX
      table.startOffset = th.offsetWidth
      table.nextStartOffset = nextTh ? nextTh.offsetWidth : 0
      table.th = th
      table.nextTh = nextTh
      table.tds = Array.from(table.querySelectorAll(`tr > td:nth-child(${th.cellIndex + 1})`))
      table.nextTds = nextTh ? Array.from(table.querySelectorAll(`tr > td:nth-child(${nextTh.cellIndex + 1})`)) : []
    }

    const thElements = table.querySelectorAll('th')
    thElements.forEach((th, index) => {
      if (index < thElements.length - 1) {
        const resizer = document.createElement('div')
        resizer.className = styles.table__resizer
        th.appendChild(resizer)
        resizer.addEventListener('mousedown', (e) => handleMouseDown(e, th, thElements[index + 1]))
      }
    })

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [tableRef, styles])
}

export default useResizableColumns