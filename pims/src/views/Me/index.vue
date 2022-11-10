<template>
    <div>
        <el-form label-width="50px">
            <el-row type="flex" justify="row-bg" style="flex-wrap: wrap;">
                <el-col :span="4">
                    <el-form-item label="姓名">
                        <el-input :disabled="!isEdit" v-model="model.username"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="20"></el-col>

                <el-col :span="6">
                    <el-form-item label="电话">
                        <el-input :disabled="!isEdit" v-model="model.telenum"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="18"></el-col>

                <el-col :span="3">
                    <el-form-item label="性别">
                        <el-select :disabled="!isEdit" v-model="model.sex">
                            <el-option value="男"></el-option>
                            <el-option value="女"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="生日">
                        <el-date-picker :disabled="!isEdit" v-model="model.birthday" type="date"
                            value-format="yyyy-MM-dd" placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <div style="margin-left: 3rem">
                    <el-button @click="isEdit = true">编辑</el-button>
                    <el-button @click="save" style="margin-left: 2rem" type="primary">保存</el-button>
                </div>

            </el-row>

        </el-form>
    </div>
</template>

<script>
export default {
    async created() {
        const res = await this.$http.get(`info/${localStorage.getItem('userId')}`)
        console.log(res.data);
        this.model = res.data.data
    },
    methods: {
        async save() {
            const res = await this.$http.put('info/update', this.model).then(res => {
                console.log(res.data.code);

                if (res.data.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '保存成功！'
                    })
                    this.isEdit = false
                }
            }).catch(e => {
                this.$message({
                    type: 'error',
                    message: '保存失败！'
                })
            })

        }
    },
    data() {
        return {
            model: {
                name: '',
                sex: '',
                birthday: '',
                telenum: ''
            },
            isEdit: false
        }
    },

}
</script>

<style>

</style>