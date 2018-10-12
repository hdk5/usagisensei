<template>
  <div class="topnav">
    <i-menu mode="horizontal" theme="light" :active-name="activeName">
      <router-link to="/">
        <menu-item name="home">
          <Icon type="home"/>
          {{$t('topNav.home')}}
        </menu-item>
      </router-link>
      <router-link to="/about">
        <menu-item name="about">
          <Icon type="information"/>
          {{$t('topNav.about')}}
        </menu-item>
      </router-link>
      <Submenu name="rank">
        <template slot="title">
          <Icon type="star"/>
          {{$t('topNav.rank')}}
        </template>
          <router-link v-for="rank in ranks" :key="rank" :to="'/rank/'+rank">
            <menu-item :name="'ship'+rank">{{ $t('topNav.no', { msg: rank }) }}</menu-item>
          </router-link>
      </Submenu>
      <!-- <router-link to="/editor">
        <menu-item name="editor">
          <Icon type="edit"/>
          编辑器
        </menu-item>
      </router-link> -->
      <p style="float:right; margin-right:20px;">
        <a href="javascript:void(0)" @click="changeLang('CN')">中</a>｜
        <a href="javascript:void(0)" @click="changeLang('en')">EN</a>
      </p>
    </i-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'topnav',
  data() {
    return {
      activeName: this.$route.name
    }
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang
    }
  },
  computed: {
    ranks: function() {
      return Object.keys(this.rawLink)
    },
    ...mapGetters(['rawLink'])
  }
}
</script>