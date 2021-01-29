import {_} from 'vue-underscore';
export default {
    data(){

    },
    methods: {
        sortBy(property, sorting){
            this.users = _.sortBy(this.users, property);
            if(sorting == 'desc'){
                this.users = this.users.reverse();
            }
        },
        fetchAllFavourites(){
            return this.$store.getters.contact
        },
        checkFavouriteDataExists(contact){
            var data = _.find(this.fetchAllFavourites(), function(contactItem){ return contactItem.id == contact.id; });
            return data;
        }
    }
}