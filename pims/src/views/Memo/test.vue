<template>
    <div>
        <div class="context" v-html="compiledMarkdown"></div>
    </div>
</template>
  
<script>
import { marked } from "marked";
export default {
    name: "index",
    data() {
        return {
            articleDetail: {
                context: marked("<h1>你好</h1>")
            }, //数据，可以从数据库中读取
        };
    },
    computed: {
        compiledMarkdown() {
            return marked.parse(this.articleDetail.context);
        },
    },
};
</script>
  
<style scoped>

</style>
  
  