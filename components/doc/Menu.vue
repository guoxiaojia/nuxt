<template>
    <ul class="nav">
        <router-link v-for="(item, i) in nav" :key="i" :to="item.path" tag="li">
            <i :class="item.icon"></i>{{ item.name }}
        </router-link>
    </ul>
</template>

<script>
    export default {
        data() {
            return {
                nav: [
                    {
                        name: '编辑资料',
                        path: '/user',
                        icon: 'el-icon-edit-outline'
                    },
                    {
                        name: '文章',
                        path: '/user/essay',
                        icon: 'el-icon-tickets'
                    },
                    {
                        name: '评论',
                        path: '/user/comment',
                        icon: 'el-icon-printer'
                    },
                    {
                        name: '收藏列表',
                        path: '/user/collect',
                        icon: 'el-icon-star-on'
                    },
                    {
                        name: '点赞列表',
                        path: '/user/like',
                        icon: 'el-icon-third-haopingdianzan'
                    },
                    {
                        name: '关注列表',
                        path: '/user/focus',
                        icon: 'el-icon-third-guanzhu'
                    },
                    {
                        name: '粉丝列表',
                        path: '/user/fans',
                        icon: 'el-icon-third-icon_concern'
                    },
                    {
                        name: '消息列表',
                        path: '/user/message',
                        icon: 'el-icon-message'
                    },
                    {
                        name: '设置',
                        path: '/user/set',
                        icon: 'el-icon-setting'
                    }
                ]
            }
        }
    }
</script>
