<template>
    <div>
        <van-tabs v-model="tabbarActive" animated swipeable>
            <van-tab title="信息">
                <me></me>
            </van-tab>
            <van-tab title="好友">
                <friend></friend>
            </van-tab>
        </van-tabs>
    </div>

</template>

<script>
import me from '../Me'
import friend from '../Friend'
export default {
    components: {
        me,
        friend
    },
    data() {
        return {
            tabbarActive: 0,
            activeName: 0
        };
    },
}
</script>

<style>

</style>