<template>
    <el-container style="height: 100vh">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>个人信息管理</template>
                    <el-menu-item-group>
                        <template slot="title">功能</template>
                        <el-menu-item index="/home/me">基本信息管理</el-menu-item>
                        <el-menu-item index="/home/friend">
                            通讯录好友
                        </el-menu-item>

                        <el-menu-item index="/home/memo">备忘录管理</el-menu-item>
                        <el-menu-item index="/home/todo">任务计划管理</el-menu-item>

                        <el-menu-item index="/home/account">个人财务管理</el-menu-item>
                        <el-menu-item @click="toDownload">
                            个人报表下载
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <span>{{ userName }}</span>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    created() {
        this.userName = localStorage.getItem('userName')
    },
    data() {
        return {
            userName: 'zjz'
        }
    },
    methods: {
        toDownload() {
            window.open(
                'http://localhost:8081/info/export'
            );
        }
    },
};
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    color: #333;
}
</style>
