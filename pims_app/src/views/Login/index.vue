<template>
    <div>
        <van-nav-bar title="个人信息管理">
        </van-nav-bar>
        <div class="main">
            <div>
                <h1>
                    登录
                </h1>
            </div>
            <van-form @submit="onSubmit">
                <van-field v-model="model.username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="model.password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <div style="margin: 3.0769rem;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async onSubmit() {
            try {
                const res = await this.$http.post('login', this.model)
                console.log(res);
                if (res.data.data) {
                    localStorage.setItem('userId', res.data.data.id);
                    localStorage.setItem('userName', res.data.data.username);
                    this.$router.push({
                        path: '/main/home'
                    })
                    this.$toast.success('登录成功');
                } else {
                    this.$toast.fail('请检查输入！');
                }
            } catch (error) {
                this.$toast.fail('请检查输入！');
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.main {
    padding: 10% 10%;
    font-weight: bold;
}
</style>