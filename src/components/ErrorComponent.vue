<template>
  <section class="main">
    <img class="err-img" src="@/assets/error.jpg" alt="" />
    <div class="container">
      <h1 class="container-text">
        AWWW .... weine nicht
        <p class="container-text-extra">Es ist nur ein 404-Fehler!</p>
      </h1>
      <button @click="reload()" class="container-btn-return">
        Versuch noch ein Mal
      </button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    reload() {
      window.location.reload();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../style/colors.scss";
@import "../style/mixins.scss";

.main {
  display: flex;
  .err-img {
    width: 33%;
    height: 400px;
    margin-top: 1rem;
    margin-left: 3rem;
  }
  .container {
    width: 66%;
    &-text {
      text-align: center;
      white-space: pre-wrap;
      font-family: "Open Sans", sans-serif;
      font-weight: 600;
      font-size: 3.2rem;
      letter-spacing: 0.8rem;
      &-extra {
        font-size: 1.5rem;
        margin-top: 1rem;
      }
    }
    &-btn-return {
      color: $mainTextColor;
      border: none;
      padding: 1rem 2rem;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 1rem;
      margin: auto;
      display: flex;
      transition-duration: 0.4s;
      cursor: pointer;
      border-radius: 10px;

      &:hover {
        background-color: $btnBg;
        color: $white;
      }
    }
  }
  @include respond(mobile) {
    .err-img {
      width: 36%;
      height: 300px;
      margin-left: 0;
    }
    .container {
      width: 60%;
      margin-top: 2rem;
      &-text {
        letter-spacing: 0;
        font-size: 1.5rem;
        &-extra {
          font-size: 1rem;
          font-size: 400;
        }
      }
      &-btn-return {
        font-size: 0.8rem;
      }
    }
  }
}
</style>