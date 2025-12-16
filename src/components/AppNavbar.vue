<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { logout, subscribeToAuthState } from '../services/auth';

// Obtenemos el router a través del composable useRouter.
const router = useRouter();

// Datos del usuario autenticado.
const user = ref({
    id: null,
    email: null,
});

onMounted(() => {
    // Nos suscribimos al estado de autenticación.
    subscribeToAuthState(newUserData => user.value = newUserData);
});

function handleLogout() {
    logout();

    // Redireccionamos al login.
    router.push('/ingresar');
}
</script>

<template>
    <nav class="flex gap-8 p-4 bg-slate-900 items-center justify-center text-blue-50">
        <RouterLink class="text-xl" to="/">DV Social</RouterLink>

        <ul class="flex gap-4 space-x-4">
            <li>
                <RouterLink to="/" class="hover:bg-white/5 p-2 rounded-md">Feed</RouterLink>
            </li>
            <template v-if="user.id === null">
                <li>
                    <RouterLink to="/ingresar" class="hover:bg-white/5 p-2 rounded-md">Ingresar</RouterLink>
                </li>
                <li>
                    <RouterLink to="/crear-cuenta" class="hover:bg-white/5 p-2 rounded-md">Crear cuenta</RouterLink>
                </li>
            </template>
            <template v-else>
                <li>
                    <RouterLink to="/crear-publicacion">Crear publicación</RouterLink>
                </li>
                <li>
                    <RouterLink to="/chat">Chat</RouterLink>
                </li>
                <li>
                    <RouterLink to="/chat" class="hover:bg-white/5 p-2 rounded-md">Chat</RouterLink>
                </li>
                <li>
                    <RouterLink to="/mi-perfil" class="hover:bg-white/5 p-2 rounded-md">Mi perfil</RouterLink>
                </li>
                <li>
                    <form 
                        action="#"
                        @submit.prevent="handleLogout"
                    >
                        <button type="submit">{{ user.email }} (Cerrar sesión)</button>
                    </form>
                </li>
            </template>
        </ul>
    </nav>
</template>