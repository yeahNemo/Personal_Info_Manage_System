<template>
    <div class="main-container">
        <h2 style="color:blueviolet">提醒事项</h2>
        <div @click="(showPopUp = true)" style="display: flex;align-items: center;">
            <van-icon name="add" color="#8a2be2" size="1.5rem"></van-icon>
            <p style="color:blueviolet">&nbsp;&nbsp;&nbsp;添加</p>
        </div>
        <van-cell-group>
            <transition-group name='fade' enter-active-class="fadeInLeft" leave-active-class="fadeOutRight">

                <div v-for="item in todoList" :key="item.id"
                    style="display:flex; align-items: center; margin-left: 2px;">
                    <label class="container">
                        <input type="checkbox" :checked="item.finished == 0 ? false : true"
                            @click="select(item, $event)">
                        <div class="checkmark"></div>
                    </label>
                    <van-cell :class="item.finished == 1 ? 'content-grey' : 'content-black'" :title="item.plan"
                        :label="item.startDate + '~' + item.endDate">
                        <template #right-icon>
                            <van-icon @click="delTodo(item.id)" class="cancel-icon" size="0.5rem" name="cross" />
                        </template>
                    </van-cell>
                </div>
            </transition-group>
        </van-cell-group>
        <van-popup round v-model="showPopUp" get-container="body" class="pop-up-form">
            <h3 style="margin: 1rem 1rem">添加</h3>
            <van-form validate-first @submit="onSubmit">
                <van-field v-model="model.plan" name="plan" label="内容" placeholder="在这里输入"
                    :rules="[{ required: true, message: '请填写内容' }]" />
                <van-field v-model="model.startDate" name="startDate" label="开始时间" placeholder="开始时间"
                    :rules="[{ message: '请填写开始时间' }]" />
                <van-field v-model="model.endDate" name="endDate" label="结束时间" placeholder="结束时间"
                    :rules="[{ required: true, message: '请填写结束时间' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </van-popup>

    </div>
</template>

<script>
export default {
    name: 'todo',
    async created() {
        const res = await this.$http.get(`schedule/getAll/${localStorage.getItem('userId')}`)
        console.log(res);
        this.todoList = res.data.data
    },
    data() {
        return {
            showPopUp: false,
            todoList: [],
            model: {
                'endDate': '',
                'finished': 0,
                'plan': '',
                'startDate': '',
                'userId': localStorage.getItem('userId')
            }
        }
    },
    methods: {
        async delTodo(todoId) {
            await this.$http.delete(`schedule/delete/${todoId}`).then(res => {
                console.log(res);
                this.todoList = this.todoList.filter(item => item.id !== todoId)
            }).catch(err => {
                console.log(err);
                this.$toast.fail('出错！')
            })
        },
        async onSubmit() {
            const res = await this.$http.put('schedule/insert', this.model).then(res => {
                console.log(res);
                this.todoList.push(res.data.data)
                this.$toast.success('成功！')
                this.showPopUp = false
            }).catch(e => {
                this.$toast.fail('内容格式！')
            })
        },
        async select(item, e) {
            console.log(item);
            if (e.target.checked == true) {
                item.finished = 1
            } else {
                item.finished = 0
            }
            const res = await this.$http.put('schedule/update', item)
            console.log(res);
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

.content-grey {
    transition: 1s;
    color: rgb(205, 205, 205);
}

.content-black {
    transition: 1s;
    color: black;
}

.main-container {
    padding: 0 1rem;
}


/* Hide the default checkbox */
.container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.container {
    display: block;
    position: relative;
    cursor: pointer;
    font-size: 1rempx;
    user-select: none;
}

/* Create a custom checkbox */
.checkmark {
    position: relative;
    top: 0;
    left: 0;
    height: 1.3em;
    width: 1.3em;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 25px;
    transition: 0.15s;
}

/* When the checkbox is checked, add a blue background */
.container input:checked~.checkmark {
    background-color: blueviolet;
    border-radius: 25px;
    transition: 0.15s;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.container input:checked~.checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
    left: 0.45em;
    top: 0.25em;
    width: 0.25em;
    height: 0.5em;
    border: solid white;
    border-width: 0 0.15em 0.15em 0;
    transform: rotate(45deg);
}
</style>