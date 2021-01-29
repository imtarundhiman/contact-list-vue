<style>
.navigation-name{
  color: darkcyan;
}
</style>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          {{this.$route.meta.pageName}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <router-link tag="a" to="/">List</router-link>
            <q-item-label caption>Show all contacts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>
          <q-item-section>
            <router-link tag="a" to="/favourites">Favourites ({{this.$store.getters.contact.length}})</router-link>
            <q-item-label caption>Favourite Contacts</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'LayoutDefault',

  components: {
  
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  },
}
</script>

<style>
</style>
