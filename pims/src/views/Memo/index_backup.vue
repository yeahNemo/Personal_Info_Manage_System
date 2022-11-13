<template>

    <div>
        <el-row>
            <el-col :span="4">
                <el-button type="primary" @click="addclick">添加</el-button>
            </el-col>
        </el-row>



        <el-card class="box-card" v-for="item in datalist" :key="item.id" shadow>
            <div slot="header" class="clearfix">
                <span>{{ item.date }}</span>
                <el-button style="float: right; padding: 8px 8px" type="danger" @click="delMemo(item.id)">删除</el-button>
            </div>
            <div class="text-item">
                <div class="markdown-body" v-html="msgHtml"></div>
                <el-button style=" float: right; padding: 8px 8px" type="primary" @click="editMemo(item)">修改
                </el-button>
            </div>
        </el-card>


        <el-dialog title="添加备忘录" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">

            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">

                <el-form-item label="内容" prop="detail">
                    <!-- <el-input type="textarea" autosize v-model="addForm.detail"></el-input> -->
                    <mavon-editor v-model="addForm.detail" />
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addMemo">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>
    
<script>
import moment from 'moment'
import { marked } from 'marked'
export default {
    created() {
        this.getlist()
    },
    data() {
        const msg = '```\n' +
            'public static void main(String[] args) {\n' +
            '\tSystem.out.println("Hello World!!!");\n' +
            '}\n' +
            '```'
        msgHtml = marked(msg)
        return {
            datalist: [],
            addDialogVisible: false,
            addForm: {
                date: "",
                detail: "",
                userId: localStorage.getItem('userId')
            },
            addFormRules: {
                detail: [
                    { required: true, message: '内容不能为空', trigger: 'blur' },
                ],
            },
            isEdit: false,
            memoToEdit: null,
            msgHtml
        }

    },
    methods: {
        editMemo(item) {
            this.isEdit = true
            this.addDialogVisible = true
            this.memoToEdit = item
            this.addForm['detail'] = item.detail
        },
        delMemo(memoId) {
            this.$http.delete(`memo/delete/${memoId}`).then(res => {
                console.log(res);
                this.datalist = this.datalist.filter(item => item.id !== memoId)
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
            })
        },
        addMemo() {
            if (this.isEdit) {
                this.addDialogVisible = false
                this.addForm['date'] = moment(Date.parse(new Date())).format('YYYY-MM-DD')
                //api
                this.addForm['id'] = this.memoToEdit.id
                console.log(this.addForm);
                this.$http.put(`memo/update`, this.addForm).then(res => {
                    this.memoToEdit.detail = res.data.data.detail
                    // 重置addForm
                    this.addForm = this.$options.data().addForm
                })
                return
            }
            this.addDialogVisible = false
            this.addForm['date'] = moment(Date.parse(new Date())).format('YYYY-MM-DD')
            console.log(this.addForm);
            //api
            this.$http.put('memo/insert', this.addForm).then(res => {
                // 添加时间
                console.log(res)
                this.datalist.push(res.data.data)
                // 重置addForm
                this.addForm = this.$options.data().addForm
            })
        },
        getlist() {
            // this.datalist = this.str1["data"]
            this.$http.get(`memo/${localStorage.getItem('userId')}`).then(res => {
                console.log(res)
                this.datalist = res.data.data
            })
        },
        addclick() {
            this.addDialogVisible = true
        },

        addDialogClosed() {

        }
    }

}
</script>
    
<style scoped>
.box-card {
    margin-top: 20px;
}
</style>