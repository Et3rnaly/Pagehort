# Configuração do Supabase

Este projeto usa Supabase para banco PostgreSQL, autenticação do painel admin e storage das imagens dos produtos.

## 1. Criar projeto

1. Crie uma conta em https://supabase.com.
2. Crie um novo projeto.
3. No painel do projeto, abra **Project Settings > API**.
4. Copie:
   - Project URL
   - Publishable key

## 2. Configurar ambiente local

1. Crie um arquivo `.env.local` na raiz a partir de `.env.example`.
2. Preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# Fallback opcional para projetos antigos:
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Nunca use `secret key` ou `service_role key` no front-end ou neste repositório.

## 3. Criar tabela e policies

1. No Supabase, abra **SQL Editor**.
2. Rode o arquivo `supabase/schema.sql`.
3. Depois, rode `supabase/seed.sql` para carregar o catálogo inicial atual.

O painel não libera acesso apenas por login. Além de existir no Supabase Auth, o usuário precisa estar cadastrado em `public.admin_users` com `active = true`.

## 4. Criar bucket de imagens

1. Abra **Storage**.
2. Crie um bucket chamado `product-images`.
3. Marque o bucket como público para leitura.
4. Use o caminho padrão preparado no código: `products/{slug}-{timestamp}.{ext}`.

As policies do bucket estão no `supabase/schema.sql`: leitura pública e escrita apenas para admin ativo.

## 5. Criar usuário admin

1. Abra **Authentication > Users**.
2. Clique em **Add user**.
3. Crie um usuário com e-mail e senha.
4. Copie o `User UID` criado.
5. No **SQL Editor**, cadastre esse usuário como admin:

```sql
insert into public.admin_users (user_id, role, active)
values ('COLE_O_USER_UID_AQUI', 'owner', true);
```

6. Use esse e-mail e senha em `/admin/login`.

Para criar outro admin:

```sql
insert into public.admin_users (user_id, role, active)
values ('USER_UID_DO_NOVO_ADMIN', 'admin', true);
```

Para desativar um admin sem apagar o usuário:

```sql
update public.admin_users
set active = false
where user_id = 'USER_UID_DO_ADMIN';
```

Para reativar:

```sql
update public.admin_users
set active = true
where user_id = 'USER_UID_DO_ADMIN';
```

Usuários autenticados que não estiverem ativos em `admin_users` serão bloqueados no painel.

## 6. Rodar localmente

```bash
npm run dev
```

Acesse:

- Site público: `http://localhost:3000`
- Login admin: `http://localhost:3000/admin/login`
- Produtos admin: `http://localhost:3000/admin/produtos`

## 7. Testes manuais recomendados

1. Faça login em `/admin/login`.
2. Crie um produto em `/admin/produtos/novo`.
3. Edite o preço de um produto existente.
4. Marque um produto como indisponível e recarregue a home.
5. Marque um produto como destaque e confira o selo no card público.
6. Faça upload de imagem JPG, JPEG, PNG ou WEBP.
7. Tente acessar `/admin/produtos` em janela anônima e confirme o redirecionamento para login.
8. Crie um usuário autenticado sem registro em `admin_users`, tente entrar no painel e confirme a mensagem de falta de permissão.
9. Desative um admin com `active = false`, tente acessar `/admin/produtos` e confirme o bloqueio.

## 8. Fallback da home

A home tenta carregar produtos ativos do Supabase. O fallback usa `src/constants/products.ts` apenas nestes casos:

- `NEXT_PUBLIC_SUPABASE_URL` ou uma chave publica (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` ou legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY`) nao foram configuradas.
- A consulta ao Supabase falhou por erro de conexão ou erro retornado pela API.

Se o Supabase estiver configurado e retornar uma lista vazia, o site respeita a lista vazia como estado real do catálogo. Isso evita mascarar um catálogo intencionalmente vazio no painel.

## Categorias e seções públicas

Para preservar os carrosséis atuais sem criar uma coluna extra, o site usa `category` como slug da seção pública. Exemplos:

- `combos`
- `frutas`
- `legumes-verduras`
- `folhas-temperos`
- `prontos-processados`
- `congelados-proteinas`
- `polpas-cremes`
- `ovos`
- `mercearia`
- `bebidas`
- `padaria`
- `churrasco`

Categorias novas também aparecem na home, em seções adicionais, usando o nome derivado do slug.
