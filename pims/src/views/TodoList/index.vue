<template>
    <div>
        <el-card header="任务列表">
            <el-form :model="missionObj" ref="addForm" :rules="addFormRules">
                <div class="mission-input">
                    <div>
                        <el-form-item prop="plan">
                            <el-input v-model="missionObj.plan" placeholder="请输入任务">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div style="margin-top:1rem; margin-bottom: 1rem;">
                        <el-form-item prop="startDate">
                            <el-date-picker style="margin-right:1rem" v-model="missionObj.startDate" type="date"
                                value-format="yyyy-MM-dd" placeholder="开始日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item prop="endDate">
                            <el-date-picker v-model="missionObj.endDate" type="date" value-format="yyyy-MM-dd"
                                placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>

                    </div>
                </div>
                <el-form-item>
                    <el-button size="small" type="primary" @click="saveMission('addForm')">保存</el-button>
                </el-form-item>

            </el-form>

            <hr style="margin-top:2rem;margin-bottom:2rem">
            <h3>我的任务</h3>
            <div>
                <el-table ref="singleTable" :data="missionList" highlight-current-row
                    @current-change="handleCurrentChange" style="width: 100%">
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column property="startDate" label="开始时间" width="150">
                    </el-table-column>
                    <el-table-column property="endDate" label="结束时间" width="150">
                    </el-table-column>
                    <el-table-column property="plan" label="详情">
                    </el-table-column>
                </el-table>
            </div>
            <el-row type="flex" style="margin-top:1rem">
                <el-button type="success" @click="editMission" style="margin-right:1rem">编辑</el-button>
                <el-button type="warning" @click="delMission">删除</el-button>
            </el-row>
        </el-card>
    </div>

</template>

<script>
export default {
    async created() {
        const res = await this.$http.get(`schedule/getAll/${localStorage.getItem('userId')}`)
        this.missionList = res.data.data
    },
    data() {
        return {
            missionList: [],
            missionObj: {
                plan: '',
                endDate: '',
                startDate: '',
                finished: 0,
                userId: localStorage.getItem('userId')
            },
            selectedRow: null,
            addFormRules: {
                plan: [
                    { required: true, message: '内容不能为空', trigger: 'blur' },
                ],
                endDate: [
                    { required: true, message: '内容不能为空', trigger: 'blur' },
                ],
                startDate: [
                    { required: true, message: '内容不能为空', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        editMission() {
            if (this.selectedRow === null) {
                this.$message({
                    type: 'error',
                    message: '请选择一项'
                })
                return
            } else {
                this.missionObj = this.selectedRow
                this.isEdit = true
            }
        },
        delMission() {
            if (this.selectedRow === null) {
                this.$message({
                    type: 'error',
                    message: '请选择一项'
                })
                return
            } else {
                console.log(this.selectedRow);
                this.$http.delete(`schedule/delete/${this.selectedRow.id}`).then(res => {
                    console.log(res);
                    // 前端删除
                    this.missionList = this.missionList.filter(item => item.id !== this.selectedRow.id)
                }).catch(e => {
                    console.log(e);
                })
            }
        },
        handleCurrentChange(currentRow, oldRow) {
            this.selectedRow = currentRow

        },
        async saveMission(formName) {
            if (this.isEdit) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$http.put('schedule/update', this.missionObj).then(res => {
                            console.log(res);
                            this.selectedRow = this.missionObj
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                        }).catch(e => {
                            this.$message({
                                type: 'error',
                                message: '出错'
                            })
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请正确填写'
                        })
                    }
                });
                isEdit = false
            } else {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        const res = await this.$http.put('schedule/insert', this.missionObj).then(res => {
                            console.log(res);
                            this.missionList.push(res.data.data)
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                        }).catch(e => {
                            this.$message({
                                type: 'error',
                                message: '出错'
                            })
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: '请正确填写'
                        })
                    }
                });
            }
        }
    },
}
</script>

<style>
.mission-input {
    margin-bottom: .625rem;
}
</style>