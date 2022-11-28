<template>
    <div>
        <van-cell-group>
            <van-field v-model="model.username" :disabled="!isEdit" label="姓名" placeholder="请输入用户名" />
            <van-field v-model="model.telenum" :disabled="!isEdit" type="tel" label="电话" placeholder="请输入电话" />
            <van-field v-model="model.sex" :disabled="!isEdit" label="性别" placeholder="请输入性别" />
            <van-field style="margin-bottom: .7692rem" :disabled="!isEdit" v-model="model.birthday" label="生日"
                placeholder="请输入生日" />
            <van-row type="flex" justify="center">
                <van-button plain round type="primary" @click="isEdit = true">编辑</van-button>
                <div style="width: 15%"></div>
                <van-button round plain type="primary" @click="save()">保存</van-button>
            </van-row>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: 'me',
    async created() {
        const res = await this.$http.get(`info/${localStorage.getItem('userId')}`)
        console.log(res.data);
        this.model = res.data.data
    },
    data() {
        return {
            isEdit: false,
            model: {
                username: '',
                sex: '',
                birthday: '',
                telenum: ''
            }
        }
    },
    methods: {
        formatDate(date) {
            return `${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirm(date) {
            this.showCalendar = false;
            this.model.birthday = this.formatDate(date);
        },
        async save() {
            const res = await this.$http.put('info/update', this.model).then(res => {
                console.log(res.data.code);
                if (res.data.code === 200) {
                    this.$toast.success("保存成功")
                    this.isEdit = false
                }
            }).catch(e => {
                this.$toast.fail("检查输入")
            })

        }
    },
}
</script>

<style>

</style>