# 2. Solução Proposta 

## **2.1 Objetivos do Produto**

**Objetivo Geral**

Desenvolver uma plataforma de CRM, para que empresas clientes possam gerenciar de forma integrada e estratégica suas operações comerciais. O sistema visa impulsionar o crescimento das vendas e a retenção de clientes, oferecendo ferramentas para organizar informações, automatizar processos, analisar a performance de vendas e o ROI (*Return On Investment*) de marketing, com suporte nativo para estruturas com múltiplas equipes, filiais e hierarquias de acesso.

**Objetivos Específicos e Indicadores**

| Código | Objetivo Específico | Indicador de Sucesso |
| :---- | :---- | :---- |
| OE01 | Otimizar a produtividade da equipe de vendas através da automação de tarefas. | Redução no tempo gasto em tarefas manuais (ex: envio de e-mails, criação de tarefas). |
| OE02 | Melhorar a gestão do relacionamento com o cliente centralizando as informações. | 100% do histórico de interações (e-mails, ligações e mensagens por WhatsApp) por cliente está centralizado e acessível à equipe de vendas. |
| OE03 | Aumentar a eficiência na qualificação e priorização de leads. | Aumento da taxa de conversão de leads qualificados. O time de vendas consegue identificar e focar nos leads de maior potencial rapidamente. |
| OE04 | Medir o retorno sobre o investimento (ROI) das campanhas de marketing. | Capacidade de gerar relatórios de ROI por campanha, rastreando a origem dos leads desde a fonte até o fechamento da venda. |
| OE05 | Garantir a governança e a segurança dos dados dos clientes. | Zero incidentes graves de segurança e conformidade total com a LGPD, validado por uma lista de conformidade. |
| OE06 | Permitir que gestores de vendas estruturem e controlem suas equipes de forma autônoma e segura dentro da plataforma. | Um gerente de vendas consegue executar o ciclo completo de gerenciamento de sua equipe (criar, editar, associar vendedores, remover) sem suporte técnico. A plataforma garante que os dados de uma equipe não sejam visíveis para outra, a menos que seja permitido. |
| OE07 | Assegurar a interoperabilidade e a portabilidade dos dados do sistema. | Capacidade de importar e exportar dados de clientes, contatos e oportunidades em formatos CSV e Excel. |
| OE08 | Proporcionar uma experiência de uso fluida, intuitiva e acessível. | 90% dos usuários-alvo conseguem completar tarefas essenciais (ex: adicionar um lead, movê-lo no funil) sem treinamento prévio. |
| OE9 | Permitir a gestão de operações de vendas complexas e descentralizadas, espelhando a estrutura organizacional de grandes empresas. | Um usuário **Proprietário** consegue configurar de forma autônoma a estrutura completa da sua empresa (**Times** e **Usuários**). O sistema reflete corretamente a hierarquia de permissões definida. |

---

## **2.2 Características da Solução**

O sistema foi projetado com um conjunto robusto de funcionalidades, cada uma contribuindo para alcançar objetivos estratégicos chave para a gestão de vendas e relacionamento com o cliente. A seguir, detalhamos como o produto irá operar, com as características agrupadas por seus respectivos objetivos.

#### **Para Otimizar a Produtividade da Equipe de Vendas:**

* **Automação do Funil de Vendas:** A plataforma oferecerá ferramentas para configurar gatilhos automáticos. Isso permitirá, por exemplo, o envio programado de e-mails de follow-up ou a criação automática de tarefas para os vendedores sempre que um lead avançar para uma nova etapa do funil.  
* **Integração com APIs Externas:** Para centralizar a captura de leads e a comunicação, o sistema se conectará com APIs de plataformas essenciais como WhatsApp, Instagram Ads e Google Ads, garantindo que nenhum contato seja perdido.

#### **Para Melhorar a Gestão do Relacionamento com o Cliente:**

* **Módulo de Gestão de Contatos:** Uma área completa onde será possível adicionar, consultar, atualizar e remover informações detalhadas de cada contato, mantendo um banco de dados de clientes sempre rico e atualizado.  
* **Histórico Unificado de Interações:** Cada perfil de cliente terá um registro cronológico de todas as interações, sejam elas e-mails, ligações ou reuniões. Esses registros poderão ser feitos de forma automática ou manual, criando uma visão 360º do relacionamento.

#### **Para Aumentar a Eficiência na Qualificação e Priorização de Leads:**

* **Visualização do Funil de Vendas:** O pipeline de vendas será exibido de forma intuitiva, em formatos de Kanban (permitindo arrastar e soltar os leads entre as etapas) ou em lista, ambos com ferramentas avançadas de filtro e busca.  
* **Sistema de Classificação de Leads:** Cada lead poderá ser classificado com um indicador visual claro (ex: quente, morno, frio), permitindo que os vendedores identifiquem e priorizem rapidamente suas abordagens.

#### **Para Facilitar a Análise de Dados e a Tomada de Decisão:**

* **Dashboards Personalizáveis:** Painéis visuais e interativos permitirão o monitoramento de KPIs (Key Performance Indicators) em tempo real, utilizando gráficos de funil, histogramas e linhas de tendência para uma análise rápida e eficaz.  
* **Módulo de Geração de Relatórios:** A plataforma será capaz de emitir relatórios automáticos e detalhados sobre a performance da equipe, taxas de conversão em cada etapa do funil e a duração do ciclo de vendas.

#### **Para Medir o Retorno sobre o Investimento (ROI) em Marketing:**

* **Rastreamento de Origem de Leads:** Uma funcionalidade para registrar e analisar a origem de cada lead, identificando quais campanhas, canais ou anúncios estão gerando os melhores resultados.    
* **Cálculo de ROI de Marketing:** A ferramenta permitirá associar os custos de cada campanha de marketing às receitas geradas a partir dela, calculando o retorno sobre o investimento e otimizando o orçamento futuro.

#### **Para Gerenciar Operações de Vendas Complexas e Descentralizadas (Multi-Empresa):**

* **Gestão de Perfis e Permissões:** O administrador de cada empresa cliente poderá criar diferentes perfis de usuário (como Vendedor, Gerente, Diretor) e definir regras de visibilidade de dados baseadas na hierarquia da empresa, equipe ou filial.    
* **Módulo de Gerenciamento de Equipes:** A ferramenta permitirá que gestores criem, editem e removam equipes de vendas, associem vendedores a elas e as vinculem a diferentes filiais ou unidades de negócio.    
* **Funis de Vendas Múltiplos e Personalizáveis:** Gestores poderão criar e customizar múltiplos funis de vendas, associando pipelines específicos a equipes ou filiais distintas, de acordo com seus processos comerciais.    
* **Lead Scoring Customizável:** O administrador poderá criar campos de qualificação personalizados e atribuir pontuações a eles, gerando um score automático que classifica e prioriza os leads de forma inteligente para toda a organização.  

#### **Para Assegurar a Interoperabilidade e Usabilidade do Sistema:**

* **Ferramenta de Importação e Exportação de Dados:** Funcionalidade que permite a migração de dados para dentro e para fora do sistema, com suporte para importar e exportar listas de clientes, contatos e oportunidades em formatos populares como CSV e Excel.  
* **Interface de Usuário Responsiva:** O design da plataforma se adaptará perfeitamente a diferentes tamanhos de tela, garantindo uma experiência de uso consistente e funcional em desktops.

---

## **2.3 Tecnologias a Serem Utilizadas**

### Desenvolvimento e Arquitetura
- **Backend**: Django  
- **Frontend**: React  
- **Banco de Dados**: PostgreSQL  
- **APIs**: Desenvolvimento e integração de APIs RESTful  

### Infraestrutura e DevOps
- **Containers**: Docker  
- **CI/CD**: GitHub Actions  
- **Hospedagem**: Hostinger  

---

## **2.4 Pesquisa de Mercado e Análise Competitiva**

Selecionamos algumas opiniões de usuários em fóruns e sites especializados, bem como o feedback do cliente, contemplando os produtos já existentes.  
A análise foi consolidada por meio do **diagrama de Ishikawa (Figura 1)**, que evidenciou pontos críticos recorrentes.  

Mesmo que os produtos analisados tenham pontos positivos, ainda há falhas que podemos **eliminar** em nossa solução.  

### Principais concorrentes e pontos negativos
- **Salesforce**: alto custo, complexidade de configuração e suporte limitado para usuários padrão.  
- **Pipedrive**: suporte demorado, problemas de fuso horário e usabilidade pouco intuitiva.  
- **Kommo**: falhas na sincronização de mensagens, bloqueio de números de WhatsApp e suporte insatisfatório.  
- **Pipefy**: cobrança em dólar, recursos limitados e suporte majoritariamente em inglês.  

**Conclusão:** há necessidade de um software próprio que reduza custos, ofereça suporte de qualidade e tenha **interface simples** com baixa curva de aprendizado.  

---

## **2.5 Análise de Viabilidade**

Estima-se um cronograma de três meses para o desenvolvimento completo do projeto, que será estruturado em sprints quinzenais. Essa abordagem permitirá a entrega gradual de funcionalidades, possibilitando verificações constantes e ajustes rápidos ao longo do processo. A viabilidade deste prazo é sustentada pela experiência prévia da equipe em iniciativas semelhantes e pelo fato de já possuir a infraestrutura tecnológica necessária para a tarefa.

Do ponto de vista técnico, a exequibilidade do projeto é elevada. A equipe de desenvolvimento tem sólida competência nas tecnologias escolhidas, como React, Django e PostgreSQL. Além disso, a integração com as APIs do sistemas de comunicação ocorrerá via APIs RESTful, e o time tem habilidade no uso de APIs para garantir que a troca de informações entre os sistemas seja robusta e eficiente. 

---

## **2.6 Impacto da Solução**

**Otimização do Processo de Vendas:** Organização e automação do funil de vendas, garantindo eficiência e redução de perdas.  

**Melhoria na Gestão de Contatos e Relacionamento:** Centralização das informações, permitindo personalização do atendimento e maior fidelização.  

**Aumento da Eficiência da Equipe de Vendas:** Automação de tarefas repetitivas, liberando mais tempo para atividades estratégicas.  

**Análise de Dados e Tomada de Decisão Estratégica:** Dashboards e relatórios gráficos permitirão identificar tendências, avaliar resultados e embasar decisões.  

**Redução da Dependência de Sistemas de Terceiros e Reforço da Marca:** Um **CRM proprietário** reduzirá custos, aumentará a autonomia e fortalecerá a autoridade da **UK Marketing Digital** no mercado.  
