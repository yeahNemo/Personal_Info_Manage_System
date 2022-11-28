<template>
    <div>
        <van-button @click="addBtn" class="my-btn" round type="primary">
            <van-icon size="1rem" :name="addBtnIcon" />
        </van-button>
        <transition name="fade" enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
            <div style="margin: 1rem 0; position: fixed;" v-if="showEditor">
                <vue-editor v-model="model.detail"></vue-editor>
                <van-button @click="addMemo" class="my-btn" round type="info">
                    <van-icon size="1rem" name="success" />
                </van-button>
            </div>
        </transition>
        <div :class="cardGroupClass">
            <transition-group name='fade' enter-active-class="fadeInLeft" leave-active-class="fadeOutRight">
                <div v-for="memo in memoList" :key="memo.id" class="memo-card">
                    <van-icon @click="delMemo(memo.id)" class="cancel-icon" size="0.5rem" name="cross" />
                    <h4>{{ memo.date }}</h4>
                    <div v-html="memo.detail"></div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { VueEditor } from 'vue2-editor'
export default {
    name: 'memo',
    components: {
        VueEditor
    },
    created() {
        this.$http.get(`memo/${localStorage.getItem('userId')}`).then(res => {
            console.log(res)
            this.memoList = res.data.data
        })
    },
    data() {
        return {
            addBtnIcon: 'plus',
            memoList: [],
            showEditor: false,
            cardGroupClass: 'card-group-plus',
            model: {
                date: "",
                detail: "",
                userId: localStorage.getItem('userId')
            }
        }
    },
    methods: {
        addMemo() {
            this.addBtn()
            this.model['date'] = moment(Date.parse(new Date())).format('YYYY-MM-DD')
            //api
            this.$http.put('memo/insert', this.model).then(res => {
                // 添加时间
                console.log(res)
                this.memoList.push(res.data.data)
                // 重置addForm
                this.model = this.$options.data().model
            })
        },
        addBtn() {
            if (this.addBtnIcon == 'plus') {
                this.showEditor = true
                this.addBtnIcon = 'cross'
                this.cardGroupClass = 'card-group-cross'
            } else {
                this.showEditor = false
                this.addBtnIcon = 'plus'
                this.cardGroupClass = 'card-group-plus'
            }
        },
        delMemo(memoId) {
            this.$http.delete(`memo/delete/${memoId}`).then(res => {
                console.log(res);
                this.memoList = this.memoList.filter(item => item.id !== memoId)
            }).catch(err => {
                console.log(err);
                this.$toast.fail('出错！')
            })
        },
    },

}
</script>

<style scoped>
.memo-card {
    margin: 1rem 2rem;
    padding: 1rem 1rem;
    border-radius: 0.4rem;
    box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.card-group-plus {
    transition: 0.8s;
    margin-top: 0;
}

.card-group-cross {
    transition: 0.8s;
    margin-top: 24.8718rem;
}
</style>