<template>
  <li class="wrapper">
    <img :src="image" width="332" height="200" alt="name" />
    <button @click="removeProduct(id)" class="btn-remove"></button>
    <div class="container">
      <h3>{{ name }}</h3>
      <p class="description">{{ description }}</p>
      <div class="price">{{ formatPrice }} руб.</div>
    </div>
  </li>
</template>

<script>
export default {
  inject: ['removeProduct'],
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    id: {
      required: true,
    },
  },
  data() {
    return {
      formatPrice: new Intl.NumberFormat('ru-RU').format(this.price),
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 332px;
  height: 423px;
  background: #fffefb;
  box-shadow: 0px 20px 30px #0000000a, 0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    & .btn-remove {
      display: block;
    }
  }
}

.btn-remove {
  display: none;
  background-image: url('../images/icon_delete.svg');
  width: 32px;
  height: 32px;
  top: -10px;
  right: -10px;
  position: absolute;
  background-size: contain;
  border: transparent;
  background-color: transparent;
  cursor: pointer;
}

.container {
  padding: 0 16px;
}

img {
  object-fit: cover;
  border-radius: 4px 4px 0px 0px;
}

h3 {
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  margin-top: 16px;
}

.description {
  font-size: 16px;
  line-height: 20px;
}

.price {
  margin-top: 32px;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
}
</style>
