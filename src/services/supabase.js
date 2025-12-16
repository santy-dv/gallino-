// Este servicio instancia la conexión con Supabase y la exporta.
import { createClient } from '@supabase/supabase-js';

// Preparamos las credenciales de nuestro backend.
const supabaseUrl ='https://irlbhgrbgprpzcpbvzrd.supabase.co'
 ;
const supabaseKey = "sb_publishable_0NgeI1uK8J4mzaHVWVA-ig_9fqyl7jP";

// Creamos la instancia del cliente de Supabase, y la exportamos.
export const supabase = createClient(supabaseUrl, supabaseKey);