<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppH1 from '../components/AppH1.vue';
import AppButton from '../components/AppButton.vue';
import AppLoading from '../components/AppLoading.vue';
import useAuthState from '../componsables/useAuthState';
import { createPost } from '../services/posts';

const router = useRouter();
const { user } = useAuthState();

const { postForm, loading, handleSubmit } = useNewPostForm(user, router);

function useNewPostForm(user, router) {
    const loading = ref(false);
    const postForm = ref({
        content: '',
    });

    async function handleSubmit() {
        try {
            if(loading.value) return;

            loading.value = true;
            
            if (user.value.id === null) {
                console.error("Usuario no autenticado, no se puede crear la publicación.");
                return;
            }
            
            if (postForm.value.content.trim() === '') {
                // Validación básica para contenido no vacío
                console.warn('El contenido de la publicación no puede estar vacío.');
                loading.value = false;
                return;
            }

            await createPost(
                user.value.id,
                postForm.value.content,
            );
            
            // Redirigir al feed principal (Home.vue) después de publicar
            router.push('/');
        } catch (error) {
            // TODO: Manejar el error y mostrar feedback
            console.error("Error al crear la publicación: ", error);
        } finally {
            loading.value = false;
        }
    }

    return {
        postForm,
        loading,
        handleSubmit,
    }
}
</script>

<template>
    <AppH1>Crear nueva publicación</AppH1>

    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <label for="content" class="block mb-1">Contenido de la publicación</label>
            <textarea
                id="content"
                class="w-full min-h-25 px-2 py-1 border border-gray-400 rounded read-only:bg-gray-200"
                :readonly="loading"
                v-model="postForm.content"
                rows="5"
            ></textarea>
        </div>
        <AppButton type="submit" :loading="loading">
            <template v-if="!loading">
                Publicar
            </template>
            <AppLoading v-else />
        </AppButton>
    </form>
</template>