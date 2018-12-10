<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Vendas">
      <el-table v-if="listaDeVenda" :data="listaDeVenda" border style="width: 100%" height="calc(100% - 59px)">
        <el-table-column fixed prop="id" label="ID da Transação" width="150">
        </el-table-column>
        <el-table-column fixed prop="nomeartigo" label="Produto" width="150">
        </el-table-column>
        <el-table-column prop="datatransacao" label="Data da Transação" width="200">
        </el-table-column>
        <el-table-column prop="valor" label="Valor da Venda" width="150">
        </el-table-column>
        <el-table-column prop="nomeusuariocomprador" label="Comprador" width="150">
        </el-table-column>
        <el-table-column prop="nomeusuariovendedor" label="Vendedor" width="150">
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="Leilões">
    <el-table v-if="listaDeLeilao" :data="listaDeLeilao" border style="width: 100%" height="calc(100% - 59px)">
        <el-table-column fixed prop="id" label="ID da Transação" width="150">
        </el-table-column>
        <el-table-column fixed prop="nomeartigo" label="Produto" width="150">
        </el-table-column>
        <el-table-column prop="datafim" label="Data da Transação" width="200">
        </el-table-column>
        <el-table-column prop="valor" label="Valor da Venda" width="150">
        </el-table-column>
        <el-table-column prop="nomeusuariocomprador" label="Comprador" width="150">
        </el-table-column>
        <el-table-column prop="nomeusuariovendedor" label="Vendedor" width="150">
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        listaDeVenda: [],
        listaDeLeilao: [],
      };
    },
    created() {
      this.listaDeVenda = this.pegarHistoricoVenda();
      this.listaDeLeilao = this.pegarHistoricoLeiao();
    },
    methods: {
      pegarHistoricoVenda() {
        this.$electron.ipcRenderer.send('/get/historySale');
        this.$electron.ipcRenderer.once('/got/historySale', (event, response) => {
          this.listaDeVenda = response.rows;
          console.log(this.listaDeVenda);
        });
      },
      pegarHistoricoLeiao() {
        this.$electron.ipcRenderer.send('/get/historyAuction');
        this.$electron.ipcRenderer.once('/got/historyAuction', (event, response) => {
          if (this.listaDeLeilao) {
            this.listaDeLeilao = response.rows;
            console.log(this.listaDeLeilao);
          }
        });
      },
    },
  };
</script>

<style lang="scss" scoped>

  .el-tabs {
    border: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height:100% !important;
    width:100% !important;
  }
  
  .el-tab-pane {
    height:100% !important;
    width:100% !important;
  }

.el-table--border::after{
  position: relative;
}
</style>

<style>
  .el-tabs__content{
    height: 100% !important;
    padding: 10px 0px 0px 0px !important;
  }

  .el-tabs__nav-scroll,
  .el-tabs__header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .el-tabs__item.is-top.is-active {
  height: 61px;
  line-height: 60px;
  }

  .el-tabs__header.is-top {
    line-height: 60px;
  }
</style>
