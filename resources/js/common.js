import axios from "axios"
import { mapGetters } from "vuex";

export default{
    methods: {
        async callApi(method, url, dataObj) {
            try{
                return await axios({
                    method: method,
                    url: url,
                    data: dataObj,
                })
            }
            catch(e){
                return e.response;
            }
        },
        info (desc, title="Hey!") {
            this.$Notice.info({
                title: title,
                desc: desc
            });
        },
        success (desc, title="Great!") {
            this.$Notice.success({
                title: title,
                desc: desc
            });
        },
        warning (desc, title="Oops!") {
            this.$Notice.warning({
                title: title,
                desc: desc
            });
        },
        error (desc, title="Oops") {
            this.$Notice.error({
                title: title,
                desc: desc
            });  
        },
        swr (desc='Something went wrong! Please try again.', title="Oops!") {
            this.$Notice.error({
                title: title,
                desc: desc
            });
        },
        checkUserPermission(key){
            if(!this.userPermission) return false
            let isPermitted = false
            for(let d of this.userPermission){
                if(this.$route.name == d.name){
                    if(d[key]){
                        isPermitted = true
                        break
                    }else{
                        break
                    }
                }
            }
            return isPermitted
        },
    },
    computed: {
        ...mapGetters({
            'userPermission' : 'getUserPermission'
        }),
        isReadPermitted(){
            return this.checkUserPermission('read')
        },
        isWritePermitted(){
            return this.checkUserPermission('write')            
        },
        isUpdatePermitted(){
            return this.checkUserPermission('update')            
            
        },
        isDeletePermitted(){
            return this.checkUserPermission('delete')            
            
        },
        

    }
}