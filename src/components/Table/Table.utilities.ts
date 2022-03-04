export const updateRowHeight = (params: any, minRowHeight: number, currentRowHeight: number) => {
  const bodyViewport = document.querySelector('.ag-body-viewport');
  if (!bodyViewport) {
    return;
  }
  var gridHeight = bodyViewport.clientHeight;
  var renderedRowCount = params.api.getDisplayedRowCount();

  if (renderedRowCount * minRowHeight >= gridHeight) {
    if (currentRowHeight !== minRowHeight) {
      currentRowHeight = minRowHeight;
      params.api.resetRowHeights();
    }
  } else {
    currentRowHeight = Math.floor(gridHeight / renderedRowCount);
    params.api.resetRowHeights();
  }
};

export const autoSizeAllColumns = (params: any) => {
  const allColumnIds: any = [];
  params.columnApi.getAllColumns().forEach((column: any) => {
    allColumnIds.push(column.getId());
  });

  params.columnApi.autoSizeColumns(allColumnIds);
}