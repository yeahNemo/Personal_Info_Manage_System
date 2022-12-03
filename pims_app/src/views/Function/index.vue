<template>
    <div>
        <van-tabs v-model="tabbarActive" animated swipeable>
            <van-tab title="备忘录">
                <memo />
            </van-tab>
            <van-tab title="任务">
                <todo />
            </van-tab>
            <van-tab title="财务">
                <account />
            </van-tab>
            <van-tab title="报表">
                <div>
                    <h1>个人报表下载</h1>
                    <van-button type="primary" style="width: 15rem; margin:1rem 4rem"
                        @click="download">点击下载</van-button>
                </div>
            </van-tab>
        </van-tabs>
    </div>

</template>

<script>
import memo from '../Memo';
import todo from '../TodoList';
import account from '../Account'
export default {
    components: {
        memo,
        todo,
        account
    },
    data() {
        return {
            tabbarActive: 0
        };
    },
    methods: {
        download() {
            window.open(
                'http://localhost:8081/info/export'
            );
        }
    },
}
</script>

<style>

</style>