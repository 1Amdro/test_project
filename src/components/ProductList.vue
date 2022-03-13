<template>
  <section>
    <div class="select-wrapper">
      <select v-model="selected">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <ul>
      <product-card
        v-for="product in sortList()"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :description="product.description"
        :image="product.image"
        :price="product.price"
      ></product-card>
    </ul>
  </section>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  props: ['listProducts'],
  data() {
    return {
      selected: 'A',
      options: [
        { text: 'По умолчанию', value: 'A' },
        { text: 'С минимальных цен', value: 'B' },
        { text: 'С максимальных цен', value: 'C' },
        { text: 'По именам', value: 'D' },
      ],
    };
  },
  methods: {
    sortList() {
      let sortedList = this.listProducts.map(item => item);
      if (this.selected === 'A') {
        return this.listProducts;
      }
      if (this.selected === 'B') {
        sortedList.sort((a, b) => a.price - b.price);
        return sortedList;
      }
      if (this.selected === 'C') {
        sortedList.sort((a, b) => b.price - a.price);
        return sortedList;
      }
      if (this.selected === 'D') {
        const compareName = (emp1, emp2) => {
          if (emp1.name > emp2.name) {
            return 1;
          }
          if (emp1.name < emp2.name) {
            return -1;
          }
          return 0;
        };
        sortedList.sort(compareName);
        return sortedList;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
}

.select-wrapper {
  align-self: end;
  @media screen and(max-width:1124px) {
  }
}

select {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  width: 121.49px;
  height: 36px;
  margin-bottom: 16px;
  background: #fffefb;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  color: #b4b4b4;
  border: transparent;
  text-align: center;

  &:focus {
    outline: none;
    border: 1px solid #b4b4b4;
  }
}

ul {
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  list-style: none;

  @media screen and (max-width: 1439px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1109px) {
    grid-template-columns: 1fr;
  }
}
</style>
