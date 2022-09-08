<template>
  <div class="card">
    <a href="#" class="card-container-data">
      <img
        class="card-container-data-img"
        :src="item.image_link"
        :alt="item.animal_type"
      />
      <div class="card-container-data-title">
        <span
          v-if="item.name.length < 12"
          class="card-container-data-title-left"
        >
          {{ item.name }}
        </span>

        <span v-else class="card-container-data-title-left">
          {{ item.name.substring(0, 12) + "..." }}
        </span>

        <span class="card-container-data-title-right">
          <small class="title-right-small">bis zu </small>
          <span>{{ item.weight_max }} Kg</span>
        </span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style scoped lang="scss">
@import "../style/mixins.scss";
@import "../style/colors.scss";

.card {
  position: relative;
  overflow: hidden;

  &-container-data {
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
    border-radius: 1.5rem;
    box-shadow: $shadow-yellow;
    text-decoration: none;

    &-img {
      border-top-left-radius: 1.5rem;
      border-top-right-radius: 1.5rem;
      background-position: center;
      background-size: cover;
      width: 338px;
      height: 240px;
      transition: all 0.5s ease;
    }
    &-title {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      &-left {
        color: $mainTextColor;
        font-size: 1.1rem;
        font-family: "Open Sans", sans-serif;
        font-weight: 700;
      }

      &-right {
        color: $priceColor;
        font-size: 1rem;
        font-family: "Open Sans", sans-serif;
        font-weight: 600;
      }
    }
  }

  @media (max-width: 1400px) {
    .card-container-data-img {
      width: 311px;
    }
  }
  @include respond(desktop) {
    .card-container-data-img {
      width: 274px;
    }
  }

  @include respond(mobile) {
    .card-container-data-img {
      height: 177px;
      width: 287px;
    }
    .card-container-data-title-left,
    .card-container-data-title-right {
      font-size: 1rem;
    }
    .title-right-small {
      font-size: 0.8rem;
    }
  }
}
</style>