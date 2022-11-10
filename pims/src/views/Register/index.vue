<template>
    <div class="login-container">
        <el-card header="注册用户" class="login-card">
            <el-form @submit.native.prevent="register">
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
                            提交
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
        async register() {
            const res = await this.$http.post('register', this.model).then(res => {
                console.log(res);
                if (res.data.data) {
                    this.$router.push('/login')
                    this.$message({
                        type: 'success',
                        message: '注册成功！'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '注册失败！'
                    })
                }
            }).catch(e => {
                this.$message({
                    type: 'error',
                    message: '注册失败！'
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