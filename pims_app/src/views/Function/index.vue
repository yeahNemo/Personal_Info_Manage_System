<template>
    <div>

        <van-tabs v-model="tabbarActive" animated swipeable>
            <van-tab title="备忘录">
                <memo />
            </van-tab>
            <van-tab title="任务">
                任务
            </van-tab>
            <van-tab title="财务">
                财务
            </van-tab>
            <van-tab title="报表">
                报表
            </van-tab>
        </van-tabs>
    </div>

</template>

<script>
import memo from '../Memo';
export default {
    components: {
        memo
    },
    data() {
        return {
            tabbarActive: 0
        };
    },
}
</script>

<style>

</style>