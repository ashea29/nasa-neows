export const options = {
  autoSize: true,
  theme: 'ag-default-dark',
  title: {
    text: 'Near Earth Objects (by date)',
  },
  data: [],
  series: [
    {

      xKey: 'date',
      yKey: 'numberOfObjects',
      yName: 'Number of NEOs',
      stroke: '#0067b4',
      marker: {
        fill: '#0067b4',
        stroke: '#0067b4' 
      }
    },
  ],
  legend: {
    position: 'bottom',
  }
}