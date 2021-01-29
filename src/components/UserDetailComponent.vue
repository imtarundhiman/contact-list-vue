<style lang="sass" scoped>
.my-card
  width: 100%
</style>

<template>
    <div>
        <div class="q-pa-md ">
        <q-card class="my-card" flat bordered>
            <q-img
                            src="https://placeimg.com/1200/300/nature"
                            style="width:100%; height: auto;"
                        >
                    <div class="absolute-bottom text-subtitle1 text-center">
                        <q-avatar>
                            <img :src="userData.avatar">
                        </q-avatar>
                    </div>
            </q-img>

      <q-card-section>
        <div class="text-overline text-orange-9 text-center">{{userData.email}}</div>
        <div class="text-h5 q-mt-sm q-mb-xs text-center">{{userData.first_name}} {{userData.last_name}}</div>
        <div v-if="!checkFavouriteDataExists(userData)" class="text-caption text-grey text-center">
          <q-btn color="green"  @click="addToFavourite(userData)" label="Add To Favourite" />
        </div>
      </q-card-section>
    </q-card>
  </div>
    </div>
</template>
<script>
import Helpers from '../helpers.js'
import axios from 'axios'
import {
  QImg,
  QCard,
  QCardSection,
//   QCardActions,
  QAvatar
} from 'quasar'
export default {
  mixins: [Helpers],
    components: {
        QImg,
        QCard,
        QCardSection,
        // QCardActions,
        QAvatar
    },
    data(){
        return {
          userId: null,
          userData: {
            id: null,
            first_name: '',
            last_name: '',
            email: '',
            avatar: ''
          }
        }
    },
    mounted(){
      this.userId = this.$route.params.userId;

      if(this.userId){
        this.fetchUserInfo();
      }else{
        alert('Invalid User')
      }
    },

    methods: {
      fetchUserInfo(){
        axios.get('https://reqres.in/api/users/'+this.userId)
        .then(response => {
          this.userData = response.data.data;
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
            this.fetchUserInfo()
            alert('added successfully')
        })
      },
    }
}
</script>