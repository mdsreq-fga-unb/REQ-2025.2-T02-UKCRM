## 8. DoR e DoD

Esta seção apresenta os conceitos de Definition of Ready (DoR) e Definition of Done (DoD), que ajudam a garantir que o trabalho seja bem definido antes de ser iniciado e que esteja completo antes de ser considerado pronto para entrega.

## 8.1 Definition of Ready (DoR)

O DoR define os critérios que devem ser atendidos para que uma user story, caso de uso, ou cenário esteja pronto para ser desenvolvida.

* **O requisito possui descrição clara e objetiva:** Deve estar relacionado com seu respectivo tema, épico, história, valor de negócio, complexidade técnica e objetivo específico.
* **O requisito está representado por uma história de usuário:** A demanda deve estar formalizada no formato de user story (ex: "Como [perfil], eu quero [ação], para que [valor]"), garantindo o foco no valor para o usuário.
* **Esforço estimado pelo time:** Os requisitos devem ser categorizados por complexidade técnica de acordo com o método de Planning Poker, evitando enviesamento. Essa categorização deve ser feita por pelo menos metade do time.
* **Valor de negócio estimado pelo PO:** Os requisitos devem ser categorizados por valor de negócio de acordo com o método MosCoW junto com a equipe e o Product Owner.
* **O requisito cabe em uma sprint:** De acordo com a categorização, nenhum requisito pode ter esforço estimado em mais de 2 semanas (duração da sprint), caso existam requisitos assim é necessário quebrar o requisito em requisitos menores.
* **Critérios de aceitação definidos e testáveis:** Os critérios de aceitação devem estar no formato de uma lista Dado-Quando-Então (GWT) (ex: “Dado que [condição/contexto], Quando [ação], Então [Resultado]”), de forma que não haja ambiguidades.
* **Dependências identificadas:** Caso haja dependência entre um requisito e outro (de forma que, algum requisito precise ser concluído antes do início de outro), deve haver uma identificação, ou por ordem na tabela do backlog ou como uma Relationship na issue do github.
* **Dados de exemplo ou esquemas:** Quando aplicável, se o requisito tratar de uma tela e informações essenciais precisam ser mostradas de uma forma específica, ao criar a issue no github deve acompanhar imagens ou esquema no figma para auxiliar o desenvolvedor. Se o requisito tratar de uma API que deseja-se um formato específico, deve ser acompanhado de exemplos de payload.
* **Ambiente e acessos necessários disponíveis:** A equipe de desenvolvimento e QA deve ter acesso confirmado aos ambientes (desenvolvimento em Docker, homologação na Hostinger) e ferramentas (GitHub Projects, APIs de teste).
* **Não há impedimentos técnicos conhecidos:** A equipe (incluindo DevOps e Desenvolvedores) confirma que possui um entendimento claro da solução técnica (em React e Django ) e que não há bloqueios arquiteturais ou de infraestrutura (ex: CI/CD no GitHub Actions) pendentes.

## 8.2 Definition of Done (DoD)

O DoD define os critérios que precisam ser cumpridos para que uma funcionalidade seja considerada completa. Isso inclui os requisitos, desenvolvimento, testes, revisão e validação da qualidade, garantindo que a entrega atenda ao escopo e aos padrões de qualidade acordados.

* **Entrega um incremento do produto:** A funcionalidade está integrada à main branch no GitHub e faz parte de um incremento de produto funcional, pronto para ser apresentado ao cliente.
* **Código implementado conforme padrão de arquitetura e estilo:** O código adere aos padrões de estilo definidos nos RNFs: PEP 8 para o backend em Python/Django e os guias de estilo acordados para o frontend em JavaScript/React. Deve passar nas ferramentas de linter integradas ao editor de texto.
* **Revisão de código (peer review) concluída e aprovada:** O Pull Request no GitHub foi revisado e aprovado por, no mínimo, um outro membro da equipe de development. Todos os comentários e ajustes solicitados na revisão foram resolvidos.
* **Testes automatizados criados e passando (unitários/integrados):** Novos testes unitários e/ou de integração foram escritos para o código, abrangendo as funcionalidades propostas no requisito pelo pytest. A suíte de testes completa deve executar com 100% de sucesso, caso contrário os problemas devem ser ajustados, e se necessário postergado para a próxima sprint.
* **Testes manuais relevantes executados e aprovados:** Os testes funcionais e exploratórios foram executados e aprovados pelos Analistas de QA. Os testes foram realizados no ambiente de desenvolvimento e se aprovados também no ambiente hospedado na Hostinger.
* **Documentação atualizada (APIs, notas de uso):** Se a funcionalidade altera uma API, a documentação interna correspondente foi atualizada (por exemplo no PR, explicando as mudanças).
* **Build e deploy automatizados validados:** O build dos containers Docker foi concluído com sucesso. O deploy automatizado via GitHub Actions para o ambiente de homologação foi validado.
* **Critérios de aceitação da história atendidos e verificados:** Todos os critérios de aceitação listados na história foram demonstrados e formalmente validados pelo Product Owner (e/ou Analistas de QA), conforme um checklist dos critérios.
* **Performance, segurança e requisitos não-funcionais validados quando aplicável:** A funcionalidade atende aos Requisitos Não Funcionais (RNFs) aplicáveis, especialmente os de Usabilidade (RNF-1) , Desempenho (RNF-2) e Segurança (RNF-5).