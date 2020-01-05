<template>
  <div>
    <div class="flex items-center mb-2">
      <div class="w-2/3 text-xl text-left">
        <button
          class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-solid border-gray-500 hover:border-transparent rounded"
          @click="showMenu = !showMenu"
        >{{showMenu ? "Skjul" : "Filtrer og sorter"}}</button>
        <button
          v-show="!!showMenu"
          class="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-solid border-gray-500 hover:border-transparent rounded"
          @click="resetOptions"
        >{{"Tilbakestill"}}</button>
      </div>
      <div class="w-1/3 text-xl text-center">
        <span v-if="isFiltering">
          <strong>...</strong> treff
        </span>
        <span v-else>
          <strong>{{searchResults.length}}</strong> treff
        </span>
      </div>
    </div>
    <div v-show="showMenu === true">
      <div class="flex justify-between items-center">
        <div class="flex-grow mx-2 dick"></div>
        <div class="text-uppercase tracking-wide font-bold text-gray-700">Sorter etter</div>
        <div class="flex-grow mx-2 dick"></div>
      </div>
      <div class="flex flex-wrap">
        <MPNCheckButton
          class="w-1/2"
          v-for="config of sortOptions"
          :key="config.key"
          :checked="config.key === options.sort.key"
          :text="config.text"
          @click.native="(event) => handleClickSortButton({event, config})"
        />
      </div>
      <br />
      <div class="flex justify-between items-center">
        <div class="border-bottom border-solid border-gray-700 flex-grow mx-2 dick"></div>
        <div class="text-uppercase tracking-wide font-bold text-gray-700">Filtrer etter</div>
        <div class="border-bottom border-solid border-gray-700 flex-grow mx-2 dick"></div>
      </div>
      <div v-for="config of filterOptions" :key="config.key" class="flex flex-wrap mb-2">
        <div
          class="text-uppercase tracking-wide font-bold text-gray-700 w-full"
        >{{config.text || config.key}}</div>
        <div v-if="config.type === 'enum'">
          <MPNCheckButton
            v-for="item of config.items"
            :key="item.key"
            :text="item.text"
            :checked="options.filter[`${config.key}.${item.key}`] !== false"
            @click.native="(event) => handleClickFilterButton({event, config, item})"
          />
        </div>
        <div v-if="config.type === 'include'" class="w-full">
          <MPNCheckButton
            v-for="item of config.items"
            :key="item.key"
            :text="item.text"
            :checked="options.filter[`${config.key}.${item.key}`] === true"
            @click.native="(event) => handleClickFilterButton({event, config, item})"
          />
        </div>
        <div v-else-if="config.type === 'number'" class="flex align-center">
          <div class="w-full">
            <input
              id="price-min"
              placeholder="Fra"
              class="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              style="width: 100%;"
              type="number"
              @change="(event) => handleClickFilterButton({event, config, boundary: 'min'})"
            />
          </div>
          <div class="mx-2">-</div>
          <div class="w-full">
            <input
              id="price-max"
              style="width: 100%;"
              placeholder="Til"
              class="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              @change="(event) => handleClickFilterButton({event, config, boundary: 'max'})"
            />
          </div>
        </div>
        <div v-else-if="config.type === 'boolean'">
          <div class="flex flex-col justify-center h-full ml-2">
            <input type="checkbox" @change="(event) => handleClickFilterButton({event, config})" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { getFilterFunctions } from "~/util/products/filter";
import { getSortFunction } from "~/util/products/sort";
import { isMobileOrTablet } from "~/util/helpers";
import MPNCheckButton from "~/components/MPNCheckButton";
import {
  defaultFilterOptions,
  defaultSortOptions,
} from "./default-filter-data";

const defaultOptions = { sort: { key: "score", desc: true }, filter: {} };

export default {
  name: "SortAndFilterMenu",
  components: { MPNCheckButton },
  data() {
    return {
      showMenu: !isMobileOrTablet(),
      options: { ...defaultOptions },
      sortOptions: { ...defaultSortOptions },
    };
  },
  computed: {
    ...mapState(["searchResults", "isFiltering"]),
    filterOptions() {
      const resultDealers = Array.from(
        new Set(this.searchResults.map((x) => x.provenance)),
      ).map((x) => ({ key: x, text: x }));
      const resultCategories = Array.from(
        new Set(
          this.searchResults.map(
            (x) =>
              x.categories &&
              x.categories.length &&
              x.categories[x.categories.length - 1],
          ),
        ),
      )
        .filter((x) => !!x)
        .map((x) => ({ key: x, text: x, value: x }));
      return {
        ...defaultFilterOptions,
        dealers: {
          ...defaultFilterOptions.dealers,
          items: [...resultDealers],
        },
        category: {
          ...defaultFilterOptions.category,
          items: [...resultCategories],
        },
      };
    },
  },
  methods: {
    resetOptions() {
      this.options = { ...defaultOptions };
      const filterFunctions = getFilterFunctions({
        selectedOptions: defaultOptions.filter,
        filterOptions: this.filterOptions,
      });
      const sortFunction = getSortFunction({
        selectedOption: defaultOptions.sort,
        sortOptions: this.sortOptions,
      });
      this.$store.dispatch("FILTER", {
        filters: filterFunctions,
        sort: sortFunction,
      });
    },
    handleClickSortButton({ event, config }) {
      let desc = config.defaultDesc !== false;
      if (config.toggleable) {
        if (this.options.sort.key === config.key) {
          desc = !this.options.sort.desc;
        }
      }
      const newSelectedSort = { key: config.key, desc };
      this.options = { ...this.options, sort: newSelectedSort };
      const filterFunctions = getFilterFunctions({
        selectedOptions: this.options.filter,
        filterOptions: this.filterOptions,
      });
      const sortFunction = getSortFunction({
        selectedOption: this.options.sort,
        sortOptions: this.sortOptions,
      });
      this.$store.dispatch("FILTER", {
        filters: filterFunctions,
        sort: sortFunction,
      });
    },
    handleClickFilterButton({ event, config, item, boundary }) {
      if (config.type === "enum") {
        this.options.filter = {
          ...this.options.filter,
          [`${config.key}.${item.key}`]:
            this.options.filter[`${config.key}.${item.key}`] === false,
        };
      } else if (config.type === "include") {
        this.options.filter = {
          ...this.options.filter,
          [`${config.key}.${item.key}`]:
            this.options.filter[`${config.key}.${item.key}`] !== true,
        };
      } else if (config.type === "number") {
        let newValue = event && event.target ? event.target.value : event;
        if (!Number.isFinite(parseFloat(newValue))) {
          newValue = boundary === "min" ? 0 : Number.MAX_SAFE_INTEGER;
        }
        this.options.filter = {
          ...this.options.filter,
          [`${config.key}.${boundary}`]: newValue,
        };
      } else if (config.type === "boolean") {
        this.options.filter = {
          ...this.options.filter,
          [`${config.key}`]: event.target.checked,
        };
      }
      const filterFunctions = getFilterFunctions({
        selectedOptions: this.options.filter,
        filterOptions: this.filterOptions,
      });
      const sortFunction = getSortFunction({
        selectedOption: this.options.sort,
        sortOptions: this.sortOptions,
      });
      this.$store.dispatch("FILTER", {
        filters: filterFunctions,
        sort: sortFunction,
      });
    },
  },
};
</script>

<style>
.dick {
  height: 0;
  border-bottom: 1px solid gray;
}
</style>
