<style scoped>
.my-card{
  width: 100%;
  max-width: 250px;
}
</style>


<template>
  <div class="q-pa-md">
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
          <q-item-section side top>
            <q-btn color="red" @click.prevent="removeFavourites(user)" label="Remove" />
          </q-item-section>
        </q-item>
        
      <q-item v-if="!users.length" >
        <q-item-section avatar>
            No Contact in Favourites
          </q-item-section>
        </q-item>

    </q-list>
  </div>
</template>
<script>
let _ = require('lodash');
import Helpers from '../helpers.js'
import {
  QBtn,
  QAvatar,
  QList,
  QItem,
  QItemSection,
  QItemLabel
} from 'quasar'
export default {
  mixins: [Helpers],
    components: {
        QAvatar,
        QList,
        QItem,
        QItemSection,
        QItemLabel,
        QBtn
    },
    data(){
        return {
          lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          users: this.$store.getters.contact,
          page:1
        }
    },
    mounted(){
      this.users = this.$store.getters.contact;
    },
    methods: {
        removeFavourites(contact){
          let contacts = this.$store.getters.contact;

          let data = this.checkFavouriteDataExists(contact)

          if(!data){
            alert('data does not exists exists')
            this.users = contacts;
            return
          }

          var index= _.indexOf(contacts,data);

          contacts = contacts.splice(index, 1)

          this.$store.dispatch('saveData', contacts).then(()=> {
            this.users = this.$store.getters.contact;
            alert('removed successfully')
        })

          
        }
    }
}
</script>