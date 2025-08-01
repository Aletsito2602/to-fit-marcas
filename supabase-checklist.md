# 🔧 CHECKLIST CONFIGURACIÓN SUPABASE

## 1. Authentication Settings (CRÍTICO)

Ve a **Authentication > Settings** en el dashboard de Supabase y verifica:

### General Settings
- [ ] **Site URL**: `http://localhost:5173` (para desarrollo)
- [ ] **User Signups**: **ENABLED** ✅
- [ ] **Enable email confirmations**: **DISABLED** ❌ (importante para pruebas)
- [ ] **Enable phone confirmations**: **DISABLED** ❌

### Email Templates
- [ ] **Confirm signup**: Puede estar habilitado
- [ ] **Magic Link**: Puede estar habilitado  
- [ ] **Change Email Address**: Puede estar habilitado

### Security Settings
- [ ] **Enable Secure Email Change**: Puede estar deshabilitado para pruebas

## 2. Project Settings

Ve a **Settings > General**:
- [ ] **Project Name**: ToFit (o como lo hayas nombrado)
- [ ] **Organization**: Activa
- [ ] **Plan**: Free tier está bien

## 3. Database Settings

Ve a **Settings > Database**:
- [ ] **Database Status**: Healthy ✅
- [ ] **Connection Pool**: Active

## 4. API Settings

Ve a **Settings > API**:
- [ ] **Project URL**: `https://zfjowsanrhhwioqavpdf.supabase.co`
- [ ] **anon/public key**: Existe y coincide con tu .env
- [ ] **service_role key**: Existe (no uses en frontend)

## 5. Troubleshooting Específico

### Si el error persiste:

1. **Crear un proyecto completamente nuevo**:
   - Ve a dashboard.supabase.com
   - "New Project"
   - Usa las credenciales del nuevo proyecto

2. **Verificar en Authentication > Users**:
   - ¿Hay usuarios existentes?
   - ¿Aparecen errores en la consola?

3. **Probar registro básico**:
   - Email simple: `test@test.com`
   - Contraseña: `123456789`
   - Sin caracteres especiales

## 6. Script de Emergencia

Si nada funciona, ejecuta esto para resetear completamente:

```sql
-- RESETEAR TODO (CUIDADO - ELIMINA DATOS)
DROP TABLE IF EXISTS public.users CASCADE;
-- Y luego ejecutar solo el script básico de Supabase sin triggers
```

## 7. Alternativa Temporal

Podemos deshabilitar el registro por ahora y crear usuarios manualmente:

```sql
INSERT INTO auth.users (
  id,
  email, 
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@tofit.com',
  crypt('123456789', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

## ❗ ACCIÓN INMEDIATA

**Ve al Dashboard de Supabase** y verifica especialmente:
- Authentication > Settings > **"Enable email confirmations" = OFF**
- Authentication > Settings > **"User Signups" = ON**

Si esas configuraciones están mal, el registro fallará siempre.