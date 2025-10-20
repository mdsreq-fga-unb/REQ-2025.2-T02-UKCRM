# 9. Backlog do Produto

## 9.1 Backlog Geral com Priorização e MVP


Na etapa de priorização do Backlog do Produto, a equipe utilizou o Método MoSCoW, conforme a abordagem delineada por Clegg e Barker (1994). Este método permitiu que o Product Owner classificasse cada requisito funcional, atribuindo um valor de negócio que guia o desenvolvimento do MVP e as iterações subsequentes. A complexidade técnica foi estimada pelos membros da equipe utilizando o método Planning Poker (média da votação de cada membro sobre a complexidade técnica daquele requisito) descrito em mais detalhes por Mike Cohn (2006). Os requisitos funcionais do projeto são definidos através de User Stories, seguindo a prática do XP, que são agrupadas em Épicos para organizar as funcionalidades maiores e o fluxo de desenvolvimento, conforme recomendado pelo Extreme Programming (EXTREME PROGRAMMING, [s.d.]).

<div class="centered-text"><b>Figura 2 - </b>Gráfico da Dificuldade Técnica em função do Valor de Negócio, onde cada Requisito Funcional é um ponto. A cor laranja representa o conjunto do MVP, enquanto os roxos representam o conjunto que não faz parte do MVP.</div>

<img src="../../imgs/mvp.png" alt="image" class="centered-img"> 

<div class="centered-text"><b>Fonte: </b>Elaboração própria pela equipe (2025)</div>

<br>
<div class="centered-text"><b>Tabela 11 - </b>Backlog dos Requisitos com Priorização e MVP</div>

<style>

.table-wrapper {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  line-height: 1.6;
  margin-bottom: 20px;
  overflow-x: auto;
}

#backlog-table {
  border-collapse: collapse;
  width: 100%;
  min-width: 1400px;
}

#backlog-table th,
#backlog-table td {
  border: 1px solid #dfe2e5;
  padding: 10px 12px;
  text-align: left;
  vertical-align: top;
  font-size: 0.95em;
}


#backlog-table th {
  background-color: #f6f8fa;
  font-weight: 600;
  position: relative;     
  height: 70px;           
  padding-bottom: 30px;   
}

#backlog-table tr:nth-child(even) {
  background-color: #fcfcfd;
}

#backlog-table td[rowspan] {
  background-color: #f1f5f9;
  font-weight: 600;
}


.hide-btn {
  position: absolute;
  bottom: 6px;   
  right: 8px;    
  background-color: #f8d7da;
  color: #a94442;
  border: none;
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 0.75em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.hide-btn:hover {
  background-color: #dc3545;
  color: #fff;
  transform: scale(1.1);
}


.reset-btn-container {
  display: flex;
  justify-content: left;
  margin-bottom: 4px;
}

.reset-btn {
  background-color: #4b31dfff;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transition: all 0.25s ease;
}

.reset-btn:hover {
  background-color: #2800b8ff;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  transform: translateY(-2px);
}


.reset-btn::before {
  content: "🔍";
  font-size: 1.1em;
}

#esp {
    padding: 20px 20px;
}
</style>
<div id="esp"> 
<div class="reset-btn-container">
  <button class="reset-btn" onclick="showAllColumns('backlog-table')">
         Mostrar colunas
  </button>
</div>


<div class="table-wrapper">
  
  <table id="backlog-table">
    <thead>
      <tr>
        <th class="col-tema">Tema Associado <span class="hide-btn" onclick="toggleColumn('col-tema')">[x]</span></th>
        <th class="col-epico">Épico Associado <span class="hide-btn" onclick="toggleColumn('col-epico')">[x]</span></th>
        <th class="col-codigo">Código <span class="hide-btn" onclick="toggleColumn('col-codigo')">[x]</span></th>
        <th class="col-nome">Nome <span class="hide-btn" onclick="toggleColumn('col-nome')">[x]</span></th>
        <th class="col-desc">Descrição <span class="hide-btn" onclick="toggleColumn('col-desc')">[x]</span></th>
        <th class="col-historia">História de Usuário <span class="hide-btn" onclick="toggleColumn('col-historia')">[x]</span></th>
        <th class="col-valor">Valor (MoSCoW) <span class="hide-btn" onclick="toggleColumn('col-valor')">[x]</span></th>
        <th class="col-complex">Complexidade (PP) <span class="hide-btn" onclick="toggleColumn('col-complex')">[x]</span></th>
        <th class="col-oe">Objetivo Específico Associado <span class="hide-btn" onclick="toggleColumn('col-oe')">[x]</span></th>
        <th class="col-criterios">Critérios de Aceitação <span class="hide-btn" onclick="toggleColumn('col-criterios')">[x]</span></th>
        <th class="col-mvp">MVP <span class="hide-btn" onclick="toggleColumn('col-mvp')">[x]</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="col-tema" rowspan="15">Tema 01: Configuração de Usuários e Papéis</td>
        <td class="col-epico" rowspan="3">Épico 01: Gestão de Organizações</td>
        <td class="col-codigo">RF-1.1</td>
        <td class="col-nome">Cadastro de Organização</td>
        <td class="col-desc">Permitir o cadastro de novas Organizações com nome, logo e proprietário.</td>
        <td class="col-historia">Como Administrador quero cadastrar Organizações com nome, logo e Proprietário para que cada organização utilize o CRM de forma separada.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">5</td>
        <td class="col-oe">OE-09 Permitir a gestão de operações de vendas complexas e descentralizadas</td>
        <td class="col-criterios">
        <li>Dado que estou autenticado como Administrador na área de "Gestão de Organizações" quando clico em "Nova Organização", então é exibido um formulário com os campo: “Nome da Organização*”, “Proprietário*” (cadastro) e um campo opcional “Logo” (upload de imagem).</li>
        <li>Dado que todos os campos estão válidos, quando clico em "Salvar", então a organização é criada.</li>
        </td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-1.2</td>
        <td class="col-nome">Edição de Organização</td>
        <td class="col-desc">Permitir a edição das informações de Organizações existentes.</td>
        <td class="col-historia">Como Administrador quero editar as informações das Organizações existentes para correções ou atualizações.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">1</td>
        <td class="col-oe">OE-09 Permitir a gestão de operações de vendas complexas e descentralizadas</td>
        <td class="col-criterios">
<li>Dado que estou autenticado como Administrador na lista de Organizações, quando clico em "Editar" em uma organização, então é exibido um formulário preenchido com os dados atuais da organização.</li>
<li>Dado que os campos do formulário de edição estão preenchidos com dados válidos, quando clico em "Salvar", então as informações da Organização são atualizadas.</li>
        </td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-1.3</td>
        <td class="col-nome">Exclusão de Organização</td>
        <td class="col-desc">Permitir a exclusão de Organizações e todos os seus dados associados.</td>
        <td class="col-historia">Como Administrador quero excluir Organizações existentes para correções, exclusão dos seus dados e usuários.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">1</td>
        <td class="col-oe">OE-09 Permitir a gestão de operações de vendas complexas e descentralizadas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Administrador na lista de Organizações, quando clico em "Excluir" em uma organização, então um modal de confirmação é exibido, informando sobre a remoção permanente dos dados.</li>
<li>Dado que a exclusão foi confirmada, então a Organização e todos os seus dados associados (usuários, leads, etc.) são removidos do sistema.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-epico" rowspan="5">Épico 02: Gestão de Usuários da Organização</td>
        <td class="col-codigo">RF-2.1</td>
        <td class="col-nome">Cadastro de Usuários</td>
        <td class="col-desc">Permitir que o Proprietário cadastre novos usuários em sua Organização.</td>
        <td class="col-historia">Como Proprietário quero cadastrar usuários em minha Organização para que minha equipe possa acessar e utilizar o sistema.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">3</td>
        <td class="col-oe">OE-09 Permitir a gestão de operações de vendas complexas e descentralizadas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Proprietário na área de "Gestão de Usuários", quando clico em "Novo Usuário", então é exibido um formulário para preenchimento de "Nome Completo*", "Email*" e "Nível de Hierarquia*".</li>
<li>Dado que o formulário de novo usuário está preenchido com dados válidos, quando clico em "Convidar", então o usuário é criado e um e-mail de convite é enviado.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-2.2</td>
        <td class="col-nome">Edição de Usuários</td>
        <td class="col-desc">Permitir que o Proprietário edite as informações dos usuários de sua Organização.</td>
        <td class="col-historia">Como Proprietário quero editar as informações dos usuários em minha Organização para correções ou atualizações.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">1</td>
        <td class="col-oe">OE-09 Permitir a gestão de operações de vendas complexas e descentralizadas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Proprietário na lista de usuários, quando clico em "Editar" em um usuário, então é exibido um formulário preenchido com os dados atuais do usuário.</li>
<li>Dado que os dados do formulário de edição são válidos, quando clico em "Salvar", então as informações do usuário são atualizadas.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-2.3</td>
        <td class="col-nome">Exclusão de Usuários</td>
        <td class="col-desc">Permitir que o Proprietário exclua usuários, com transferência de leads.</td>
        <td class="col-historia">Como Proprietário quero excluir usuários de minha organização para revogar o acesso de ex-colaboradores.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">4</td>
        <td class="col-oe">OE-09 Permitir a gestão de operações de vendas complexas e descentralizadas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Proprietário na lista de usuários, quando clico em "Excluir" em um usuário, então sou direcionado para uma tela para transferir os leads daquele usuário.</li>
<li>Dado que todos os leads do usuário a ser excluído foram transferidos e a exclusão foi confirmada, então o acesso do usuário é revogado e seus dados são removidos.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-2.4</td>
        <td class="col-nome">Dashboard do Proprietário</td>
        <td class="col-desc">Exibir dashboards com KPIs de vendas para o Proprietário.</td>
        <td class="col-historia">Como Proprietário quero visualizar dashboards com o processo de conversão, perdas, ganhos e clientes da organização para tomar decisões estratégicas.</td>
        <td class="col-valor">Could</td>
        <td class="col-complex">7</td>
        <td class="col-oe">OE-09 Permitir a gestão de operações de vendas complexas e descentralizadas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Proprietário, quando acesso a página "Dashboards", então são exibidos gráficos com KPIs como taxa de conversão, negócios ganhos/perdidos e novos clientes.</li>
<li>Dado que estou na página "Dashboards", quando seleciono um filtro de período (ex: "Últimos 30 dias"), então os dados dos gráficos são atualizados para refletir esse período.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-2.5</td>
        <td class="col-nome">Herança de Permissões (Proprietário)</td>
        <td class="col-desc">Garantir que o Proprietário herde todas as permissões de níveis hierárquicos inferiores.</td>
        <td class="col-historia">Como Proprietário quero ter as permissões dos usuários de hierarquia inferior para poder supervisionar e executar qualquer tarefa no processo de vendas.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-09 Permitir a gestão de operações de vendas complexas e descentralizadas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Proprietário, quando acesso qualquer funcionalidade do sistema, então possuo todas as permissões de Gerentes, Coordenadores, SDRs e Closers.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-epico" rowspan="7">Épico 03: Configuração da Estrutura de Vendas</td>
        <td class="col-codigo">RF-3.1</td>
        <td class="col-nome">Criação de Funil de Vendas</td>
        <td class="col-desc">Permitir que o Gerente de Vendas crie Funis de Vendas com etapas personalizadas.</td>
        <td class="col-historia">Como Gerente de Vendas quero criar Funis de Vendas para estruturar e padronizar o processo comercial da minha equipe.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">8</td>
        <td class="col-oe">OE-06 Permitir que gestores estruturem e controlem suas equipes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Gerente de Vendas na área "Funis de Vendas", quando clico em "Novo Funil", então é exibido um formulário para definir o "Nome do Funil" e suas "Etapas".</li>
<li>Dado que o formulário de novo funil está preenchido com dados válidos, quando clico em "Salvar", então o funil é criado e fica disponível para uso.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-3.2</td>
        <td class="col-nome">Cadastro de Times de Vendas</td>
        <td class="col-desc">Permitir que o Gerente de Vendas cadastre Times de Vendas.</td>
        <td class="col-historia">Como Gerente de Vendas quero cadastrar novos Times de Vendas para refletir a estrutura dos diferentes times de vendas da organização.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">3</td>
        <td class="col-oe">OE-06 Permitir que gestores estruturem e controlem suas equipes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Gerente de Vendas na área "Gerenciamento de Times", quando clico em "Novo Time", então é exibido um formulário para definir o "Nome do time" e selecionar seus membros.</li>
<li>Dado que o formulário de novo time está preenchido com dados válidos, quando clico em "Salvar", então o time é criado.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-3.3</td>
        <td class="col-nome">Edição de Times de Vendas</td>
        <td class="col-desc">Permitir que o Gerente de Vendas edite os Times de Vendas existentes.</td>
        <td class="col-historia">Como Gerente de Vendas quero editar os Times de Venda existentes para correções ou atualizações.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-06 Permitir que gestores estruturem e controlem suas equipes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Gerente de Vendas na lista de times, quando clico em "Editar" em um time, então é exibido um formulário preenchido com os dados atuais do time.</li>
<li>Dado que o formulário de edição do time contém dados válidos, quando clico em "Salvar", então as informações do time são atualizadas.</li>

</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-3.4</td>
        <td class="col-nome">Exclusão de Times de Vendas</td>
        <td class="col-desc">Permitir que o Gerente de Vendas exclua Times de Vendas.</td>
        <td class="col-historia">Como Gerente de Vendas quero excluir Times de Vendas para que ele não possa mais ser acessado e os membros sejam realocados.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">4</td>
        <td class="col-oe">OE-06 Permitir que gestores estruturem e controlem suas equipes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Gerente de Vendas na lista de Times, quando clico em "Excluir" em um time, então um modal de confirmação é exibido.</li>
<li>Dado que a exclusão no modal foi confirmada, então o time é removido, mantendo seus ex-membros na organização.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-3.5</td>
        <td class="col-nome">Atribuição de Leads</td>
        <td class="col-desc">Permitir que o Gerente de Vendas atribua leads a membros da equipe.</td>
        <td class="col-historia">Como Gerente de Vendas quero atribuir leads a membros de um Time de Vendas para que o membro responsável trabalhe com seus leads.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">1</td>
        <td class="col-oe">OE-06 Permitir que gestores estruturem e controlem suas equipes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Gerente de Vendas e selecionei um ou mais leads, quando clico na opção "Atribuir Responsável", então posso selecionar um novo usuário responsável por esses leads.</li>
<li>Dado que um novo responsável foi selecionado e a ação confirmada, então o nome do novo responsável é exibido nos detalhes do lead.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-3.6</td>
        <td class="col-nome">Automação do Funil</td>
        <td class="col-desc">Permitir a configuração de automações (gatilhos e ações) nas etapas do funil.</td>
        <td class="col-historia">Como Gerente de Vendas quero configurar gatilhos automáticos no funil, como a criação de uma tarefa para um vendedor quando um lead entra em uma etapa específica.</td>
        <td class="col-valor">Should</td>
        <td class="col-complex">13</td>
        <td class="col-oe">OE-03 Otimizar a produtividade da equipe de vendas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Gerente de Vendas editando um funil, quando seleciono a opção "Adicionar Automação" em uma etapa, então posso configurar uma regra (gatilho e ação).</li>
<li>Dado que uma automação está ativa, quando a condição do gatilho é satisfeita (ex: lead entra na etapa), então a ação configurada (ex: criar tarefa para responsável “fazer follow-up no prazo de dois dias”) é executada automaticamente.</li>

</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-3.7</td>
        <td class="col-nome">Herança de Permissões (Gerente)</td>
        <td class="col-desc">Garantir que o Gerente de Vendas herde as permissões de níveis hierárquicos inferiores.</td>
        <td class="col-historia">Como Gerente de Vendas quero ter as permissões dos usuários de hierarquia inferior para que eu possa ter as mesmas funcionalidades que eles têm.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-06 Permitir que gestores estruturem e controlem suas equipes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Gerente de Vendas tenho acesso a todos os relatórios, funcionalidades e permissões que os perfis hierarquicamente inferiores possuem.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-tema" rowspan="15">Tema 02: Gestão operacional de vendas.</td>
        <td class="col-epico" rowspan="3">Épico 04: Gestão do Funil e Processos de Vendas</td>
        <td class="col-codigo">RF-4.1</td>
        <td class="col-nome">Movimentação de Leads no Funil</td>
        <td class="col-desc">Permitir que o Coordenador mova leads entre as etapas do funil (drag-and-drop).</td>
        <td class="col-historia">Como Coordenador de Vendas quero mover os leads livremente entre as etapas do funil para que ele avance/recue de etapa.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">4</td>
        <td class="col-oe">OE-08 Proporcionar uma experiência de uso fluida e intuitiva.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Coordenador na visualização Kanban do funil, quando arrasto o card de um lead para outra coluna (etapa), então a etapa do lead é atualizada.</li></td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-4.2</td>
        <td class="col-nome">Personalização de Etapas do Funil</td>
        <td class="col-desc">Permitir que o Coordenador personalize as etapas de funis específicos.</td>
        <td class="col-historia">Como Coordenador de Vendas quero personalizar as etapas dos Funis de Vendas que eu tenho acesso para que ele se adeque às necessidades do Time de Vendas.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">4</td>
        <td class="col-oe">OE-03 Otimizar a produtividade da equipe de vendas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Coordenador na visualização de um funil, quando acesso a opção "Personalizar Etapas", então posso adicionar, renomear ou remover etapas daquele funil.</li>
<li>Dado que uma etapa contém leads, quando tento excluí-la, então a ação é bloqueada e uma justificativa é exibida.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-4.3</td>
        <td class="col-nome">Herança de Permissões (Coordenador)</td>
        <td class="col-desc">Garantir que o Coordenador herde as permissões de níveis hierárquicos inferiores.</td>
        <td class="col-historia">Como Coordenador de Vendas, além das suas permissões únicas, quero as permissões dos usuários de hierarquia inferior para que eu possa ter as mesmas funcionalidades que eles têm.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-06 Permitir que gestores estruturem e controlem suas equipes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Gerente de Vendas tenho acesso a todos os relatórios, funcionalidades e permissões que os perfis hierarquicamente inferiores possuem.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-epico" rowspan="6">Épico 05: Prospecção e Qualificação de Leads (SDR)</td>
        <td class="col-codigo">RF-5.1</td>
        <td class="col-nome">Cadastro Manual de Leads</td>
        <td class="col-desc">Permitir o cadastro manual de novos leads pelo SDR.</td>
        <td class="col-historia">Como Representante de Desenvolvimento de Vendas quero cadastrar manualmente novos leads para iniciar o processo de triagem.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-01 Aumentar a captação e retenção de leads.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como SDR, quando clico em "Adicionar Lead", então é exibido um formulário para cadastro de um novo lead com os campos: "Nome do Lead", "Empresa", "Telefone" e "Email", e o campo "Responsável" deve ser preenchido automaticamente com meu nome.</li>
<li>Dado que o formulário de novo lead está preenchido com dados válidos, quando clico em "Salvar", então o lead é criado na primeira etapa do funil padrão, atribuído a mim.</li>

</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-5.2</td>
        <td class="col-nome">Edição de Leads</td>
        <td class="col-desc">Permitir a edição das informações dos leads.</td>
        <td class="col-historia">Como Representante de Desenvolvimento de Vendas quero editar as informações de leads existentes para corrigir dados e enriquecer o perfil do contato.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-02 Melhorar a gestão do relacionamento com o cliente.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como SDR visualizando um lead, quando clico em "Editar", então os campos de informação se tornam editáveis.</li>
<li>Dado que as informações do lead foram alteradas com dados válidos, quando clico em "Salvar", então os dados do lead são atualizados.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-5.3</td>
        <td class="col-nome">Exclusão de Leads</td>
        <td class="col-desc">Permitir a exclusão de leads pelo SDR.</td>
        <td class="col-historia">Como Representante de Desenvolvimento de Vendas quero excluir leads para limpar minha lista de trabalho, focando nos contatos ativos.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-05 Garantir a governança e a segurança dos dados dos clientes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como SDR visualizando um lead, quando clico em "Excluir", então um modal de confirmação é exibido.</li>
<li>Dado que a exclusão foi confirmada, então o lead é excluído, saindo das visualizações ativas.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-5.4</td>
        <td class="col-nome">Integração com WhatsApp</td>
        <td class="col-desc">Integrar com o WhatsApp para iniciar conversas com leads.</td>
        <td class="col-historia">Como Representante de Desenvolvimento de Vendas quero ser redirecionado ao WhatsApp para iniciar/continuar contato com leads.</td>
        <td class="col-valor">Could</td>
        <td class="col-complex">1</td>
        <td class="col-oe">OE-02 Melhorar a gestão do relacionamento com o cliente.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como SDR na página de um lead com telefone válido, quando clico no ícone do WhatsApp, então sou redirecionado para uma conversa com o lead no WhatsApp Web/Desktop.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-5.5</td>
        <td class="col-nome">Qualificação de Leads</td>
        <td class="col-desc">Permitir a alteração de status do lead para "qualificado" ou "desqualificado".</td>
        <td class="col-historia">Como Representante de Desenvolvimento de Vendas quero alterar o status de um lead para "qualificado" ou "desqualificado".</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">1</td>
        <td class="col-oe">OE-01 Aumentar a captação e retenção de leads.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como SDR visualizando um lead, quando clico em "Qualificar", então o lead é movido para a próxima fase do funil, destinada ao Closer.</li>
<li>Dado que estou autenticado como SDR visualizando um lead, quando clico em "Desqualificar", então devo selecionar um motivo e o lead é arquivado.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-5.6</td>
        <td class="col-nome">Visualização do Funil (SDR)</td>
        <td class="col-desc">Limitar a visualização do funil do SDR às etapas de prospecção.</td>
        <td class="col-historia">Como Representante de Desenvolvimento de Vendas quero visualizar apenas as etapas iniciais do funil.</td>
        <td class="col-valor">Should</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-05 Garantir a governança e a segurança dos dados dos clientes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como SDR, quando acesso a visualização do funil de vendas, então apenas as etapas de prospecção e qualificação são exibidas.
</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-epico" rowspan="2">Épico 06: Negociação e Fechamento de Vendas (Closer)</td>
        <td class="col-codigo">RF-6.1</td>
        <td class="col-nome">Visualização do Funil (Closer)</td>
        <td class="col-desc">Limitar a visualização do funil do Closer às etapas finais de negociação.</td>
        <td class="col-historia">Como Closer quero visualizar as etapas finais do funil (Proposta, Negociação, Fechamento) para poder fechar negócio com o lead.</td>
        <td class="col-valor">Should</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-05 Garantir a governança e a segurança dos dados dos clientes.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Closer, quando acesso a visualização do funil de vendas, então apenas as etapas de proposta, negociação e fechamento são exibidas.
E vejo apenas os leads que foram qualificados e atribuídos a mim ou ao meu time.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-6.2</td>
        <td class="col-nome">Registro de Ganho/Perda de Negócio</td>
        <td class="col-desc">Permitir que o Closer marque um negócio como "ganho" ou "perdido", registrando valor.</td>
        <td class="col-historia">Como Closer quero marcar um negócio como "ganho" ou "perdido" para armazenar o valor ganho/perdido.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">1</td>
        <td class="col-oe">OE-04 Medir o retorno sobre o investimento (ROI) das campanhas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Closer visualizando um lead, quando clico em "Marcar como Ganho", então o negócio é registrado como "Ganho".
E então o lead é movido para uma lista de "Negócios Ganhos" e o sistema pode solicitar informações adicionais.</li>
<li>Dado que estou autenticado como Closer visualizando um lead, quando clico em "Marcar como Perdido", então devo selecionar um motivo e o negócio é registrado como "Perdido".
E então sou solicitado a escolher um motivo da perda em uma lista pré-definida. Após a seleção, o lead é movido para uma lista de "Negócios Perdidos".</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-epico" rowspan="4">Épico 07: Gestão e Visualização de Leads</td>
        <td class="col-codigo">RF-7.1</td>
        <td class="col-nome">Visualização de Status do Lead</td>
        <td class="col-desc">Exibir o status (etapa do funil) atual de cada lead.</td>
        <td class="col-historia">Como Usuário do sistema quero ver o status atual de cada lead dentro do funil de vendas.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-02 Melhorar a gestão do relacionamento com o cliente.</td>
        <td class="col-criterios"><li>Dado que estou autenticado no sistema, quando visualizo um lead (em lista ou Kanban), então a etapa atual do funil é exibida de forma clara.
E quando eu abro os detalhes de um lead, o nome da etapa atual do funil deve ser exibido de forma proeminente, por exemplo, no cabeçalho da página.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-7.2</td>
        <td class="col-nome">Visualização Detalhada do Lead</td>
        <td class="col-desc">Apresentar uma visualização detalhada com todos os dados do lead.</td>
        <td class="col-historia">Como Usuário do sistema quero visualizar os dados detalhados de um lead.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-02 Melhorar a gestão do relacionamento com o cliente.</td>
        <td class="col-criterios">
<li>Dado que estou autenticado no sistema, quando clico em um lead, então uma tela com todos os seus dados cadastrais e histórico é exibida.</li>
</td>
        <td class="col-mvp">X</td>
      </tr>
      <tr>
        <td class="col-codigo">RF-7.3</td>
        <td class="col-nome">Gerenciamento de Temperatura do Lead</td>
        <td class="col-desc">Exibir e permitir a edição da temperatura do lead (quente, morno, frio).</td>
        <td class="col-historia">Como Usuário do sistema quero visualizar a temperatura de um lead (quente, morno ou frio).</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">1</td>
        <td class="col-oe">OE-01 Aumentar a captação e retenção de leads.</td>
        <td class="col-criterios"><li>Dado que estou autenticado no sistema, quando visualizo um lead, então um indicador visual de sua temperatura (Quente, Morno, Frio) é exibido.</li>
<li>Dado que estou editando um lead, quando altero o campo "Temperatura", então o novo valor é salvo e refletido em todas as visualizações.
E deve ser possível filtrar as listas de leads por essa temperatura.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-7.4</td>
        <td class="col-nome">Métricas de Etapas do Funil</td>
        <td class="col-desc">Apresentar a contagem de leads por etapa e o tempo de permanência em cada uma.</td>
        <td class="col-historia">Como Usuário do sistema quero monitorar o progresso dos leads atribuídos em cada etapa do funil.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-01 Aumentar a captação e retenção de leads.</td>
        <td class="col-criterios"><li>Dado que estou na visualização Kanban do funil, quando olho para o cabeçalho de uma coluna de etapa, então a contagem total de leads naquela etapa é exibida.
E os cards dos leads podem conter informações de inércia, como "há 3 dias nesta etapa".</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-tema" rowspan="8">Tema 03: Automação e Análise</td>
        <td class="col-epico" rowspan="4">Épico 08: Comunicação e Automação com Leads</td>
        <td class="col-codigo">RF-8.1</td>
        <td class="col-nome">Automação de E-mails de Follow-up</td>
        <td class="col-desc">Permitir a automação de envio de e-mails de follow-up.</td>
        <td class="col-historia">Como Usuário do sistema quero permitir a automação do envio de mensagens de follow-up e confirmação aos leads.</td>
        <td class="col-valor">Could</td>
        <td class="col-complex">3</td>
        <td class="col-oe">OE-03 Otimizar a produtividade da equipe de vendas.</td>
        <td class="col-criterios"><li>Dado que uma automação de envio de e-mail foi configurada para uma etapa, quando um lead entra nessa etapa, então o e-mail pré-definido é enviado automaticamente.</li></td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-8.2</td>
        <td class="col-nome">Comentários Internos em Leads</td>
        <td class="col-desc">Fornecer uma ferramenta de comentários internos nos leads.</td>
        <td class="col-historia">Como Usuário do sistema quero possuir uma ferramenta de comunicação interna, como comentários nos leads.</td>
        <td class="col-valor">Should</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-02 Melhorar a gestão do relacionamento com o cliente.</td>
        <td class="col-criterios"><li>Dado que estou visualizando um lead, quando adiciono um comentário na área de "Notas Internas", então o comentário é salvo no histórico com meu nome e data/hora.</li>
<li>Dado que estou escrevendo um comentário, quando menciono outro usuário (com "@"), então ele é notificado.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-8.3</td>
        <td class="col-nome">Integração com Provedor de E-mail</td>
        <td class="col-desc">Integrar com provedor de e-mail para registrar histórico de conversas.</td>
        <td class="col-historia">Como Usuário do sistema, quero ter integração com um provedor de e-mail para registrar automaticamente o histórico de trocas.</td>
        <td class="col-valor">Won’t</td>
        <td class="col-complex">3</td>
        <td class="col-oe">OE-02 Melhorar a gestão do relacionamento com o cliente.</td>
        <td class="col-criterios"><li>Dado que conectei minha conta de e-mail ao CRM, quando troco e-mails (enviados ou recebidos) com um contato que é um lead, então uma cópia desse e-mail é registrada no histórico do lead.</li></td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-8.4</td>
        <td class="col-nome">Registro Manual de Ligações</td>
        <td class="col-desc">Permitir o registro manual de atividades de ligação telefônica.</td>
        <td class="col-historia">Como Usuário do sistema quero permitir que o usuário registre manualmente informações de uma ligação telefônica a um lead.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-02 Melhorar a gestão do relacionamento com o cliente.</td>
        <td class="col-criterios"><li>Dado que estou visualizando um lead, quando clico em "Registrar Atividade" e seleciono "Ligação", então um formulário para data, hora e resumo é exibido.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-epico" rowspan="4">Épico 09: Análise de Dados e Relatórios</td>
        <td class="col-codigo">RF-9.1</td>
        <td class="col-nome">Exportação de Relatórios</td>
        <td class="col-desc">Permitir a exportação de relatórios para PDF e Excel.</td>
        <td class="col-historia">Como Proprietário ou Gerente de Vendas quero exportar dashboards e relatórios para os formatos PDF e Excel.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">5</td>
        <td class="col-oe">OE-07 Assegurar a interoperabilidade e a portabilidade dos dados.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Proprietário ou Gerente em um relatório, quando clico em "Exportar" e seleciono um formato (PDF ou CSV), então o download do arquivo com os dados atuais é iniciado.</li></td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-9.2</td>
        <td class="col-nome">Cadastro de Campanhas de Marketing</td>
        <td class="col-desc">Permitir o cadastro de campanhas de marketing (custo, datas).</td>
        <td class="col-historia">Como Gerente de Vendas ou Proprietário quero cadastrar campanhas de marketing.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">3</td>
        <td class="col-oe">OE-04 Medir o retorno sobre o investimento (ROI) das campanhas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Gestor na área de "Campanhas", quando preencho o formulário com os campos: "Nome da Campanha", "Data de Início", "Data de Fim" e "Custo Total”, e salvo, então a campanha é criada.
E a campanha fica disponível para ser associada a novos leads.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-9.3</td>
        <td class="col-nome">Relatório de ROI de Campanhas</td>
        <td class="col-desc">Apresentar um relatório de ROI (Retorno sobre Investimento) das campanhas.</td>
        <td class="col-historia">Como Proprietário quero apresentar um relatório de ROI de Marketing.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-04 Medir o retorno sobre o investimento (ROI) das campanhas.</td>
        <td class="col-criterios"><li>Dado que estou autenticado como Proprietário, quando acesso o relatório "ROI de Campanhas", então é exibida uma tabela com as métricas de Custo, Receita e ROI para cada campanha.</li></td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-9.4</td>
        <td class="col-nome">Cálculo de LTV do Cliente</td>
        <td class="col-desc">Calcular e exibir o LTV (Lifetime Value) de um cliente.</td>
        <td classa="col-historia">Como Proprietário quero que o sistema seja capaz de calcular automaticamente o Lifetime Value de um lead.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">2</td>
        <td class="col-oe">OE-04 Medir o retorno sobre o investimento (ROI) das campanhas.</td>
        <td class="col-criterios"><li>Dado que um cliente possui múltiplos negócios ganhos, quando visualizo a ficha desse cliente, então o valor do LTV (soma de todos os negócios ganhos) é exibido.</li></td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-tema" rowspan="5">Tema 04: Fluxo de dados e Extensões</td>
        <td class="col-epico" rowspan="2">Épico 10: Integração e Gerenciamento de Dados em Massa</td>
        <td class="col-codigo">RF-10.1</td>
        <td class="col-nome">Importação de Dados</td>
        <td class="col-desc">Fornecer funcionalidade para importação de dados via arquivo (CSV/Excel).</td>
        <td class="col-historia">Como usuário do sistema quero fornecer uma funcionalidade para importação de leads, contatos e oportunidades a partir de um arquivo CSV ou Excel.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">4</td>
        <td class="col-oe">OE-07 Assegurar a interoperabilidade e a portabilidade dos dados.</td>
        <td class="col-criterios"><li>Dado que estou na ferramenta de importação, quando faço o upload de um arquivo e mapeio suas colunas para os campos do CRM, então o sistema processa o arquivo.</li>
<li>Dado que o processamento do arquivo de importação foi concluído, quando a importação finaliza, então os registros são criados no sistema.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-10.2</td>
        <td class="col-nome">Exportação de Dados</td>
        <td class="col-desc">Fornecer funcionalidade para exportação de dados para arquivo (CSV/Excel).</td>
        <td classa="col-historia">Como um usuário do sistema quero fornecer uma funcionalidade para exportação de leads, contatos e oportunidades para um arquivo CSV ou Excel.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">3</td>
        <td class="col-oe">OE-07 Assegurar a interoperabilidade e a portabilidade dos dados.</td>
        <td class="col-criterios"><li>Dado que estou em uma lista de dados (leads, contatos) com filtros aplicados, quando clico em "Exportar", então um arquivo (CSV/Excel) contendo apenas os dados filtrados é gerado para download.</li></td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-epico" rowspan="3">Épico 11: Extensão para Google Chrome</td>
        <td class="col-codigo">RF-11.1</td>
        <td class="col-nome">Cadastro Rápido de Leads (Extensão)</td>
        <td class="col-desc">Permitir o cadastro rápido de leads através da extensão do navegador.</td>
        <td class="col-historia">Como Representante de Vendas quero poder utilizar a extensão do Google Chrome para acelerar o cadastro de novos leads.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">4</td>
        <td class="col-oe">OE-01 Aumentar a captação e retenção de leads.</td>
        <td class="col-criterios"><li>Dado que a extensão do Chrome está instalada e autenticada, quando clico no ícone da extensão, então um formulário rápido de cadastro de lead é aberto.</li>
<li>Dado que o formulário da extensão foi preenchido com dados válidos, quando clico em "Salvar Lead", então o lead é criado no CRM.</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-11.2</td>
        <td class="col-nome">Captura de Contatos (Extensão)</td>
        <td class="col-desc">Permitir a captura de dados de contatos do WhatsApp Web pela extensão.</td>
        <td classa="col-historia">Como Representante de Vendas quero que a extensão do Google Chrome cadastre automaticamente número de telefone, e nome de leads (se disponível) do WhatsApp Web se disponível.</td>
        <td class="col-valor">Must</td>
        <td class="col-complex">3</td>
        <td class="col-oe">OE-01 Aumentar a captação e retenção de leads.</td>
        <td class="col-criterios"><li>Dado que estou com a aba do WhatsApp Web aberta e visualizando uma conversa com um número que ainda não é um lead no CRM, então a extensão do Chrome exibe um botão ou um ícone de "Adicionar ao CRM" próximo ao nome ou número do contato no WhatsApp Web.</li>
<li>Dado que estou no WhatsApp Web em uma conversa com um não-contato, quando clico no botão "Adicionar ao CRM" da extensão, então o formulário de novo lead é aberto, pré-preenchido com o nome, telefone e origem (“WhatsApp”).</li>
</td>
        <td class="col-mvp"></td>
      </tr>
      <tr>
        <td class="col-codigo">RF-11.3</td>
        <td class="col-nome">Sincronização com Google Contacts</td>
        <td class="col-desc">Permitir a sincronização (criação/atualização) de contatos com o Google Contacts.</td>
        <td class="col-historia">Como Representante de Vendas quero que a extensão do Google Chrome salve/atualize os contatos adicionados no Google Contacts para manter minha agenda sincronizada.</td>
        <td class="col-valor">Could</td>
        <td class="col-complex">5</td>
        <td class="col-oe">OE-07 Assegurar a interoperabilidade e a portabilidade dos dados.</td>
        <td class="col-criterios"><li>Dado que a extensão do Chrome está instalada e autenticada no CRM e com a conta Google do usuário, quando adiciono um lead ao CRM pela extensão um contato correspondente é criado no Google Contacts do usuário.</li>
<li>Dado que já existe um contato no Google Contacts com o mesmo telefone ou e-mail, quando a extensão detecta o possível duplicado ao salvar, então a extensão apresenta opções ao usuário: "Atualizar contato existente" ou "Criar novo contato"; e, escolhida a opção, a ação é executada conforme a escolha e a confirmação do usuário.
</li></td>
        <td class="col-mvp"></td>
      </tr>
    </tbody>
  </table>
</div>


<div class="centered-text"><b>Fonte: </b> Elaboração própria pela equipe juntamente com Product Owner (2025).</div>

<script>
 
  function toggleColumn(className) {

    const cells = document.querySelectorAll('#backlog-table .' + className);

    const newDisplay = (cells[0].style.display === 'none') ? '' : 'none';
    
    cells.forEach(cell => {
      cell.style.display = newDisplay;
    });
  }

  function showAllColumns(tableId) {

    const allCells = document.querySelectorAll('#' + tableId + ' th, #' + tableId + ' td');
    
    allCells.forEach(cell => {
      cell.style.display = ''; 
    });
  }

</script>