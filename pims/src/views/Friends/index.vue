<template>
    <div>
        <el-button type="primary" size="small" @click="addFormVisible = true">
            添加好友
        </el-button>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="telenum" label="电话" width="180">
            </el-table-column>
            <el-table-column prop="detail" label="备注">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="350">
                <template slot-scope="scope">
                    <el-button @click="editBtn(scope.row)" type="text" size="normal">编辑
                    </el-button>
                    <el-button @click="delBtn(scope.row)" type="text" size="normal">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="isAdd ? '添加联系人' : '编辑联系人'" :visible.sync="addFormVisible" width="45%">
            <el-form :model="addForm">
                <el-row class="form-row">
                    <el-col :span="6">
                        <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="addForm.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row class="form-row">
                    <el-col :span="10">
                        <el-form-item label="电话" :label-width="formLabelWidth">
                            <el-input v-model="addForm.telenum" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="form-row">
                    <el-col :span="10">
                        <el-form-item label="备注" :label-width="formLabelWidth">
                            <el-input v-model="addForm.detail" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleFriend">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    async created() {
        // res = await this.$http.get('address/getAll/' + localStorage.getItem('userName'))
        const res = await this.$http.get('address/getAll/' + localStorage.getItem('userId'))
        console.log(res);
        this.tableData = res.data.data
    },
    data() {
        return {
            tableData: [],
            addFormVisible: false,
            addForm: {
                userId: localStorage.getItem('userId'),
                name: '',
                telenum: '',
                detail: ''
            },
            formLabelWidth: '50px',
            // 判断是编辑还是添加联系人
            isAdd: true
        }
    },
    methods: {
        // TODO 增删改
        async handleFriend() {
            if (this.isAdd) {
                const res = await this.$http.put('address/insert', this.addForm).then(res => {
                    console.log(res);
                    this.addFormVisible = false
                    this.tableData.push(res.data.data)
                    // this.$router.go(0)
                    this.$message({
                        type: 'success',
                        message: '操作成功！'
                    })
                    // 重置addForm data内容
                    this.addForm = this.$options.data().addForm
                }).catch(e => {
                    this.$message({
                        type: 'error',
                        message: '操作失败！'
                    })
                })
            } else {
                // 修改联系人API
                console.log(this.addForm);
                const res = await this.$http.put('address/update', this.addForm).then(res => {
                    console.log(res);
                    this.addFormVisible = false
                    this.$message({
                        type: 'success',
                        message: '操作成功！'
                    })
                    // 重置addForm data内容
                    this.addForm = this.$options.data().addForm
                }).catch(e => {
                    this.$message({
                        type: 'error',
                        message: '操作失败！'
                    })
                })

            }

        },
        editBtn(obj) {
            // 出现弹窗 进行修改
            this.isAdd = false
            this.addFormVisible = true
            this.addForm = obj
        },
        async delBtn(obj) {
            const res = await this.$http.delete('address/' + obj.id).then(res => {
                console.log(res);
                this.tableData = this.tableData.filter((item) => { return item.id !== obj.id })
                this.$message({
                    type: 'success',
                    message: '操作成功！'
                })
            }).catch(e => {
                this.$message({
                    type: 'error',
                    message: '操作失败！'
                })
            })
        }
    },
}
</script>

<style>
.form-row {
    margin-top: 1rem;
}
</style>