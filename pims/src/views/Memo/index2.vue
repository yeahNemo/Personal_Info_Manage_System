<template>
    <div>
        <el-card header="备忘录">
            <h3>新增备忘录</h3>
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="memoToAdd">
            </el-input>
            <el-button type="primary" size="small" style="margin: 10px 0" @click="addMemo">
                添加
            </el-button>
            <hr>
            <h3>我的备忘录</h3>
            <el-input class="memo-item" v-for="memo in memoList" :key="memo.id" :readonly="true" :value="memo.detail">
            </el-input>
        </el-card>
    </div>
</template>

<script>
export default {
    created() {
        this.$http.get(`memo/${localStorage.getItem('userId')}`).then(res => {
            console.log(res)
            this.memoList = res.data.data
        }
        )
    },
    data() {
        return {
            memoToAdd: '',
            memoList: []
        }
    },
    addMemo() {

    }
}
</script>

<style>
.memo-item {
    margin: 10px 0
}
</style>