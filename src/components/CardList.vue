<template>
  <section class="main">
    <div class="card">
      <h2 class="card-headline">
        Zootiere
        <a href="https://www.restplatzboerse.at/" class="card-link">Alle</a>
      </h2>
      <h3 class="card-subheadline">Zufällige Auswahl an Zootieren</h3>
    </div>

    <div class="card-list">
      <ul class="card-list-container" v-if="animals.length > 0">
        <li 
          class="card-item"
          v-for="(animal, index) in animals"
          :key="index"
          :style="listPosition"
        >
          <CardItem :item="animal" />
        </li>
        <span
          v-if="!isNextHidden"
          @click="nextIndex()"
          class="material-symbols-outlined next-btn"
          >chevron_right
        </span>
        <span
          v-if="!isPrevHidden"
          @click="prevIndex()"
          class="material-symbols-outlined prev-btn"
          >chevron_left
        </span>
      </ul>

      <!-- spinner -->
      <p id="spinner" v-else-if="animals.length <= 0 && isError == false">
        <SpinerComponent />
      </p>

      <!-- error handling-->
      <li id="error" v-if="isError">
        <ErrorComponent />
      </li>
    </div>
  </section>
</template>

<script>
import CardItem from "./CardItem.vue";
import ErrorComponent from "./ErrorComponent.vue";
import SpinerComponent from "./SpinerComponent.vue";
import axios from "axios";

export default {
  components: {
    CardItem,
    ErrorComponent,
    SpinerComponent,
  },

  data() {
    return {
      isError: false,
      animals: [],
      currentIndex: 0,
      totalIndex: 0,
      calculateLeftIndex: 0,
      isNextHidden: false,
      isPrevHidden: true,
      touchListenerStart: false,
      touch: {
        startX: 0,
        endX: 0,
      },
    };
  },
  computed: {
    //Logic for move image in X direction (horizontal) depend on currentIndex which is calculed in next/prevIndex method
    listPosition() {
      return {
        transform: "translateX(-" + this.currentIndex * 100 + "%)",
        transition: "all 0.5s ease",
      };
    },
  },

  methods: {
    getAnimals() {
      const vm = this;
      try {
        axios
          .get("https://zoo-animal-api.herokuapp.com/animals/rand/5")
          .then(function (res) {
            vm.animals = res.data;
            vm.totalIndex = res.data.length;
          })
          .catch(function (err) {
            if (err.response.status == "404") {
              vm.isError = true;
            }
          });
      } catch (err) {
        vm.isError = true;
      }
    },

    nextIndex() {
      if (this.currentIndex == this.totalIndex - this.calculateLeftIndex - 1) {
        this.isNextHidden = true;
      }
      if (this.currentIndex < this.totalIndex - this.calculateLeftIndex) {
        this.currentIndex++;
        this.isPrevHidden = false;
      }
    },

    prevIndex() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.isNextHidden = false;
      }
      if (this.currentIndex == 0) {
        this.isPrevHidden = true;
      }
    },
    screenSize() {
      let currentWidth = window.innerWidth;
      if (currentWidth > 1200) {
        this.calculateLeftIndex = 4;
      }
      if (currentWidth <= 1200) {
        this.calculateLeftIndex = 3;
      }
      if (currentWidth <= 900) {
        this.calculateLeftIndex = 2;
      }
      if (currentWidth <= 600) {
        this.calculateLeftIndex = 1;
        if (this.touchListenerStart == false) {
          this.touchListener();
        }
      }
    },

    touchstart(event) {
      this.touch.startX = event.touches[0].clientX;
      this.touch.endX = 0;
    },
    touchmove(event) {
      this.touch.endX = event.touches[0].clientX;
    },
    touchend() {
      if (
        !this.touch.endX ||
        Math.abs(this.touch.endX - this.touch.startX) < 20
      ) {
        return;
      }
      if (this.touch.endX < this.touch.startX) {
        this.nextIndex();
      }
      if (this.touch.endX > this.touch.startX) {
        this.prevIndex();
      }
    },

    touchListener() {
      this.touchListenerStart = true;
      this.$el.addEventListener("touchstart", (event) =>
        this.touchstart(event)
      );
      this.$el.addEventListener("touchmove", (event) => this.touchmove(event));
      this.$el.addEventListener("touchend", () => this.touchend());
    },
  },

  mounted() {
    try {
      this.screenSize();

      //API call
      this.getAnimals();
    } catch (err) {
      this.isError = true;
    }
  },

  created() {
    window.addEventListener("resize", this.screenSize);
  },

  unmounted() {
    window.removeEventListener("touchstart", (event) => this.touchstart(event));
    window.removeEventListener("touchmove", (event) => this.touchmove(event));
    window.removeEventListener("touchend", () => this.touchend());
    window.removeEventListener("resize", this.screenSize);
  },
};
</script>
<!-- 16px = 1rem -->
<style scoped lang="scss">
@import "../style/colors.scss";
@import "../style/mixins.scss";

.main {
  margin: 0 auto 3.5rem;
  max-width: 90rem;
  background-color: $mainBg;
  .card {
    &-headline {
      font-family: "Quicksand", sans-serif;
      font-weight: 700;
      font-size: 2.4rem;
      color: $mainTextColor;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin: 0 0.5rem;
      padding: 0px;
    }
    &-subheadline {
      font-family: "Open Sans", sans-serif;
      font-size: 1.6rem;
      font-weight: 400;
      color: $subTextColor;
      text-align: left;
      margin: 0 0.6rem;
    }
    &-link {
      font-family: "Open Sans", sans-serif;
      font-size: 1.4rem;
      font-weight: 400;
      color: $mainTextColor;
      float: right;
      text-decoration: none;
    }
  }

  .card-list {
    overflow: hidden;
    position: relative;
    &::after {
      right: 0;
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      width: 2.3rem;
      background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff);
    }

    &-container {
      padding: 0;
      margin: 0;
      margin-top: 2rem;
      display: flex;
      box-sizing: border-box;
    }
    .card-item {
      padding-right: 5px;
      cursor: pointer;
      list-style: none;
    }

    .next-btn {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
      position: absolute;
      left: 94%;
      top: 35%;
      z-index: 1;
      background: $arrowBg;
      border: 0.1rem solid $arrowBorder;
      color: $arrowColor;
    }
    .prev-btn {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
      position: absolute;
      top: 35%;
      left: 1%;
      z-index: 1;
      color: $arrowColor;
      background: $arrowBg;
      border: 0.1rem solid $arrowBorder;
    }
  }

  @include respond(tablet) {
    .next-btn {
      left: 90% !important;
    }
  }
  @include respond(mobile) {
    .card-headline {
      font-size: 1.5rem;
    }
    .card-subheadline {
      font-size: 1rem;
    }
    .card-link {
      font-size: 1rem;
    }
    .prev-btn,
    .next-btn {
      display: none;
    }
  }
}
</style>