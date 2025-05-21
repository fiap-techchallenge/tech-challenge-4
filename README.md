# Tech Challenge 4 - Plataforma Educacional

## Sobre o Projeto

Este projeto é uma plataforma educacional desenvolvida com React Native e Expo, que permite a interação entre professores e alunos. A aplicação possui um sistema de autenticação, gestão de usuários e publicação de conteúdos educacionais.

A plataforma possui funcionalidades específicas para diferentes perfis de usuário:

- **Professores**: Podem criar novos posts educacionais, gerenciar suas próprias postagens, e administrar usuários da plataforma.
- **Alunos**: Podem visualizar as postagens educacionais e configurar suas próprias informações.

## Estrutura do Projeto

O projeto segue uma arquitetura moderna baseada em Expo Router, com uma organização clara de diretórios:

- `/app`: Contém as telas da aplicação organizadas por rotas
  - `/(auth)`: Telas de autenticação (login e registro)
  - `/(tabs)`: Telas principais da aplicação, acessíveis após o login
  - `/post`: Visualização detalhada de uma postagem
- `/components`: Componentes reutilizáveis (como PostCard e SearchBar)
- `/context`: Contextos de React (como o AuthContext para gerenciamento de autenticação)
- `/hooks`: Hooks personalizados para lógica de negócio (como usePosts)
- `/assets`: Recursos estáticos como imagens

## Telas e Funcionalidades

### Autenticação

- **Login**: Permite que usuários façam login com e-mail e senha
- **Registro**: Permite que novos usuários se cadastrem como professor ou aluno

### Abas Principais

- **Início**: Exibe todas as postagens disponíveis com opção de busca
- **Nova Postagem** (apenas professores): Interface para criação de novas postagens educacionais
- **Minhas Postagens** (apenas professores): Lista de postagens criadas pelo professor logado
- **Usuários** (apenas professores): Gerenciamento de usuários da plataforma
  - Visualização de todos os usuários
  - Edição de informações de professores e alunos
- **Configurações**: Permite ajustes de perfil e configurações do aplicativo

### Outras Telas

- **Visualização de Post**: Exibe o conteúdo detalhado de uma postagem específica

## Contas Demo

A aplicação possui contas de demonstração pré-configuradas:

- **Professor**:

  - E-mail: admin@example.com
  - Senha: admin123

- **Aluno**:
  - E-mail: student@example.com
  - Senha: student123

## Requisitos de Instalação

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Ambiente configurado para desenvolvimento React Native

## Passo a Passo para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/fiap-techchallenge/tech-challenge-4.git
   cd tech-challenge-4
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o projeto em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

4. O Expo abrirá uma página no navegador com um QR code. Você pode escanear este código com o aplicativo Expo Go (disponível na App Store ou Google Play) para visualizar o aplicativo em seu dispositivo móvel.

   Alternativamente, você pode executar o aplicativo em um emulador/simulador seguindo as instruções na interface do Expo.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria uma versão de produção do aplicativo
- `npm run lint`: Executa a verificação de linting
- `npm run lint:fix`: Corrige automaticamente problemas de linting

## Tecnologias Utilizadas

- React Native
- Expo (incluindo Expo Router)
- TypeScript
- React Navigation
- Zustand (para gerenciamento de estado)
- Axios (para requisições HTTP)
- Lucide React Native (para ícones)

## Estrutura de Arquivos

O projeto segue uma estrutura organizada para facilitar a manutenção e escalabilidade:

```
app/
  _layout.tsx                # Layout principal da aplicação
  +not-found.tsx             # Página 404
  (auth)/                    # Rotas de autenticação
    login.tsx                # Tela de login
    register.tsx             # Tela de registro
  (tabs)/                    # Rotas principais com navegação por abas
    _layout.tsx              # Layout das abas
    index.tsx                # Tela inicial (feed de posts)
    my-posts.tsx             # Tela de posts do professor
    new-post.tsx             # Tela de criação de posts
    settings.tsx             # Tela de configurações
    users/                   # Gerenciamento de usuários
      _layout.tsx            # Layout de usuários
      edit-student.tsx       # Edição de alunos
      edit-teacher.tsx       # Edição de professores
      index.tsx              # Lista de usuários
  post/
    [id].tsx                 # Visualização detalhada de um post
```

Este projeto foi desenvolvido como um desafio técnico e demonstra a implementação de uma aplicação educacional moderna com React Native e Expo.
