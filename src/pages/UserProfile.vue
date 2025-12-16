<script setup>
import AppH1 from '../components/AppH1.vue';
import { onMounted, ref } from 'vue'; // Importamos ref y onMounted
import { useRoute } from 'vue-router';
import AppLoading from '../components/AppLoading.vue';
import { getFileURL } from '../services/storage';
import useUserProfile from '../componsables/useUserProfile';
import { fetchPostsByUserId } from '../services/posts'; // Importamos la nueva función

const route = useRoute();
const userId = route.params.id; // Obtenemos el ID del usuario de la ruta

const { user, loading } = useUserProfile(userId);

// Estado para manejar las publicaciones del usuario
const userPosts = ref([]);
const loadingPosts = ref(true);

onMounted(async () => {
    try {
        userPosts.value = await fetchPostsByUserId(userId);
    } catch (error) {
        console.error("Error fetching user posts:", error);
    } finally {
        loadingPosts.value = false;
    }
});
</script>

<template>
    <template v-if="!loading">
        <div class="flex gap-4">
            <div class="w-1/2">
                <div class="flex gap-4 items-end">
                    <AppH1>Perfil de {{ user.email }}</AppH1>
                </div>

                <div class="ms-4 my-6 text-gray-500 italic">{{ user.bio ?? 'Sin biografía...' }}</div>

                <dl class="mb-4 text-blue-100">
                    <dt class="font-bold">Email</dt>
                    <dd class="mb-2">{{ user.email }}</dd>
                    <dt class="font-bold">Nombre</dt>
                    <dd class="mb-2">{{ user.display_name ?? 'Sin especificar...' }}</dd>
                    <dt class="font-bold">Carrera</dt>
                    <dd class="mb-2">{{ user.career ?? 'Sin especificar...' }}</dd>
                </dl>
            </div>
            <div class="w-1/2">
                <img
                    v-if="user.photo_url !== null"
                    :src="getFileURL(user.photo_url)"
                    alt=""
                    class="max-w-25 rounded-full"
                />
            </div>
        </div>

        <hr class="my-6">
        
        <section>
            <h2 class="mb-4 text-2xl font-bold text-blue-100">Publicaciones de {{ user.display_name ?? user.email }}</h2>

            <div v-if="loadingPosts">
                <AppLoading />
            </div>

            <ol v-else-if="userPosts.length > 0" class="flex flex-col gap-4">
                <li
                    v-for="post in userPosts"
                    :key="post.id"
                    class="p-3 border border-gray-200 rounded bg-gray-50"
                >
                    <div class="text-md mb-2">{{ post.content }}</div>
                    <div class="text-xs text-gray-500">Publicado el {{ new Date(post.created_at).toLocaleString() }}</div>
                </li>
            </ol>
            <p v-else class="text-gray-600">Este usuario aún no tiene publicaciones.</p>

        </section>

        <hr class="my-6">

        <RouterLink
            class="text-blue-500 underline font-semibold"
            :to="`/usuario/${user.id}/chat`"
        >
            Iniciar conversación privada con {{ user.email }}
        </RouterLink>
    </template>
    <template v-else>
        <AppLoading />
    </template>
</template>