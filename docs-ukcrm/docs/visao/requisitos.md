## 7. REQUISITOS DE SOFTWARE

Os requisitos de software definem as funcionalidades que o sistema deve executar para atender aos objetivos do projeto e às necessidades dos usuários. Eles são a base para o planejamento, desenvolvimento e validação do produto.

## 7.1 Lista de Requisitos Funcionais

A tabela a seguir apresenta um sumário de alto nível dos requisitos funcionais do sistema. Cada requisito está associado a um objetivo específico e a uma característica do produto, fornecendo um mapa claro entre a necessidade do negócio e a funcionalidade implementada. O detalhamento completo, incluindo as Histórias de Usuário e Critérios de Aceitação, encontra-se no backlog consolidado no Tópico 9.

<div class="centered-text"><b>Tabela 6 - </b>Requisitos Não Funcionais de Usabilidade.</div>

| Código | Nome | Descrição |
| :--- | :--- | :--- |
| RF-1.1 | Cadastro de Organização | Permitir o cadastro de novas Organizações com nome, logo e proprietário. |
| RF-1.2 | Edição de Organização | Permitir a edição das informações de Organizações existentes. |
| RF-1.3 | Exclusão de Organização | Permitir a exclusão de Organizações e todos os seus dados associados. |
| RF-2.1 | Cadastro de Usuários | Permitir que o Proprietário cadastre novos usuários em sua Organização. |
| RF-2.2 | Edição de Usuários | Permitir que o Proprietário edite as informações dos usuários de sua Organização. |
| RF-2.3 | Exclusão de Usuários | Permitir que o Proprietário exclua usuários, com transferência de leads. |
| RF-2.4 | Dashboard do Proprietário | Exibir dashboards com KPIs de vendas para o Proprietário. |
| RF-2.5 | Herança de Permissões (Proprietário) | Garantir que o Proprietário herde todas as permissões de níveis hierárquicos inferiores. |
| RF-3.1 | Criação de Funil de Vendas | Permitir que o Gerente de Vendas crie Funis de Vendas com etapas personalizadas. |
| RF-3.2 | Cadastro de Times de Vendas | Permitir que o Gerente de Vendas cadastre Times de Vendas. |
| RF-3.3 | Edição de Times de Vendas | Permitir que o Gerente de Vendas edite os Times de Vendas existentes. |
| RF-3.4 | Exclusão de Times de Vendas | Permitir que o Gerente de Vendas exclua Times de Vendas. |
| RF-3.5 | Atribuição de Leads | Permitir que o Gerente de Vendas atribua leads a membros da equipe. |
| RF-3.6 | Automação do Funil | Permitir a configuração de automações (gatilhos e ações) nas etapas do funil. |
| RF-3.7 | Herança de Permissões (Gerente) | Garantir que o Gerente de Vendas herde as permissões de níveis hierárquicos inferiores. |
| RF-4.1 | Movimentação de Leads no Funil | Permitir que o Coordenador mova leads entre as etapas do funil (drag-and-drop). |
| RF-4.2 | Personalização de Etapas do Funil | Permitir que o Coordenador personalize as etapas de funis específicos. |
| RF-4.3 | Herança de Permissões (Coordenador) | Garantir que o Coordenador herde as permissões de níveis hierárquicos inferiores. |
| RF-5.1 | Cadastro Manual de Leads | Permitir o cadastro manual de novos leads pelo SDR. |
| RF-5.2 | Edição de Leads | Permitir a edição das informações dos leads. |
| RF-5.3 | Exclusão de Leads | Permitir a exclusão de leads pelo SDR. |
| RF-5.4 | Integração com WhatsApp | Integrar com o WhatsApp para iniciar conversas com leads. |
| RF-5.5 | Qualificação de Leads | Permitir a alteração de status do lead para "qualificado" ou "desqualificado". |
| RF-5.6 | Visualização do Funil (SDR) | Limitar a visualização do funil do SDR às etapas de prospecção. |
| RF-6.1 | Visualização do Funil (Closer) | Limitar a visualização do funil do Closer às etapas finais de negociação. |
| RF-6.2 | Registro de Ganho/Perda de Negócio | Permitir que o Closer marque um negócio como "ganho" ou "perdido", registrando valor. |
| RF-7.1 | Visualização de Status do Lead | Exibir o status (etapa do funil) atual de cada lead. |
| RF-7.2 | Visualização Detalhada do Lead | Apresentar uma visualização detalhada com todos os dados do lead. |
| RF-7.3 | Gerenciamento de Temperatura do Lead | Exibir e permitir a edição da temperatura do lead (quente, morno, frio). |
| RF-7.4 | Métricas de Etapas do Funil | Apresentar a contagem de leads por etapa e o tempo de permanência em cada uma. |
| RF-8.1 | Automação de E-mails de Follow-up | Permitir a automação de envio de e-mails de follow-up. |
| RF-8.2 | Comentários Internos em Leads | Fornecer uma ferramenta de comentários internos nos leads. |
| RF-8.3 | Integração com Provedor de E-mail | Integrar com provedor de e-mail para registrar histórico de conversas. |
| RF-8.4 | Registro Manual de Ligações | Permitir o registro manual de atividades de ligação telefônica. |
| RF-9.1 | Exportação de Relatórios | Permitir a exportação de relatórios para PDF e Excel. |
| RF-9.2 | Cadastro de Campanhas de Marketing | Permitir o cadastro de campanhas de marketing (custo, datas). |
| RF-9.3 | Relatório de ROI de Campanhas | Apresentar um relatório de ROI (Retorno sobre Investimento) das campanhas. |
| RF-9.4 | Cálculo de LTV do Cliente | Calcular e exibir o LTV (Lifetime Value) de um cliente. |
| RF-10.1 | Importação de Dados | Fornecer funcionalidade para importação de dados via arquivo (CSV/Excel). |
| RF-10.2 | Exportação de Dados | Fornecer funcionalidade para exportação de dados para arquivo (CSV/Excel). |
| RF-11.1 | Cadastro Rápido de Leads (Extensão) | Permitir o cadastro rápido de leads através da extensão do navegador. |
| RF-11.2 | Captura de Contatos (Extensão) | Permitir a captura de dados de contatos do WhatsApp Web pela extensão. |
| RF-11.3 | Sincronização com Google Contacts | Permitir a sincronização (criação/atualização) de contatos com o Google Contacts. |
<div class="centered-text"><b>Fonte: </b>Elaboração própria pela equipe (2025)</div>
---

## 7.2 Lista de Requisitos Não Funcionais

A seguir, são detalhados os Requisitos Não Funcionais (RNFs) que definem os atributos de qualidade, restrições técnicas e padrões operacionais do sistema. Eles são cruciais para garantir que a experiência do usuário seja excelente e que a plataforma seja robusta, segura e escalável.

#### RNF-1: Usabilidade (Usability)
Refere-se à facilidade com que os usuários podem aprender e utilizar o sistema de forma eficiente e satisfatória.

<div class="centered-text"><b>Tabela 7 - </b>Requisitos Não Funcionais de Usabilidade.</div>


| Código | Nome | Descrição |
| :--- | :--- | :--- |
| RNF-1.1 | Curva de Aprendizagem | Um novo usuário, com experiência básica em sistemas web, deve ser capaz de realizar as operações fundamentais do seu perfil (ex: cadastrar um lead para um SDR, mover um card para um Coordenador) em no máximo 15 minutos de uso, sem a necessidade de um treinamento formal, apenas com o auxílio de dicas de interface (tooltips) e mensagens informativas. |
| RNF-1.2 | Responsividade | A interface do sistema web deve ser responsiva e adaptar-se de forma funcional aos principais tamanhos de tela de desktop e notebooks, com resoluções mínimas de 1280x720 pixels. |
| RNF-1.3 | Feedback ao Usuário | O sistema deve fornecer feedback visual claro e imediato para todas as ações do usuário. Operações que durem mais de 1 segundo devem exibir um indicador de carregamento (ex: spinner). Confirmações de sucesso e notificações de erro devem ser exibidas em até 1 segundo após a conclusão da ação e ser claras sobre o resultado. |
| RNF-1.4 | Prevenção de Erros | O sistema deve utilizar validação de formulários em tempo real (inline validation) para informar o usuário sobre dados inválidos antes do envio. Campos obrigatórios devem ser claramente sinalizados. Ações destrutivas (ex: exclusão de organização, usuário ou lead) devem sempre solicitar confirmação explícita através de um modal. |
<div class="centered-text"><b>Fonte: </b>Elaboração própria pela equipe (2025)</div>

#### RNF-2: Desempenho (Performance)
Define os critérios de tempo de resposta, capacidade de carga e eficiência do sistema sob diferentes condições de uso.


<div class="centered-text"><b>Tabela 8 - </b>Requisitos Não Funcionais de Desempenho.</div>

| Código | Nome | Descrição |
| :--- | :--- | :--- |
| RNF-2.1 | Tempo de Resposta | O tempo de carregamento completo de qualquer página da aplicação não deve exceder 2 segundos em condições normais de rede (banda larga de 10 Mbps). A resposta a interações críticas (ex: salvar um formulário, mover um lead no Kanban) deve ser concluída em, no máximo, 1,5 segundos. |
| RNF-2.2 | Carga Concorrente | O sistema deve suportar até 10.000 usuários simultaneamente ativos (realizando operações de leitura e escrita) com um tempo de resposta médio inferior a 2 segundos por requisição. Os picos de uso durante promoções ou horários de pico não devem degradar a performance abaixo deste limite. |
| RNF-2.4 | Desempenho da Extensão | A extensão do Google Chrome deve ter um impacto mínimo no desempenho do navegador. A abertura do formulário rápido deve ocorrer em menos de 1 segundo, e o tempo para pré-preencher dados do WhatsApp Web (RF-42) não deve exceder 2 segundos. |
<div class="centered-text"><b>Fonte: </b>Elaboração própria pela equipe (2025)</div>

#### RNF-3: Confiabilidade (Reliability)
Refere-se à capacidade do sistema de operar sem falhas por um período de tempo especificado e de se recuperar de falhas.

<div class="centered-text"><b>Tabela 9 - </b>Requisitos Não Funcionais de Confiabilidade.</div>

| Código | Nome | Descrição |
| :--- | :--- | :--- |
| RNF-3.1 | Disponibilidade | O sistema deve ter uma disponibilidade de 99.5% (uptime), o que equivale a um tempo máximo de inatividade de aproximadamente 3,6 horas por mês. |
| RNF-3.2 | Recuperação de Falhas | Em caso de falha crítica no servidor ou no banco de dados, o sistema deve ser restaurado a partir de backups automáticos. O Tempo Máximo de Recuperação (RTO) deve ser de 4 horas. O Ponto Máximo de Perda de Dados (RPO) aceitável é de 1 hora (backups devem ser realizados, no mínimo, a cada hora). |
| RNF-3.3 | Integridade de Dados | Todas as transações financeiras e de dados críticos (criação de organização, exclusão de usuário, etc.) devem ser atômicas (ACID). O sistema não deve permitir a existência de dados órfãos (ex: leads sem um responsável ou organização associada). |
| RNF-3.4 | Logs de Auditoria | Todas as ações de criação, alteração e exclusão (CUD) em entidades críticas (Organização, Usuário, Lead, Funil, Time) devem ser registradas em logs de auditoria imutáveis, contendo: ação realizada, autor (usuário), timestamp, e o resultado da operação. |
<div class="centered-text"><b>Fonte: </b>Elaboração própria pela equipe (2025)</div>

#### RNF-4: Suportabilidade (Supportability) e Compatibilidade
Define os requisitos para garantir que o sistema seja fácil de manter, operar e compatível com outros sistemas e ambientes.


<div class="centered-text"><b>Tabela 10 - </b>Requisitos Não Funcionais de Suportabilidade e Compatibilidade.</div>

| Código | Nome | Descrição |
| :--- | :--- | :--- |
| RNF-4.1 | Compatibilidade de Navegadores | O sistema deve ser totalmente funcional nas duas últimas versões estáveis dos seguintes navegadores de desktop: Google Chrome, Mozilla Firefox e Microsoft Edge. |
| RNF-4.2 | Manutenibilidade | O código-fonte deve seguir os padrões de estilo e boas práticas das linguagens e frameworks definidos (PEP 8 para Python/Django, guias de estilo comuns para JavaScript/React). A complexidade ciclomática das funções/métodos deve ser mantida baixa para facilitar a manutenção. |
<div class="centered-text"><b>Fonte: </b>Elaboração própria pela equipe (2025)</div>

#### RNF-5: Segurança (Security)
Define os requisitos para proteger o sistema e seus dados contra ameaças e vulnerabilidades.


<div class="centered-text"><b>Tabela 11 - </b>Requisitos Não Funcionais de Segurança.</div>

| Código | Nome | Descrição |
| :--- | :--- | :--- |
| RNF-5.1 | Autenticação e Senhas | O sistema deve exigir senhas fortes (mínimo de 8 caracteres, com letras maiúsculas, minúsculas, números e símbolos). As senhas devem ser armazenadas de forma segura utilizando hashing (o Django utiliza automaticamente). O sistema deve implementar proteção contra ataques de força bruta, bloqueando temporariamente o acesso após 5 tentativas de login sem sucesso. |
| RNF-5.2 | Autorização e Controle de Acesso | O acesso às funcionalidades e dados deve ser estritamente controlado com base no perfil do usuário (Administrador, Proprietário, Gerente, etc.). Um usuário não deve ser capaz de acessar ou modificar dados de uma organização à qual não pertence. As permissões hierárquicas (ex: Proprietário herda permissões de Gerente) devem ser rigorosamente aplicadas no backend. |
| RNF-5.3 | Proteção de Dados | Toda a comunicação entre o cliente (navegador) e o servidor deve ser criptografada utilizando HTTPS (TLS 1.2 ou superior). Dados sensíveis armazenados no banco de dados (além de senhas) devem ser criptografados. |
| RNF-5.4 | Prevenção de Vulnerabilidades | O sistema deve ser protegido contra as principais vulnerabilidades da web, conforme o OWASP Top 10, incluindo SQL Injection, Cross-Site Scripting (XSS) e Cross-Site Request Forgery (CSRF). |
<div class="centered-text"><b>Fonte: </b>Elaboração própria pela equipe (2025)</div>



#### RNF-6: Requisitos de Implementação (Constraints)
Define as restrições tecnológicas, legais e de recursos que devem ser seguidas durante o desenvolvimento e implantação do projeto.


<div class="centered-text"><b>Tabela 12 - </b> Requisitos Não Funcionais de Implementação</div>

| Código | Nome | Descrição |
| :--- | :--- | :--- |
| RNF-6.1 | Tecnologias (Stack) | Frontend: A aplicação web deve ser desenvolvida utilizando JavaScript com o framework React. Backend: A API e a lógica de negócios devem ser desenvolvidas em Python com o framework Django (e Django REST Framework). Banco de Dados: PostgreSQL. Extensão Chrome: Desenvolvida com HTML, CSS e JavaScript puro ou um micro-framework leve. |
| RNF-6.2 | Infraestrutura e Implantação | A aplicação deve ser conteinerizada utilizando Docker para garantir a consistência entre os ambientes de desenvolvimento, teste e produção. A comunicação entre os contêineres do frontend e backend deve ocorrer através de uma rede Docker definida. |
| RNF-6.3 | Conformidade Legal | O sistema deve estar em conformidade com a Lei Geral de Proteção de Dados (LGPD) do Brasil, garantindo que o tratamento de dados pessoais dos leads e usuários siga os princípios da lei, incluindo mecanismos para consentimento e exclusão de dados quando solicitado. |
<div class="centered-text"><b>Fonte: </b>Elaboração própria pela equipe (2025)</div>
