<template>
    <div>
        <el-card header="任务列表">
            <div class="mission-input">
                <div>
                    <el-input v-model="missionObj.plan" placeholder="请输入任务">
                    </el-input>
                </div>
                <div style="margin-top:1rem; margin-bottom: 1rem;">
                    <el-date-picker style="margin-right:1rem" v-model="missionObj.startDate" type="date"
                        value-format="yyyy-MM-dd" placeholder="开始日期">
                    </el-date-picker>
                    <el-date-picker v-model="missionObj.startDate" type="date" value-format="yyyy-MM-dd"
                        placeholder="结束日期">
                    </el-date-picker>
                </div>
            </div>
            <el-button size="small" type="primary" @click="addMission">添加任务</el-button>
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
                <el-button type="success" style="margin-right:1rem">完成</el-button>
                <el-button type="warning" @click="delMission">删除</el-button>
            </el-row>
        </el-card>
    </div>

</template>

<script>
export default {
    data() {
        return {
            missionList: [
                {
                    endDate: '2022-1-17',
                    startDate: '2002-1-17',
                    plan: '吃饭'
                }
            ],
            missionObj: {
                plan: '',
                endDate: '',
                startDate: '',
                finished: false,
                userId: localStorage.getItem('userId')
            },
            selectedRowId: ''
        }
    },
    methods: {
        delMission() {
            if (this.selectedRowId === '') {
                this.$message({
                    type: 'error',
                    message: '请选择一项'
                })
                return
            } else {
                // TODO 调用删除的API
            }
        },
        handleCurrentChange(currentRow, oldRow) {
            console.log(currentRow, oldRow);

        },
        async addMission() {
            // TODO 判断输入这里写错了
            if (this.missionObj === {}) {
                this.$message({
                    type: 'error',
                    message: '请输入内容'
                })
                return
            } else {
                // const res = await this.$http.put('schedule/insert', this.missionObj)
                let obj = {}
                obj = Object.assign(obj, this.missionObj)
                this.missionList.push(obj)
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