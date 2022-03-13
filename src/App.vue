<template>
  <the-form @newProduct="addNewProduct"></the-form>
  <product-list :listProducts="list"></product-list>
</template>

<script>
import TheForm from './components/TheForm.vue';
import ProductList from './components/ProductList.vue';
import cameraImg from './images/camera.svg';

export default {
  provide() {
    return { removeProduct: this.removeProduct };
  },
  name: 'App',
  components: { TheForm, ProductList },
  data() {
    return {
      list: [
        {
          id: new Date().toISOString() + '1',
          name: 'Наименование товара',
          description:
            'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          image: cameraImg,
          price: 10000,
        },
        {
          id: new Date().toISOString() + '2',
          name: 'С - Наименование товара',
          description:
            'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          image: cameraImg,
          price: 12000,
        },
        {
          id: new Date().toISOString() + '3',
          name: 'Б - Наименование товара',
          description:
            'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк ',
          image: cameraImg,
          price: 9000,
        },
        {
          id: new Date().toISOString() + '4',
          name: 'A- Наименование товара',
          description:
            'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          image: cameraImg,
          price: 40000,
        },
        {
          id: new Date().toISOString() + '5',
          name: 'Наименование товара',
          description:
            'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          image: cameraImg,
          price: 8000,
        },
        {
          id: new Date().toISOString() + '6',
          name: 'Наименование товара',
          description:
            'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк ',
          image: cameraImg,
          price: 5000,
        },
      ],
    };
  },
  methods: {
    addNewProduct(name, description, image, price) {
      this.list.push({
        id: new Date().toISOString(),
        name,
        description,
        image,
        price,
      });
      localStorage.setItem('list', JSON.stringify(this.list));
    },
    removeProduct(id) {
      const currentProduct = this.list.findIndex(item => item.id === id);
      this.list.splice(currentProduct, 1);
      localStorage.setItem('list', JSON.stringify(this.list));
    },
  },
  mounted() {
    if (localStorage.getItem('list')) {
      this.list.splice(0, this.list.length);
      const savedList = JSON.parse(localStorage.getItem('list'));
      savedList.forEach(element => {
        this.list.push(element);
      });
    }
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');

body {
  margin: 0;
}

#app {
  font-family: 'Source Sans Pro';
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  padding: 31px 0 31px 0;
  justify-items: center;

  @media screen and (max-width: 776px) {
    grid-template-columns: 1fr;
  }
}
</style>
