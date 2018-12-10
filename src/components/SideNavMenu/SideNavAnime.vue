<template>
<!-- clipped -->
  <v-navigation-drawer
      v-model="drawer"
      app
      permanent
      clipped
      fixed
      overflow
      floating
      width=250
      class="level3"
      style="padding-bottom: 0px;"
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar color="orange lighten-2">
              <span class="black--text headline">EC</span>
              <!-- <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwTCBCRFWG8b2_HpaRuXyfN90yQWygv1YHi0Y9Ir37QsyXEe1BGg" > -->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>E-Colecionador</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <!-- <v-divider></v-divider> -->
        <v-subheader class="mt-3 grey--text text--darken-1">COMPRA</v-subheader>
          <v-list-tile @click="handleRoute('leisoes')">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Leilões
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="handleRoute('loja')">
            <v-list-tile-action>
              <v-icon>bookmarks</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Loja
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">VENDA</v-subheader>
        <v-list dense>
          <!-- <v-list-tile @click="handleRoute('calendar')">
            <v-list-tile-action>
              <v-icon>date_range</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Vender Produto
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile> -->
          <v-list-tile @click="handleRoute('vender')">
            <v-list-tile-action>
              <v-icon>map</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Vender Produto
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="handleRoute('leiloar')">
            <v-list-tile-action>
              <v-icon>date_range</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Leiloar Produto
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          
          <v-subheader class="mt-3 grey--text text--darken-1">CONFIGURAÇÃO DA CONTA</v-subheader>
          <v-list-tile @click="handleRoute('historico')">
            <v-list-tile-action>
              <v-icon>history</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Histórico de Transações
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Settings
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
  }),
  methods: {
    handleRoute(route) {
      this.$router.push(`/${route}`);
    },
    test() {
      this.$electron.ipcRenderer.send('/test', {
        input: 'a',
        country: 'b',
        selected: 'c',
        browser: 'd',
      });
      this.$electron.ipcRenderer.once('/tested', (event, response) => {
        console.log(response);
      });
    },
  },
  props: {
    source: String,
  },
};
</script>
