<template >
  <div class="level6 full-size flex">
    <div class="level4 season-menu">
      <el-input
        class="season-menu-item search"
        placeholder="Procurar"
        prefix-icon="el-icon-search"
        clearable
        v-model="searchInput">
      </el-input>
    </div>
    <div v-if="produtos" class="scroll-auto full-height unselectable">
          <v-container
          fluid
          grid-list-lg
          fill-height
          class="level6 expansion"
        >
          <div class="wrapper">
            <div disabled class="anime_cards" v-for="(value,i) in produtos.length" :key="i">
            <v-card class="white--text card-size">
              <v-layout row class="inside-card">
                <v-flex xs6>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline truncate">{{produtos[i].nome}}</div>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <div class="truncate">{{produtos[i].descricao}}</div>
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-img v-if="produtos[i].foto !== ''"
                    :src="produtos[i].foto"
                    height="125px"
                    contain
                  ></v-img>
                  <v-img v-else
                    src="./src/assets/produto-sem-imagem.png"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
                <v-card-actions>
                  <div>R$ {{produtos[i].valor}}</div>
                  <v-spacer></v-spacer>
                  <v-btn flat class="blue--text">Comprar</v-btn>
                </v-card-actions>
            </v-card>
            </div>
          </div>
        </v-container>
      </div>
    </div>
</template>
<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import Treeselect from '@riophae/vue-treeselect';
import helper from '../mixins/helpers/seasonHelper.js';

export default {
  components: { Treeselect },
  mixins: [helper],
  data() {
    return {
      show: false,
      searchInput: '',
      sortValue: 'members',
      sortOptions: [
        {
          id: 'title',
          label: 'Sort: Title',
        },
        {
          id: 'score',
          label: 'Sort: Score',
        },
        {
          id: 'members',
          label: 'Sort: Members',
        },
        {
          id: 'episodes',
          label: 'Sort: Episodes',
        },
        {
          id: 'airing_start',
          label: 'Sort: Airing Date',
        },
      ],
      activeIndex: '1',
      displayedSeasonList: [],
      SeasonList: [],
      animeTypes: ['TV', 'Continued', 'OVA', 'Movie', 'Special', 'ONA'],
      seasonValue: '',
      seasonOptions: [],
      kitsuList: [],
      produtos: [],
    };
  },
  methods: {
    generateSeasonOptions(currentSeason) {
      const options = [];
      let helper = {};
      for (let year = 2011; year <= currentSeason.year; year += 1) {
        if (year === currentSeason.year) {
          console.log('entrei');
        } else {
          helper = {
            id: `${year}`,
            label: `${year}`,
            children: [
              {
                id: `winter-${year}`,
                label: `Winter ${year}`,
              },
              {
                id: `spring-${year}`,
                label: `Spring ${year}`,
              },
              {
                id: `summer-${year}`,
                label: `Summer ${year}`,
              },
              {
                id: `fall-${year}`,
                label: `Fall ${year}`,
              },
            ],
          };
        }
        options.push(helper);
      }
      return options.reverse();
    },
    pegarListaDeProdutos() {
      this.$electron.ipcRenderer.send('/get/product-list');
      this.$electron.ipcRenderer.once('/got/product-list', (event, response) => {
        this.produtos = response.rows;
      });
    },
  },
  created() {
    const currentSeason = { year: '2018', season: 'spring' };
    this.seasonValue = `${currentSeason.season}-${currentSeason.year}`;

    this.produtos = this.pegarListaDeProdutos();
    this.seasonOptions = this.generateSeasonOptions(currentSeason);
  },
  watch: {
    filterValue() {
      this.displayedSeasonList = this.organizeSeason(this.SeasonList, this.animeTypes, this.sortValue, this.searchInput, this.filterValue);
    },
    searchInput() {
      this.displayedSeasonList = this.organizeSeason(this.SeasonList, this.animeTypes, this.sortValue, this.searchInput, this.filterValue);
    },
    sortValue() {
      this.displayedSeasonList = this.organizeSeason(this.SeasonList, this.animeTypes, this.sortValue, this.searchInput, this.filterValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
}

.el-menu,
.el-menu-item {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.wrapper {
  max-width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

.anime-image {
  border-radius: 5px;
  height: 250px;
  max-height: 250px;
  width: 172px;
  max-width: 172px;
  // position: relative;
  display: block;
}

.anime_icons {
  color: grey !important;
  // position: relative;
  margin-right: 2px;
  vertical-align: text-bottom;
}

.group {
  float: right;
}

.rating {
  float: left;
}

.text {
  color: grey;
  font-size: 13px;
}

.subinfo {
  margin-top: 3px;
  width: 100%;
  // text-align: center;
}

.card-size {
  width: 600px;
  max-width: 600px;
}

.anime_cards {
  // text-decoration: none;
  padding: 15px 25px 15px 25px;
  color: white;
  font-size: 14px;
  display: flex;
  flex-direction: column;
}

.truncate {
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-menu--horizontal {
  border: none;
}

.border2 {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.border2::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: inset 0 0 0 0 rgba(21, 101, 192, 1);
  border-radius: 5px;
  transition: box-shadow 0.1s ease;
}
.border2:hover::after {
  box-shadow: inset 0 0 0 4px rgba(64, 158, 255, 1);
  border-radius: 5px;
}

.border2:hover ~ .subinfo {
  & .text {
    color: white;
  }
  & .star {
    color: #ffa000 !important;
  }
  & .users {
    color: #5c6bc0 !important;
  }
}

.season-menu {
  min-height: 60px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.season-filter {
  min-height: 60px;
}

.season-menu-item {
  margin: auto;
  width: 140px;
  margin: 10px;
  float: left;
}

.season-treeselect {
  margin: auto;
  width: 100% -30px;
  margin: 10px;
}

.search {
  float: left;
  width: 250px;
}

.sort-icon {
  margin: auto;
  float: left;
  background-color: #16181c;
  margin: 11px 10px 10px 10px;
}

.inside-card{
  height: 200px;
  max-height: 200px;
}
</style>

<style lang="scss">
.el-input__inner {
  background-color: #16181c;
  border: 1px solid #282a2d;
  color: white;
  &:hover {
    border-color: #4f5053;
  }
  &:focus {
    border-color: #409eff;
  }
}
.el-select:hover .el-input__inner {
  border-color: #4f5053;
}
.expansion-panel__header {
  padding: 8px 21px;
}

.season-menu-item > .vue-treeselect__control {
    height: 40px;
  }

.vue-treeselect__single-value {
  line-height: 38px;
}
</style>
