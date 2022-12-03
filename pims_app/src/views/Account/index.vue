<template>
    <div>
        <van-button round size="small" style="margin: 1rem 0.5rem;" @click="(showPopUp = true)" type="primary">
            添加
        </van-button>
        <van-button round size="small" style="margin: 1rem 0.5rem;" @click="reverseOperation" type="primary">
            撤销
        </van-button>
        <van-cell-group>
            <van-cell v-for="(item, key) in tableData" :key="key" :title="item.name" :value="item.price"
                :label="item.date" />
        </van-cell-group>
        <van-button round size="small" style="margin: 1rem 0.5rem;" @click="save" type="primary">
            保存
        </van-button>
        <van-popup round v-model="showPopUp" get-container="body" class="pop-up-form">
            <h3 style="margin: 1rem 1rem">添加记录</h3>
            <van-form @submit="onSubmit">
                <van-field v-model="model.name" name="物品名" label="物品名" placeholder="物品名"
                    :rules="[{ required: true, message: '物品名' }]" />
                <van-field v-model="model.price" name="价格" label="价格" placeholder="价格"
                    :rules="[{ required: true, message: '请填写价格' }]" />
                <van-field v-model="model.date" name="日期" label="日期" placeholder="日期"
                    :rules="[{ required: true, message: '请填写日期' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
export default {
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
    data() {
        return {
            tableData: [],
            showPopUp: false,
            model: {
                userid: Number(localStorage.getItem('userId')),
                name: '',
                price: '',
                date: ''
            }
        }
    },
    methods: {
        async save() {
            const res = await this.$http.put(`account/save/${localStorage.getItem('userId')}`)
            if (res.data.code == 200) {
                this.$toast.success('保存成功')
            }
        },
        async onSubmit() {
            this.tableData.push(this.model)
            const res = await this.$http.put(`account/insert`, this.tableData)
            if (res.data.code == 200) {
                this.$toast.success('成功')
                this.showPopUp = false
            }
        },
        async reverseOperation() {
            // console.log('进入reverse');
            await this.$http.get(`account/good/previous/${localStorage.getItem('userId')}`).then(res => {
                console.log(res);
                if (res.data.code == 200) {
                    this.tableData = res.data.data
                }
                else {
                    this.$toast.fail('失败！')
                }
            }).catch(e => {
                this.$toast.fail('失败！')
            })

        },
    },
}
</script>

<style scoped>
.pop-up-form {
    padding-top: 1rem;
    width: 85%;
    height: auto;
}
</style>