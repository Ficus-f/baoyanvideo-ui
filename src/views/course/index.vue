<template>
  <div class="course-container">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
export default {
  name: 'CourseIndex',
  components: {},
  props: {},
  data () {
    return {
      data: [{
        label: '楞严经',
        children: [{
          label: '秒懂楞嚴經 1000 日',
          children: [{
            label: '三级 1-1-1'
          },
          {
            label: '【楞嚴禪七開示集】2021年楞嚴精進禪七 首屆'
          }]
        }]
      }, {
        label: '經論開示',
        children: [{
          label: '瑜伽師地論2022結夏課程 見輝法師',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '禪宗永嘉集',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '見輝法師讀經系列',
        children: [{
          label: '見輝法師讀華嚴經',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '見輝法師恭讀經典',
          children: [{
            label: '三级 3-2-1'
          }]
        }, {
          label: '【幼幼華嚴讀經教材】'
        }, {
          label: '大方廣佛華嚴經 (圓道禪院恭誦)'
        }]
      }, {
        label: '寶嚴禪寺圓道僧團 見輝法師'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
</style>
