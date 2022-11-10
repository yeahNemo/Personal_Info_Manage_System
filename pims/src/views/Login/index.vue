<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="model.username">

                    </el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="model.password">

                    </el-input>
                </el-form-item>
                <el-row type="flex" justify="center">
                    <el-form-item>
                        <el-button type="primary" native-type="submit">
                            登录
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="margin-left: 1rem" @click="register()">
                            注册
                        </el-button>
                    </el-form-item>
                </el-row>

            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {}
        }
    },
    methods: {
        register() {
            this.$router.push('/register')
        },
        async login() {
            const res = await this.$http.post('login', this.model).then(res => {
                console.log(res);
                if (res.data.data) {
                    localStorage.setItem('userId', res.data.data.id);
                    localStorage.setItem('userName', res.data.data.username);
                    this.$router.push({
                        path: '/home'
                    })
                    this.$message({
                        type: 'success',
                        message: '登录成功！'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '登录失败！'
                    })
                }
            }).catch(e => {
                this.$message({
                    type: 'error',
                    message: '登录失败！'
                })
            })

        }
    },
}
</script>

<style>
.login-card {
    width: 30rem;
    margin: 6rem auto
}
</style>