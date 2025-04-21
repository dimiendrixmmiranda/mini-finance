# 🛍️ Sistema de Gestão de Vendas - Fanaticos

Este é um sistema completo para gerenciamento de **produtos**, **vendas** e **despesas**, com **dashboard interativo** e suporte a múltiplos usuários autenticados. Ideal para lojas e pequenos negócios que desejam controlar seu fluxo financeiro e acompanhar o desempenho de vendas.

## 🚀 Funcionalidades

- ✅ Cadastro e login de usuários com Firebase Authentication
- 🛒 Cadastro de produtos
- 💰 Registro de vendas com data, valor e produto relacionado
- 📉 Registro de despesas com categorias
- 📊 Dashboard com gráficos:
  - Vendas mensais
  - Lucro mensal
  - Despesas por categoria
  - Produtos mais vendidos
  - Tamanhos mais vendidos

## 🧠 Tecnologias

- [Next.js 13+](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase (Auth + Realtime Database)](https://firebase.google.com/)
- [Recharts](https://recharts.org/) para gráficos
- [TypeScript](https://www.typescriptlang.org/)
- [PrimeReact](https://primereact.org/) (em algumas interfaces)
- Sistema protegido com `ForcarAutenticacao` (middleware de rota segura)

## 📂 Estrutura de Telas

- `/login`: Tela de login
- `/cadastro`: Cadastro de novos usuários
- `/dashboard`: Visualização de gráficos
- `/cadastro-produto`: Formulário para novo produto
- `/cadastro-venda`: Registro de uma venda
- `/cadastro-despesa`: Registro de uma despesa
- Componentes gráficos reutilizáveis usando generics

## 📈 Exemplo de gráficos utilizados

- Gráfico de **Pizza** (produtos mais vendidos, tamanhos mais vendidos)
- Gráfico de **Barras** (vendas mensais)
- Gráfico de **Linha** (lucro por mês)

## 🛠️ Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo

2. Instale as Dependências:
   ```bash
   npm i

3. Configure suas credenciais do Firebase no arquivo .env.local:
   ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_DATABASE_URL=...

4. Inicie o servidor de desenvolvimento:
   ```bash
    npm run dev


## 🔒 Autenticação

O sistema é protegido por um componente ForcarAutenticacao, que bloqueia o acesso de usuários não autenticados e redireciona para o login.

### Projeto desenvolvido por Dimi Endrix Martins Miranda como parte da avaliação da disciplina Administração e Economia para Engenheiros.