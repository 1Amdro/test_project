<template>
  <section>
    <h2>Добавление товара</h2>
    <div class="wrapper">
      <form @submit.prevent="">
        <div class="form-control">
          <label class="required" for="product-name">Наименование товара</label>
          <input
            id="product-name"
            :class="{ 'input-error': v$.name.$error }"
            type="text"
            v-model="name"
            placeholder="Введите наименование товара"
          />
          <p v-show="v$.name.$error" class="error-text">
            Поле является обязательным
          </p>
        </div>
        <div class="form-control">
          <label for="product-description">Описание товара</label>
          <textarea
            id="product-description"
            type="text"
            v-model="description"
            placeholder="Введите описание товара"
          ></textarea>
        </div>
        <div class="form-control">
          <label class="required" for="img-ref"
            >Ссылка на изображение товара</label
          >
          <input
            id="img-ref"
            :class="{ 'input-error': v$.image.$error }"
            type="text"
            v-model="image"
            placeholder="Введите ссылку"
          />
          <p v-show="v$.image.$error" class="error-text">
            Поле является обязательным
          </p>
        </div>
        <div class="form-control">
          <label class="required" for="img-ref">Цена товара</label>
          <input
            :value="price"
            v-if="!price"
            :class="{ 'input-error': v$.price.$error || price === 0 }"
            type="number"
            @change="changeValue"
            placeholder="Введите цену"
          />
          <VueNumberFormat
            v-else
            :value="price"
            :class="{ 'input-error': v$.price.$error || price === 0 }"
            @change="changeValue"
            :placeholder="Введите"
            :options="{
              precision: 0,
              decimal: '',
              thousand: ' ',
              acceptNegative: false,
              isInteger: false,
            }"
          ></VueNumberFormat>
          <p v-show="v$.price.$error || price === 0" class="error-text">
            Поле является обязательным
          </p>
        </div>
        <div>
          <button @click="addProduct" :class="btnEnabled" class="btn-add">
            Добавить Товар
          </button>
          <p v-show="newMessage" class="message">Товар добавлен!</p>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useWindowSize } from 'vue-window-size';
import useValidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  emits: ['newProduct'],
  setup() {
    const { width, height } = useWindowSize();
    return {
      windowWidth: width,
      windowHeight: height,
      v$: useValidate(),
    };
  },
  data() {
    return {
      name: '',
      image: '',
      price: '',
      description: '',
      menuIsActive: false,
      newMessage: false,
    };
  },
  validations() {
    return {
      name: { required, $autoDirty: true },
      image: { required, $autoDirty: true },
      price: { required, $autoDirty: true },
    };
  },
  methods: {
    toggleMenu() {
      this.menuIsActive = !this.menuIsActive;
    },
    addProduct() {
      console.log(new Intl.NumberFormat('ru-RU').format(this.price));
      if (this.checkForm()) {
        this.$emit(
          'newProduct',
          this.name,
          this.description,
          this.image,
          this.price
        );
        this.name = this.description = this.image = this.price = '';
        this.v$.$reset();
        this.newMessage = true;
        setTimeout(() => (this.newMessage = false), 3000);
      } else {
        this.v$.name.$touch();
        this.v$.image.$touch();
        this.v$.price.$touch();
      }
    },
    changeValue(event) {
      this.price = +event.target.value.replaceAll(' ', '');
    },
    checkForm() {
      if (this.name && this.price && this.image) return true;
      else {
        return false;
      }
    },
  },
  computed: {
    btnEnabled() {
      return {
        'btn-add-ready': this.checkForm(),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 332px;
  background: #fffefb;
  box-shadow: 0px 20px 30px #0000000a, 0px 6px 10px #00000005;
  border-radius: 4px;
  margin: 16px;
  padding: 24px;
}

h2 {
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;
  margin: 0;
  margin-left: 16px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-control {
  display: flex;
  flex-direction: column;
  margin: 7px 24px 16px 24px;
}

label {
  font-size: 14px;
  line-height: 13px;
  letter-spacing: -0.02em;
  color: #49485e;
  margin-bottom: 4px;
  position: relative;
}

.input-error {
  border: 1px solid #ff8484;
}

.error-text {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: -0.02em;
  color: #ff8484;
}

.message {
  text-align: center;
  color: #7bae73;
}

.required::after {
  content: '';
  background: #ff8484;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  position: absolute;
}

input {
  font-size: 12px;
  line-height: 15px;
  height: 36px;
  width: 284px;
  text-align: left;
  color: #3f3f3f;
  background: #fffefb;
  box-shadow: 0px 2px 5px #0000001a;
  border-color: transparent;
  border-radius: 4px;
  padding-left: 16px;

  &:focus {
    outline: rgb(147, 147, 230) auto 1px;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

textarea {
  font-size: 13px;
  line-height: 15px;
  text-align: left;
  resize: none;
  background: #fffefb;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border: none;
  width: 284px;
  padding: 10px 5px 10px 16px;
  height: 108px;
  border-radius: 4px;
  font-family: 'Source Sans Pro';
  align-self: normal;

  &:focus {
    outline: rgb(147, 147, 230) auto 1px;
  }
}

.btn-add {
  width: 306px;
  height: 36px;
  background: #eeeeee;
  border-radius: 10px;
  color: #b4b4b4;
  border: transparent;
  font-weight: 600;
}

.btn-add-ready {
  background: #7bae73;
  color: #fff;
  cursor: pointer;
}

.overlay {
  display: none;

  @media screen and (max-width: 777px) {
    display: block;
  }
}
</style>
