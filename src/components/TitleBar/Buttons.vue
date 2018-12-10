<template>
  <el-button-group>
    <el-button class="no-drag" size="mini" type="plain" @click="handleMinimize">
      <i class="iconfont icon-minimize"/>
    </el-button>
    <el-button class="no-drag" size="mini" type="plain" @click="handleMaximize">
      <i class="iconfont" :class="`icon-${iconStatus}`"/>
    </el-button>
    <el-button class="no-drag close" size="mini" type="plain" @click="handleClose">
      <i class="iconfont icon-close"/>
    </el-button>
    <!-- <v-icon>remove</v-icon>
    <v-icon>check_box_outline_blank</v-icon>
    <v-icon>close</v-icon> -->
  </el-button-group>
</template>

<script>

export default {
  data() {
    return {
      iconStatus: 'maximize',
    };
  },
  methods: {
    handleMinimize() {
      this.$electron.remote.getCurrentWindow().minimize();
    },
    handleMaximize() {
      if (this.$electron.remote.getCurrentWindow().isMaximized()) {
        this.$electron.remote.getCurrentWindow().unmaximize();
        this.iconStatus = 'maximize';
      } else {
        this.$electron.remote.getCurrentWindow().maximize();
        this.iconStatus = 'windowed';
      }
    },
    handleClose() {
      this.$electron.remote.getCurrentWindow().close();
    },
  },
  created() {
    if (this.$electron.remote.getCurrentWindow().isMaximized()) this.iconStatus = 'windowed';
  },
};
</script>

<style lang="scss">
  .el-button {
  background: #202326;
  color: white;
  border: 0px !important;
  border-radius: 0px;
  
  &:hover {
    background: white;
    color: #202326;
    border: 0px !important;
  }
}

.close:hover {
  background: #BF4F4E !important;
  color: white !important;
}
</style>
