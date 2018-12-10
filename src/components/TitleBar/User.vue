<template>
  <div>
    <v-avatar
      size="32px"
      color="grey lighten-4"
    >
      <img src="https://avatars0.githubusercontent.com/u/5064518?s=460&v=4" alt="avatar">
    </v-avatar>
    <span>Igor Cesar</span>
    <el-dropdown trigger="click" class="no-drag">
      <span class="el-dropdown-link-top no-drag">
        <i class="el-icon-arrow-down el-icon--right no-drag"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item>Action 4</el-dropdown-item>
        <el-dropdown-item>
          <el-dropdown trigger="hover" placement="right" class="no-drag">
            <span class="el-dropdown-link">
              Action 5<i class="el-icon-arrow-right el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
};
</script>

<style>
  .el-dropdown-link-top {
    cursor: pointer;
    color: white;
    font-size: 14px;
  }
  .el-icon-arrow-down {
    font-size: 16px;
  }
</style>

