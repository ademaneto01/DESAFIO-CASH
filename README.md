# DESAFIO-CASH

<h1>RESUMO</h1>

<p>
O desafio proposto se mostrou super interessante e satisfatório conforme o desenvolvimento do mesmo, apesar de ter disponível apenas o final de semana para a realização. Pois durante a semana trabalho na SaltSystems no período comercial tradicional e durante a noite atuo monitorando alunos do curso de desenvolvimento de software na Cubos Academy. Dessa forma, pelo curto espaço de tempo, optei por não utilizar typeScript e ORM, já que não tenho a mesma familiaridade que possuo com as ferramentas utilizadas, Javascript e Nodde.js.

Durante o projeto, o momento mais desafiafor foi na rota de extrato detalhado, porque fiquei bastante instigado na parte de if's, especificamente em qual rota exibir conforme a informação que o usuário fornece, já que há opções de consultas por data, checkIn e checkOut.

Portanto, as funcionalidades estão compostas por 7 rotas, conforme abaixo.

- Cadastro do usuário: gerando uma senha hash, que para isso utilizei a lib "bcrypt" e também cadastrei R$ 100,00 relacionando o id do usuário na tabela Accounts.
- Login.
- Geração de Token: para isso utlizei a lib "jsonwebtoken".
- Rota de transferência: só é possivel acessar esta rota com um token válido e com ele podemos acessar o usuário e obtermos todas as informações necessárias e também manter a inviabilidade de um usuário contaminar ações de outros usuários.
- Extrato geral: somente possível com um token válido.
- Extrato por data, checkIn e checkOut: somente possível com um token válido.
- Extrato Balance: somente com um token válido.

</p>

<h1>Instruções para rodar</h1>

Para inicializar a aplicação é necessário que se tenha o editor de texto VScode, postgres e o node.JS instalados na sua máquina.
**Baixando as dependências**

npm install

**inicializando com o nodemon**

npm run dev

**Banco de dados SQL**

- schema.sql possui as tabelas necessaria para criação do banco seu banco de dados.
- .env.example possui os exemplos de chaves necessarias para relacionar seu banco de dados.

**Consulta data**

Para consultar extrato por data é necessario passar no seguinte padrão "mes/dia/ano".

<h1>Conclusão</h1>

<p>
Contudo, o desafio foi desafiante como o próprio nome já diz. E com isso, finalizo com gosto de saber mais e entender como funciona um sistema simples de transferência bancaria.

Embora eu não tenha entregue o desafio conforme desajava, utilizando as ferramentas type e ORM, estou feliz com o resultado pois todas as funcionalidades propostas estão funcionando e principalmente pelo fato de ser chamado para um processo seletivo em uma companhia que admiro. Dessa forma, termino o desafio entusiasmado pela possibilidade de me envolver e fazer parte da empresa.

</p>
