new Vue({
    el:'.container',
    data:{
        addressList:[],
        currentIndex:0,
        limitNum:3,
        shippingMethod: 1
    },
    mounted:function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
        filterAddress: function() {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods:{
        getAddressList:function(){
            var _this = this;
            this.$http.get('data/address.json').then(function (response) {
                res = response.data;
                if(res.status == 0){
                    this.addressList = res.result;
                }

            });
        },
        setDefault: function(addressId) {
            this.addressList.forEach(function (address, index) {
                if (address.addressId == addressId) {
                    address.isDefault = true;
                }
                else {
                    address.isDefault = false;
                }
            });
        },
        loadMore:function () {
            this.limitNum = this.addressList.length;
        }
    }

});