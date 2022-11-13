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
                    <el-date-picker v-model="missionObj.endDate" type="date" value-format="yyyy-MM-dd"
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
    async created() {
        const res = await this.$http.get(`schedule/getAll/${localStorage.getItem('userId')}`)
        this.missionList = res.data.data
        // console.log(res);


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
            selectedRow: null
        }
    },
    methods: {
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
        async addMission() {
            const res = await this.$http.put('schedule/insert', this.missionObj)
            console.log(res);
            this.missionList.push(obj.data.data)
        }
    },
}
</script>

<style>
.mission-input {
    margin-bottom: .625rem;
}
</style>