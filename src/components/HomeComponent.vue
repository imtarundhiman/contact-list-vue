<style scoped>
.my-card{
  width: 100%;
  max-width: 250px;
}
</style>


<template>
  <div class="q-pa-md">
    <div class="q-pt-sm">
      <q-btn-dropdown
      split
      class="float-right vertical-top"
      color="teal"
      label="Sort By"
    >
      <q-list>
        <q-item clickable v-close-popup @click="sortBy('first_name','asc')">
          <q-item-section>
            <q-item-label>Name ASC</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="sortBy('first_name','desc')">
          <q-item-section>
            <q-item-label>Name Desc</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    </div>
    <div class="q-pt-xl">
      <q-list>
      <q-item v-bind:key="index" v-for="(user,index) in this.users" >
        <q-item-section avatar>
            <q-avatar>
              <img :src="user.avatar">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <router-link class="user-name" tag="a" :to="'/detail/'+user.id" >{{user.first_name}} {{user.last_name}}</router-link>
            <q-item-label caption lines="2">{{user.email}}</q-item-label>
          </q-item-section>
          <q-item-section v-if="!checkFavouriteDataExists(user)" side top>
            <q-btn color="green"  @click="addToFavourite(user)" label="Add To Favourite" />
          </q-item-section>
        </q-item>
        
      <q-item v-if="!users.length" >
        <q-item-section avatar>
            No Contact Available
          </q-item-section>
        </q-item>

    </q-list>
    </div>
    
  </div>
</template>
<script>
import axios from 'axios'
import Helpers from '../helpers.js'
import {
  QAvatar,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QBtnDropdown
} from 'quasar'
export default {
    mixins: [Helpers],
    components: {
        QAvatar,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
        QBtnDropdown
    },
    data(){
        return {
          lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          users: [],
          page:1
        }
    },
    mounted(){
      this.fetchContacts();
    },
    methods: {
      fetchContacts(){
        axios.get('https://reqres.in/api/users?page='+this.page)
        .then(response => {
          this.users = response.data.data;
        })
      },
      addToFavourite(contact){
        let favourites = this.$store.getters.contact;

        if(this.checkFavouriteDataExists(contact)){
            alert('data exists')
            return
        }

        favourites.push(contact)

        this.$store.dispatch('saveData', favourites).then(()=> {
            this.fetchContacts()
            alert('added successfully')
        })
    },
    }
}
</script>