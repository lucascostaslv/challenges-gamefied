# Plataforma Web Gamificada

## Visão Geral

Este projeto consiste em uma plataforma web gamificada, com foco em engajamento de usuários por meio de missões, pontuação, ranking, feed social e mini-jogos interativos.

A aplicação foi projetada para ser modular, escalável e visualmente atrativa, utilizando uma arquitetura moderna baseada em front-end desacoplado e API RESTful.

O objetivo principal do projeto é consolidar conhecimentos em desenvolvimento full stack, arquitetura de software e boas práticas de integração entre front-end e back-end.

---

## Arquitetura Geral

A aplicação segue uma arquitetura cliente–servidor desacoplada, composta por três camadas principais.

Front-end:
- Aplicação SPA (Single Page Application)
- Responsável pela interface do usuário, animações e execução dos mini-jogos
- Comunicação com o back-end via API REST

Back-end:
- API RESTful desenvolvida em Java
- Responsável pelas regras de negócio, autenticação, autorização e persistência de dados

Banco de Dados:
- Banco de dados relacional
- Armazena dados cadastrais, postagens, resultados de jogos, missões e pontuação

---

## Stack Tecnológica

Back-end:
- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security (JWT)
- Hibernate
- Maven ou Gradle

Front-end:
- React
- Vite
- JavaScript moderno (ES6+)
- Consumo de API via HTTP (fetch ou axios)

Banco de Dados:
- PostgreSQL
- Hospedagem via Supabase (ou equivalente)

---

## Organização do Back-end

Estrutura base do projeto:

com.projeto  
├── config  
│   └── security  
├── controller  
├── service  
├── repository  
├── domain  
├── dto  
└── exception  

Responsabilidades:
- Controller: exposição dos endpoints REST
- Service: regras de negócio
- Repository: acesso ao banco de dados
- Domain: entidades JPA
- DTO: transferência de dados
- Security: autenticação e autorização

---

## Organização do Front-end

Estrutura base sugerida:

src/  
├── pages  
├── components  
├── games  
├── services  
├── styles  
└── assets  

Diretrizes:
- Componentes reutilizáveis
- Jogos isolados em módulos próprios
- Comunicação centralizada com a API
- Forte foco em design e experiência do usuário

---

## Jogos e Gamificação

Os mini-jogos são executados exclusivamente no front-end, utilizando React, Canvas ou manipulação direta do DOM.

Fluxo básico:
1. O usuário inicia um jogo
2. O jogo roda localmente no navegador
3. Ao final, o resultado é enviado à API
4. O back-end valida e persiste os dados
5. A pontuação e o ranking são atualizados

Essa abordagem garante boa performance, simplicidade no servidor e facilidade de expansão.

---

## Autenticação e Segurança

- Autenticação baseada em JWT
- API stateless
- Controle de acesso por perfil (usuário e administrador)
- Proteção de rotas no front-end e no back-end

---

## Justificativas Técnicas

- Spring Boot: robustez, maturidade e organização
- React: flexibilidade visual e ótima integração com APIs
- PostgreSQL: confiabilidade e escalabilidade
- Arquitetura desacoplada: facilidade de manutenção e evolução do sistema

---

## Objetivos do Projeto

- Consolidar arquitetura full stack moderna
- Desenvolver um sistema gamificado funcional
- Criar um projeto sólido para portfólio
- Explorar design e experiência do usuário
- Evoluir o sistema de forma incremental e sustentável
