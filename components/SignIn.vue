<template>
    
        <div v-if="signin" class="container_account" id="container_account">

            <button class="close_sign" style="font-size: 20px" @click="CloseSign()">X</button>

            <div class="form-container sign-up-container">
                <form onsubmit="return false;">
                    <h1>Sign In</h1>
                    <span>To keep connected with us please login with your personal info</span>
                    <div style="color: red;">
                        {{ faulty }}
                    </div>
                    <div class="inp_account inp_signin">
                        <input type="email" placeholder="Email" v-model="account" />
                        <input type="password" placeholder="Password" v-model="password" />
                    </div>
                    <button class="but_account" @click="fetchGet()" :disabled="loadingLogin">Sign In</button>
                </form>
            </div>
        <slot></slot>
    </div>
</template>

<script>

export default {
    props: {
        signin: {
            type: Boolean,
            default:false
        }
    },
    data() {
        return {
            url: 'https://64b4bf820efb99d86269398b.mockapi.io/user',
            user: null,
            account: '',
            password: '',
            faulty: '',
            loadingLogin: false
        }
    },
    methods: {
        commitUser(user){
            this.$store.dispatch('user/user_checkUser', user)
        },
        async fetchGet() {
            try {
                // -> close -> account = ''
                if(this.signin === false){
                    this.account = '';
                    this.password = '';
                }

                this.loadingLogin = true;
                const response = await this.$axios.$get(this.url);
                this.user = await response.find(item => item.account === this.account && item.password === this.password);
                if (this.user !== undefined) {
                    const review = await this.$axios.$get(this.url + `/${this.user.id}` + '/review');
                    this.$store.dispatch('user/user_UserReview', review)
                    this.faulty = '';
                    this.account = '';
                    this.password = '';
                    // -> home -> tắt sign in
                    this.$store.dispatch('user/user_NodeSignIn', false);
                    // -> disabled sign in
                    this.loadingLogin = false;
                    // -> user -> store
                    await this.commitUser(this.user)
                    return true;
                }
                this.faulty = 'You entered the wrong account or password';
                this.$store.dispatch('user/user_NodeSignIn', true);
                this.loadingLogin = false;
                return false;
                
            } catch (error) {
                alert('error network')
            }
        },
        CloseSign() {
            this.$emit('Close_Account', false);
        }
    }
}
</script>
<style>
button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
.inp_signin{
    margin-top: 24px;
}
</style>
    
    