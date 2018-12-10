<template>
  <div id="app">
    <v-app
      id="inspire"
      dark
    >
      <SideNavAnime></SideNavAnime>
      <TitleBar></TitleBar>
      <v-content>
          <v-layout row wrap fill-height fill-width>
              <div class="level2 padding-content full-size">
                <v-layout class="wrap-layout full-size">
                  <router-view></router-view>
                </v-layout>
              </div>
          </v-layout>
      </v-content>
    </v-app>
  </div>
</template>

<script>

  import TitleBar from '@/components/TitleBar/TitleBar';
  import SideNavAnime from '@/components/SideNavMenu/SideNavAnime';

  export default {
    components: { SideNavAnime, TitleBar },
  };
</script>

<style lang="scss">
  @import './css/iconfont';
  @import './css/global';
  @import './css/theme';

  .wrap-layout {
    background-color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .padding-content {
    padding: 20px 20px 0px 20px;
  }

</style>