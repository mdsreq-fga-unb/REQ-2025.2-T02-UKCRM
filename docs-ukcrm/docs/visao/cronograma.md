# 5. Cronograma de Entregas

Este plano de desenvolvimento do software apresenta **estimativas de datas e entregas**, que poderão ser ajustadas ao longo do projeto conforme novas necessidades forem identificadas.  

---

## **5.1 Sprints e Entregas**

| Sprint | Período | Meta da Sprint (Sprint Goal) | Exemplos de Atividades e Itens do Backlog | Validação  |
| :---- | :---- | :---- | :---- | :---- |
| **Sprint 0: Preparação** | 17/09/2025 – 01/10/2025 | Estabelecer a fundação técnica e de produto para que o desenvolvimento possa começar de forma eficiente e focada em valor. | Definição da visão do produto e backlog inicial.Configuração do ambiente (Docker, CI/CD).Desenvolvimento de Wireframes no Figma. | • Backlog priorizado para a Sprint 1\. • Ambiente de desenvolvimento funcional. • Wireframes iniciais aprovados. |
| **Sprint 1: Geração e Visualização de Leads** | 02/10/2025 – 16/10/2025 | Permitir que um vendedor possa registrar um novo lead manualmente e visualizá-lo em um quadro simples, representando o primeiro passo do funil de vendas. | • **US:** Criar formulário para registrar informações do lead. • **US:** Visualizar leads em um quadro com colunas "Novo Lead" e "Em Contato". • **Task:** Criar modelo de dados para 'Leads'. | • Demonstração da criação e visualização de um lead funcionando. • Coleta de feedback sobre a usabilidade do formulário e clareza do quadro. |
| **Sprint 2: Movimentação de Leads e Detalhamento** | 17/10/2025 – 31/10/2025 | Evoluir o quadro Kanban, permitindo que o vendedor mova um lead entre as etapas do funil e adicione detalhes importantes sobre a negociação. | • **US:** Arrastar e soltar um lead entre colunas. • **US:** Clicar em um lead para ver e editar detalhes. • **US:** Adicionar notas a um lead para registrar o histórico. | • Funcionalidade de mover cards e editar detalhes validada com stakeholders. • Verificação se o fluxo do quadro reflete o processo de vendas real. |
| **Sprint 3: Automação e Integração Inicial** | 01/11/2025 – 15/11/2025 | Automatizar a entrada de leads através da integração com uma API de formulário de contato do site, testando a eficácia do fluxo com clientes piloto. | • **US:** Leads do formulário do site devem aparecer automaticamente no quadro. • **Task:** Desenvolver o serviço de integração para a API. • Convidar usuários-chave para testar o fluxo. | • Demonstração ao vivo da integração funcionando. • Apresentação do feedback inicial coletado dos testes com clientes piloto. |
| **Sprint 4: Qualidade, Refinamento e Correções** | 16/11/2025 – 30/11/2025 | Aumentar a confiabilidade e a usabilidade do sistema com base no feedback dos testes, corrigindo os bugs mais críticos e garantindo que a solução esteja estável. | • Correção de bugs críticos reportados. • Melhorar a performance de carregamento do quadro Kanban. • Refinar a interface (UI) com base no feedback de usabilidade. | • Demonstração das correções e melhorias implementadas. • Análise das métricas de performance. • Validação final com os stakeholders para o lançamento. |

---

**Observação:** Cada sprint possui duração de duas semanas. Ao final de cada sprint, a validação do cliente será o critério para possíveis alterações e adequações do projeto, conforme as prioridades de implementação.  
