export default {
  methods: {
    organizeSeason(animeList, types, sort, search) {
      animeList = this.searchAnime(animeList, search);
      // animeList = this.filterAnime(animeList, filter);
      if (animeList.length > 0) {
        animeList = this.removeUnwanted(animeList);
        animeList = this.sortAnime(animeList, sort);
        animeList = this.categorizeAnime(animeList, types);
      }
      return animeList;
    },

    categorizeAnime(animeList, animeTypes) {
      const seasonCategorized = [];
      for (let i = 0; i < animeTypes.length; i += 1) {
        seasonCategorized[i] = [];
        for (let j = 0; j < animeList.length; j += 1) {
          if (animeList[j].type === animeTypes[i] && !animeList[j].continued) {
            seasonCategorized[i].push(animeList[j]);
          } else if (i === 1 && animeList[j].continued) {
            seasonCategorized[i].push(animeList[j]);
          }
        }
      }
      return seasonCategorized;
    },

    removeUnwanted(animeList) {
      const list = animeList.slice();
      for (let i = 0; i < list.length; i += 1) {
        // list[i].kids
        if (list[i].r18_plus) {
          list.splice(i, 1);
          i -= 1;
        }
      }
      return list;
    },

    filterAnime(animeList, filters) {
      if (animeList.length === 0) return animeList;
      const list = animeList.slice();
      const filteredItems = [];
      if (filters.length > 0) {
        list.forEach((anime) => {
          filters.forEach((filter) => {
            if (filter === 'releasing' && anime.ani_list.status === 'RELEASING') filteredItems.push(anime);
            if (filter === 'finished' && anime.ani_list.status === 'FINISHED') filteredItems.push(anime);
            if (filter === 'notYetReleased' && anime.ani_list.status === 'NOT_YET_RELEASED') filteredItems.push(anime);
            if (filter === 'cancelled' && anime.ani_list.status === 'CANCELLED') filteredItems.push(anime);
          });
        });
        return filteredItems;
      }
      return list;
    },

    parseDate(date) {
      const month = date.substring(0, date.indexOf(' '));
      const day = date.substring(date.indexOf(' '), date.indexOf(','));
      let year = date.substring(date.indexOf(',') + 2, date.lenght);
      if (year.length > 4) {
        year = year.substring(0, year.indexOf(','));
      }
      return new Date(`${year}-${month}-${day}`);
    },

    sortAnime(animeList, sort) {
      const list = animeList.slice();
      sort = sort.toLowerCase();
      const type = typeof (list[0][sort]);
      if (type === 'string' && sort !== 'airing_start') {
        list.sort((a, b) => {
          const x = a[sort].toLowerCase();
          const y = b[sort].toLowerCase();
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;
        });
      } else if (sort === 'airing_start') {
        list.sort((a, b) => {
          console.log(a.title);
          console.log(this.parseDate(a[sort]));
          console.log(b.title);
          console.log(this.parseDate(b[sort]));
          console.log(this.parseDate(a[sort]) - this.parseDate(b[sort]));
          return this.parseDate(a[sort]) - this.parseDate(b[sort]);
          // const x = this.parseDate(a[sort]);
          // const y = this.parseDate(b[sort]);
          // console.log(x, y);
          // if (x < y) return -1;
          // if (x > y) return 1;
          // return 0;
        });
      } else {
        list.sort((a, b) => b[sort] - a[sort]);
      }
      return list;
    },
    searchAnime(animeList, search) {
      const list = [];
      if (search !== '') {
        for (let i = 0; i < animeList.length; i += 1) {
          if (animeList[i].title.search(new RegExp(search, 'i')) !== -1) {
            list.push(animeList[i]);
          }
        }
        return list;
      }
      return animeList;
    },
  },
};
