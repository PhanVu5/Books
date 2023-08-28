<template>
    
    <div v-if="signup" class="container_account" id="container_account">

        <button class="close_sign" style="font-size: 20px" @click="DeleteInput">X</button>

        <div class="form-container sign-up-container">
            <form onsubmit="return false;">
                <h1 style="font-weight: 100px;">Create Account</h1>
                <span style="font-weight: 100px;">or use your email for registration</span>
                
                <div class="inp_account">
                    <input type="text" placeholder="Name" v-model="name" autocomplete="off"/>
                    <input type="email" placeholder="Email" v-model="account" autocomplete="off"/>
                    <input type="password" placeholder="Password" v-model="password" autocomplete="off"/>
                </div>
                <button class="but_account" @click="fetchPost()" :disabled="loadingLogin">Sign Up</button>
                <div :style="{color: checkCreate ? 'green' : 'red'}">
                    <p v-if="checkCreate"> {{ submit }} </p>
                    <p v-else-if="!checkCreate"> {{ faulty }} </p>
                </div>
            </form>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        signup:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            url: 'https://64b4bf820efb99d86269398b.mockapi.io/user',
            name: '',
            account: '',
            password: '',
            submit: '',
            faulty: '',
            loadingLogin: false,
            checkCreate: ''
        }
    },
    methods: {
        async fetchGet() {
            try {
                const response = await this.$axios.$get(this.url);
                const check = await response.find(item => item.account === this.account);
                if (check === undefined){
                    return true;
                }
                return false;
            } catch (error) {
                alert('error network')
            }
        },
        async fetchPost() {
            try {
                if(this.name === "" && this.account === "" && this.password === ""){
                    this.faulty = 'You entered the wrong account, name or password';
                } else {
                    this.faulty = '';
                }

                this.loadingLogin = true
                const check = await this.fetchGet();
                const conditions = this.name !== "" && this.account !== "" && check && this.password !== "";
                if (conditions) {
                    this.$axios.$post(this.url, {
                        name: this.name,
                        account: this.account,
                        password: this.password
                    })

                    this.faulty = '';
                    this.account = '';
                    this.password = '';
                    this.checkCreate = true;
                    this.loadingLogin = false;
                    this.submit = 'Create finished';
                    this.$store.dispatch('user/user_NodeSignUp', false);
                } else {
                    this.checkCreate = false;
                    this.submit = '';
                    this.faulty = 'You entered the wrong account, name or password';
                    if (check === false) {
                        this.faulty = 'Account already exists';
                    }
                    this.$store.dispatch('user/user_NodeSignUp', true);
                    this.loadingLogin = false;
                }
            } catch (error) {
                alert('error post')
            }
        },
        DeleteInput() {
            this.$emit('Close_Account', false);
            this.name = '';
            this.account = '';
            this.password = '';
        }
    }
}
</script>
<style scoped>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

p{
    font-size: 18px;
    padding: 2px;
}
</style>
    
    