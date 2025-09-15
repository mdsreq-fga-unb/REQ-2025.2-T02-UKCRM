# 2. Solução Proposta 

## **2.1 Objetivos do Produto**

**Objetivo Geral**

Aprimorar a gestão do processo de vendas dos clientes, melhorar o relacionamento, satisfação, fidelização, retenção e impulsionar o crescimento das vendas através da organização das informações dos clientes, otimização dos processos de vendas, avaliação de dados como desempenho dos clientes e a eficácia do marketing aplicado através do desenvolvimento de um sistema **CRM próprio**.

**Objetivos Específicos e Indicadores**

| Código | Objetivo Específico | Indicador de Sucesso |
|--------|---------------------|-----------------------|
| OE1    | Implementação própria de CRM | Registro de leads, contatos, contas e oportunidades de venda com sucesso. |
| OE2    | Integração de API | Integração com pelo menos 3 APIs diferentes (ex: WhatsApp, Instagram Ads, Google Ads). |
| OE3    | Segurança dos dados | Zero incidentes graves de segurança e conformidade com a LGPD. |
| OE4    | Automação de etapas dentro do funil de vendas | Redução no tempo gasto em tarefas manuais (ex: envio de e-mails de follow-up, criação de tarefas). |
| OE5    | Visualização gráficas de dados | Presença de histogramas, gráficos de caixa, gráficos de funil, gráficos de linha para tendências e dashboards personalizáveis. |
| OE6    | Gestão de Relacionamento | Centralização do histórico de interações (e-mails, ligações, reuniões) por cliente, acessível a toda a equipe de vendas. |
| OE7    | Análise de Desempenho | Geração de relatórios automáticos sobre performance da equipe, taxa de conversão por etapa do funil e ciclo de vendas. |
| OE8    | Rastreamento de Marketing | Capacidade de rastrear a origem dos leads e gerar relatórios de ROI (Retorno sobre Investimento) por campanha. |
| OE9    | Importação e Exportação de Dados | Capacidade de importar e exportar dados de clientes, contatos e oportunidades em formatos CSV e Excel. |

---

## **2.2 Características da Solução**

O cliente (empresa) irá fazer a gestão dos seus clientes com base em um funil de vendas em que o contato será direcionado a várias etapas em que terá tratativas diferentes e por funções diferentes dentro da empresa. O fluxo inicia no **Novo Contato**, segue para o **Primeiro contato** e, posteriormente, para a etapa de **Triagem (Diagnóstico)**. Caso haja interesse, o cliente é direcionado para o **Agendamento de Reunião**, seguido da **Apresentação de Proposta**. A partir daí, o processo evolui para a **Negociação**, que pode resultar em duas situações finais: Ganho ou Perdido. 

As funcionalidade principais da solução incluem a gestão completa dos contatos, permitindo adicionar, excluir, consultar e atualizar informações; a gestão de perfis de usuários, possibilitando a criação, alteração e exclusão de acessos; a definição de regras de negócio personalizadas para diferentes perfis; e a visualização do funil de vendas em formato Kanban ou em lista, facilitando o acompanhamento do progresso de cada cliente dentro do pipeline.


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
