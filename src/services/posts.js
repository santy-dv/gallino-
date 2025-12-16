import { supabase } from "./supabase";



/**

 * * @param {string} userId

 * @param {string} content

 */

export async function createPost(userId, content) {

    const { error } = await supabase

        .from('posts')

        .insert({

            user_id: userId,

            content: content,

        });

   

    if(error) {

        console.error('[posts.js createPost] Error al crear la publicación: ', error);

        throw new Error(error.message);

    }



    return true;

}



// NUEVA FUNCIÓN para traer todas las publicaciones.

export async function fetchAllPosts() {

    // Usamos 'select' con una notación de unión (join) para traer datos

    // de la tabla 'user_profiles' (como 'email' y 'display_name')

    const { data, error } = await supabase

        .from('posts')

        .select(`

            id,

            created_at,

            content,

            user_id,

            user_profiles (

                email,

                display_name

            )

        `)

        // Ordenamos por fecha de creación descendente para ver lo más nuevo primero

        .order('created_at', { ascending: false });

       

    if(error) {

        console.error('[posts.js fetchAllPosts] Error al traer las publicaciones: ', error);

        throw new Error(error.message);

    }



    // Aplanamos el objeto para facilitar el uso en la vista

    return data.map(post => ({

        ...post,

        user_email: post.user_profiles?.email || 'Usuario desconocido',

        user_display_name: post.user_profiles?.display_name || null,

        user_profiles: undefined,

    }));

}// ... (código existente de createPost y fetchAllPosts)



/**

 * Trae todas las publicaciones creadas por un ID de usuario específico.

 * * @param {string} userId El ID del usuario.

 */

export async function fetchPostsByUserId(userId) {

    const { data, error } = await supabase

        .from('posts')

        .select(`

            id, 

            created_at, 

            content,

            user_id

        `)

        // Filtra para que solo traiga publicaciones donde user_id sea igual a userId

        .eq('user_id', userId) 

        .order('created_at', { ascending: false }); 

        

    if(error) {

        console.error('[posts.js fetchPostsByUserId] Error al traer las publicaciones del usuario: ', error);

        throw new Error(error.message);

    }



    return data;

}