<script setup>
import { onMounted, ref } from 'vue';
import AppH1 from '../components/AppH1.vue';
import AppLoading from '../components/AppLoading.vue';
import { fetchAllPosts } from '../services/posts'; // Importamos la nueva función

const posts = ref([]);
const loading = ref(true);

// Cuando el componente se monta, cargamos las publicaciones
onMounted(async () => {
    try {
        posts.value = await fetchAllPosts();
    } catch (error) {
        console.error("Error fetching posts:", error);
        // TODO: Mostrar feedback de error
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <AppH1>Publicaciones de DV Social</AppH1>

    <div v-if="loading">
        <AppLoading />
    </div>

    <ol 
        v-else-if="posts.length > 0"
        class="flex flex-col items-stretch gap-6"
    >
        <li
            v-for="post in posts"
            :key="post.id"
            class="p-4 border border-gray-300 rounded shadow-md bg-white"
        >
            <div class="mb-2 text-sm text-gray-600">
                Publicado por: 
                <RouterLink
                    :to="`/usuario/${post.user_id}`"
                    class="font-bold text-blue-700 underline"
                >
                    {{ post.user_display_name ?? post.user_email }}
                </RouterLink>
            </div>
            <div class="text-lg mb-3 text-blue-50">{{ post.content }}</div>
            <div class="text-xs text-gray-400">{{ new Date(post.created_at).toLocaleString() }}</div>
        </li>
    </ol>

    <p v-else>No hay publicaciones para mostrar. ¡Sé el primero en publicar algo!</p>
</template>