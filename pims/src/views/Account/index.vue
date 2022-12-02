<template>
    <div>
        <el-button type="primary" size="small" @click="addFormVisible = true">
            添加记录
        </el-button>
        <el-table :data="tableData" style="width: 100%; margin-bottom: 1rem;">
            <el-table-column prop="id" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="date" label="时间" width="180">
            </el-table-column>
            <el-table-column prop="name" label="物品名称">
            </el-table-column>
        </el-table>
        <div>
            <el-dialog title="添加记录" :visible.sync="addFormVisible" width="45%">
                <el-form :model="addForm" :rules="addFormRule" ref="addForm">
                    <el-row class="form-row">
                        <el-col :span="10">
                            <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                                <el-input v-model="addForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row class="form-row">
                        <el-col :span="14">
                            <el-form-item label="价格" prop="price" :label-width="formLabelWidth">
                                <el-input v-model="addForm.price" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="form-row">
                        <el-col :span="14">
                            <el-form-item label="时间" prop="date" :label-width="formLabelWidth">
                                <el-date-picker style="margin-right:1rem" v-model="addForm.date" type="date"
                                    value-format="yyyy-MM-dd" placeholder="时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addItem">添加</el-button>
                </div>
            </el-dialog>
            <!-- <el-button @click="currentItem">当前</el-button> -->
            <el-button @click="save" type="primary">保存</el-button>
            <el-button @click="reverseOperation">撤销</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            formLabelWidth: '100px',
            addFormVisible: false,
            addFormRule: {
                name: [
                    { required: true, message: "内容不能为空！", trigger: "blur" }
                ],
                date: [
                    { required: true, message: "内容不能为空！", trigger: "blur" }
                ],
                price: [
                    { required: true, message: "内容不能为空！", trigger: "blur" }
                ]
            },
            addForm: {
                userid: Number(localStorage.getItem('userId')),
                name: '',
                price: '',
                date: ''
            },
        }
    },
    methods: {
        async reverseOperation() {
            await this.$http.get(`account/good/previous/${localStorage.getItem('userId')}`).then(res => {
                if (res.data.code == 200) {
                    this.tableData = res.data.data
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    })
                }
                else {
                    this.$message({
                        type: 'error',
                        message: '操作失败'
                    })
                }
            }).catch(e => { })

        },
        async currentItem() {
            const res = await this.$http.get(`account/good/current/${localStorage.getItem('userId')}`)
            console.log('currentItem', res.data.data);
        },
        async save() {
            const res = await this.$http.put(`account/save/${localStorage.getItem('userId')}`)
            if (res.data.code == 200) {
                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
            }
        },
        async addItem() {
            this.$refs["addForm"].validate(async (valid) => {
                if (valid) {
                    this.tableData.push(this.addForm)
                    console.log('tableData', this.tableData);
                    const res = await this.$http.put(`account/insert`, this.tableData)
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        })
                        this.addFormVisible = false
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: '请正确填写'
                    })
                }
            });
        }
    },
    async created() {
        const res = await this.$http.get(`account/good/${localStorage.getItem('userId')}`)
        this.tableData = res.data.data
        await this.$http.get(`account/good/current/${localStorage.getItem('userId')}`).then(res => {
            if (res.data.data.length >= res.data.data.length) {
                this.tableData = res.data.data
            }
        }).catch(e => {
            console.log(e);
        })

    },
}
</script>

<style>

</style>