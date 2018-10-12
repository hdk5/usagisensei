<template>
  <div v-title="$t('title.main')" class="home">
    <Github fill="#fff" color="#063261" top="0"/>
    <div class="hero-container">
      <Card class="hero" :padding="5">
        <div class="hero-title">
          <h1>{{$t("home.title")}}</h1>
          <p>
            <Icon type="chevron-right"/>
            <Icon type="chevron-right"/>
            <a href="https://space.bilibili.com/24889090/#/article" target="_blank" style="color:#0a498c;">{{$t("home.link")}}</a>
            <Icon type="chevron-left"/>
            <Icon type="chevron-left"/>
          </p>
        </div>
        <img class="hero-image" :src="backgroundImage" >
        <p class="autor">Design by <a href="http://makinoworks.com" target="_blank" style="text-decoration: none;">MakinoWorks</a></p>
      </Card>
    </div>
  </div>
</template>

<script>
import Github from '@/components/github.vue'

export default {
  name: 'home',
  computed: {
    backgroundImage: function() {
      const max = 71
      let random = Math.floor(Math.random() * (max - 1 + 1)) + 1
      if (random < 10) {
        random = '0' + random
      }
      return 'img/bg/bg' + random + '.png'
    }
  },
  components: {
    Github
  }
}
</script>
<style lang="scss" scoped>
@function multiple-text-shadow($n, $color) {
  $value: '0 0 5px #{$color}';
  @for $i from 2 through $n {
    $value: '#{$value} , 0 0 5px '+$color;
  }

  @return unquote($value);
}

.home {
  height: calc(100vh - 60px);
  width: 100%;
  background: #063261;
  position: absolute;
  top: 60px;
  .hero-container {
    margin: 10px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    .hero {
      max-width: 902px;
      margin: 0 auto;
      .hero-title {
        position: absolute;
        width: 100%;
        top: 50%;
        text-align: center;
        text-shadow: multiple-text-shadow(5, #fff);
        transform: translateY(-50%);
      }
      .hero-image {
        width: 100%;
        border-radius: 4px;
        margin-top: 5px;
      }
      .autor {
        font-size: 10px;
        line-height: 4px;
        text-align: right;
      }
    }
  }
}
.github-corner-svg {
  fill: #fff;
  color: #063261;
}
</style>

