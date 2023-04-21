<template>
    <div>
      <v-chart ref="myChart" :options="chartOptions" style="width: 1600px; height: 800px;"></v-chart>
    </div>
</template>
<script setup>
import * as echarts from 'echarts'
import chinaMap from '@/assets/china.json'
const myChart = ref(null)
const chartOptions = {
    geo: {
      map: 'china',
      roam: true, // 开启鼠标缩放和平移漫游
      label: {
        show: true,
        emphasis: {
          show: true,
        },
      },
      itemStyle: {
        normal: {
          areaColor: '#323c48',
          borderColor: '#404a59',
        },
        emphasis: {
          areaColor: '#2a333d',
        },
      },
    },
    series: [
      {
        name: '地图名称',
        type: 'map',
        mapType: 'china',
        roam: true,
        label: {
          show: true,
        },
        data: [{ name: '北京', value: 123 }, { name: '上海', value: 456 }], // 地图数据
        // 其他配置项，如visualMap等
      },
    ],
}
const initChart = () => {
      echarts.registerMap("china", { geoJSON: chinaMap });
      myChart.value.setOption(chartOptions)
}
onMounted(() => {
  nextTick(() => {
    initChart()
  })
})
// export default {
//   data() {
//     return {
//       chartOptions: {
//         geo: {
//           map: 'china',
//           roam: true, // 开启鼠标缩放和平移漫游
//           label: {
//             show: true,
//             emphasis: {
//               show: true,
//             },
//           },
//           itemStyle: {
//             normal: {
//               areaColor: '#323c48',
//               borderColor: '#404a59',
//             },
//             emphasis: {
//               areaColor: '#2a333d',
//             },
//           },
//         },
//         series: [
//           {
//             name: '地图名称',
//             type: 'map',
//             mapType: 'china',
//             roam: true,
//             label: {
//               show: true,
//             },
//             data: [{ name: '北京', value: 123 }, { name: '上海', value: 456 }], // 地图数据
//             // 其他配置项，如visualMap等
//           },
//         ],
//       },
//     }
//   },
//   mounted() {
//     this.$nextTick(() => {
//       this.initChart()
//     })
//   },
//   methods: {
//     initChart() {
//       const chart = this.$refs.myChart
//       echarts.registerMap("china", { geoJSON: chinaMap });
//       console.log('chart',this.$refs.myChart.setOption)
//       chart.setOption(this.chartOptions)
//     },
//   },
// }


</script>


<style lang="less" scoped>

</style>