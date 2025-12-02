<template>
    <div class="visitor-badge-container">
        <!-- 简单badge方式:直接嵌入访问统计图片 -->
        <img
            :src="badgeUrl"
            alt="访问统计"
            class="visitor-badge"
            loading="lazy"
        />
    </div>
</template>

<script setup lang="ts">
interface Props {
    // badge样式: 'default', 'flat', 'flat-square', 'plastic'
    style?: 'default' | 'flat' | 'flat-square' | 'plastic'
    // 颜色主题
    color?: string
    // 自定义页面ID(默认使用当前路由)
    pageId?: string
}

const props = withDefaults(defineProps<Props>(), {
    style: 'flat',
    color: '0088cc',
    pageId: ''
})

const route = useRoute()

// 生成badge URL
const badgeUrl = computed(() => {
    // 使用props.pageId或当前路由作为唯一标识
    const id = props.pageId || `nuxt4-project${route.path}`
    const encodedId = encodeURIComponent(id)

    // 使用visitor-badge服务
    return `https://visitor-badge.laobi.icu/badge?page_id=${encodedId}&format=svg&color=${props.color}&style=${props.style}`
})
</script>

<style scoped>
.visitor-badge-container {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.visitor-badge {
    height: 20px;
    vertical-align: middle;
}
</style>
