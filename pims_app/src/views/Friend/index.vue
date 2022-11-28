<template>
    <div>
        <div>
            <van-button class="my-btn" style="margin: 1rem 1rem" type="primary"
                @click="showPopUp = true; model = $options.data().model">添加
            </van-button>
        </div>
        <transition-group name="fade" enter-active-class="fadeInLeft" leave-active-class="fadeOutRight">
            <van-cell-group inset v-for="item in tableData" :key="item.id">
                <van-cell title="姓名" :value="item.name" />
                <van-cell title="电话" :value="item.telenum" />
                <van-cell title="备注" :value="item.detail" />
                <van-cell>
                    <div style="display:flex; justify-content: flex-end;">
                        <van-button style="font-size:8px; height: 30px; margin: 0 1rem;" plain type="info"
                            @click="isEdit = true; showPopUp = true; model = item">编辑</van-button>
                        <van-button style="font-size:8px; height: 30px;" plain type="info" @click="delBtn(item)">删除
                        </van-button>
                    </div>
                </van-cell>
            </van-cell-group>
        </transition-group>
        <van-popup round v-model="showPopUp" get-container="body" class="pop-up-form">
            <h3 style="margin: 1rem 1rem">{{ isEdit ? '编辑' : '添加' + '联系人' }}</h3>
            <van-form @submit="onSubmit">
                <van-field v-model="model.name" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="model.telenum" name="电话" label="电话" placeholder="电话"
                    :rules="[{ required: true, message: '请填写电话' }]" />
                <van-field v-model="model.detail" name="备注" label="备注" placeholder="备注"
                    :rules="[{ required: true, message: '请填写备注' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'friend',
    async created() {
        // res = await this.$http.get('address/getAll/' + localStorage.getItem('userName'))
        const res = await this.$http.get('address/getAll/' + localStorage.getItem('userId'))
        console.log(res);
        this.tableData = res.data.data
    },
    data() {
        return {
            tableData: [],
            showPopUp: false,
            model: {
                userId: localStorage.getItem('userId'),
                name: '',
                telenum: '',
                detail: ''
            },
            // 判断是编辑还是添加联系人
            isEdit: false,
        }
    },
    methods: {
        async delBtn(obj) {
            const res = await this.$http.delete('address/' + obj.id).then(res => {
                console.log(res);
                this.tableData = this.tableData.filter((item) => { return item.id !== obj.id })
                this.$toast.success('成功')
            }).catch(e => {
                this.$toast.fail('出错')
            })
        },
        async onSubmit() {
            if (!this.isEdit) {
                const res = await this.$http.put('address/insert', this.model).then(res => {
                    console.log(res);
                    this.showPopUp = false
                    this.tableData.push(res.data.data)
                    this.$toast.success('成功')
                    // 重置addForm data内容
                    this.model = this.$options.data().model
                }).catch(e => {
                    this.$toast.fail('出错')
                })
            } else {
                // 修改联系人API
                // console.log(this.model);
                const res = await this.$http.put('address/update', this.model).then(res => {
                    // console.log(res);
                    this.showPopUp = false
                    this.$toast.success('成功')
                    // 重置addForm data内容
                    this.model = this.$options.data().model
                }).catch(e => {
                    this.$toast.fail('出错')
                })

            }
        }
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