// Este servicio instancia la conexión con Supabase y la exporta.
import { createClient } from '@supabase/supabase-js';

// Preparamos las credenciales de nuestro backend.
const supabaseUrl = "https://hdmfyvciqpowpqxbvgqm.supabase.co";
const supabaseKey = "sb_publishable_Hwq61X3H45TktWLhPmzR_w_S7CI9_8k";

// Creamos la instancia del cliente de Supabase, y la exportamos.
export const supabase = createClient(supabaseUrl, supabaseKey);