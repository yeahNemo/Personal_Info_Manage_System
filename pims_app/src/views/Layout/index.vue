<template>
    <div>
        <van-nav-bar title="个人信息管理">
        </van-nav-bar>
        <keep-alive>
            <router-view style="padding-bottom: 50px" />
        </keep-alive>
        <div class="footer">
            <van-tabbar v-model="tabbarActive">
                <van-tabbar-item icon="home-o" to="/main/home">我的</van-tabbar-item>
                <van-tabbar-item icon="setting-o" to="/main/function">功能</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabbarActive: 0
        }
    },
}
</script>

<style>

</style>