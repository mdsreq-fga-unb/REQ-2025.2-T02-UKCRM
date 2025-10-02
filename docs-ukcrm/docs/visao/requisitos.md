# 7. Requisitos de Software

## **7.1 Lista de Requisitos Funcionais**

| ID | Requisito Funcional |
| :---- | :---- |
| RF01 | O sistema deve permitir que o **Administrador** cadastre novas **Organizações**. |
| RF02 | O sistema deve permitir que o **Administrador** edite as informações de **Organizações** existentes. |
| RF03 | O sistema deve permitir que o **Administrador** exclua **Organizações**. |
| RF04 | O sistema deve permitir que o **Proprietário** cadastre usuários em sua **Organização**. |
| RF05 | O sistema deve permitir que o **Proprietário** edite os usuários (ex: nome, email, nível de hierarquia) em sua **Organização**. |
| RF06 | O sistema deve permitir que o **Proprietário** exclua usuários de sua organização. |
| RF07 | O sistema deve apresentar dashboards com o processo de conversão do cliente, juntamente com o nível de perda e ganho do mesmo e visualização de clientes da organização ao **Proprietário**.  |
| RF08 | O sistema deve dar ao **Proprietário**, além das suas permissões únicas, as permissões dos usuários de hierarquia inferior: Gerente de Vendas, Coordenador de Vendas, Representante de Desenvolvimento de Vendas e Closer. |
| RF09 | O sistema deve permitir que o **Gerente de Vendas** crie **Funis de Vendas**. |
| RF10 | O sistema deve permitir que o **Gerente de Vendas** cadastre novos **Times de Vendas**. |
| RF11 | O sistema deve permitir que o **Gerente de Vendas** edite **Times de Venda** existentes. |
| RF12 | O sistema deve permitir que o **Gerente de Vendas** exclua **Times de Vendas**. |
| RF13 | O sistema deve permitir que o **Gerente de Vendas** atribua leads a membros de um **Time de Vendas**. |
| RF14 | O sistema deve permitir que o **Gerente de Vendas** configure gatilhos automáticos no funil, como a criação de uma tarefa para um vendedor quando um lead entra em uma etapa específica. |
| RF15 | O sistema deve permitir que o **Gerente de Vendas** associe usuários a um **Time de Vendas**. |
| RF16 | O sistema deve dar ao **Gerente de Vendas**, além das suas permissões únicas, as permissões dos usuários de hierarquia inferior: Coordenador de Vendas, Representante de Desenvolvimento de Vendas e Closer. |
| RF17 | O sistema deve permitir que o **Coordenador de Vendas** mova os leads livremente entre as etapas do funil. |
| RF18 | O sistema deve permitir que o **Coordenador de Vendas** personalize as etapas dos **Funis de Vendas** que ele tem acesso. |
| RF19 | O sistema deve dar ao **Coordenador de Vendas**, além das suas permissões únicas, as permissões dos usuários de hierarquia inferior: Representante de Desenvolvimento de Vendas e Closer. |
| RF20 | O sistema deve permitir que o **Representante de Desenvolvimento de Vendas** cadastre manualmente novos leads. |
| RF21 | O sistema deve permitir que o **Representante de Desenvolvimento de Vendas** edite as informações de leads existentes. |
| RF22 | O sistema deve permitir que o **Representante de Desenvolvimento de Vendas** arquive leads. |
| RF23 | O sistema deve permitir que o **Representante de Desenvolvimento de Vendas** envie mensagens de WhatsApp para os leads diretamente da plataforma. |
| RF24 | O sistema deve permitir que o **Representante de Desenvolvimento de Vendas** altere o status de um lead para "qualificado" ou "desqualificado". |
| RF25 | O sistema deve permitir que o **Representante de Desenvolvimento de Vendas** visualize apenas os as etapas iniciais do funil (ex: Prospecção, Qualificação, Repescagem ou Follow Up).  |
| RF26 | O sistema deve permitir que o **Closer** visualize as etapas finais do funil (Proposta, Negociação, Fechamento). |
| RF27 | O sistema deve permitir que o **Closer** marque um negócio como "ganho" ou "perdido". |
| RF28 | O sistema deve exibir o status atual de cada lead dentro do funil de vendas para todos os usuários. |
| RF29 | O sistema deve permitir a visualização dos dados detalhados de um lead (nome, telefone, idade, emprego, etc.) para todos os usuários. |
| RF30 | O sistema deve exibir a temperatura de um lead (quente, morno ou frio) para todos os usuários. |
| RF31 | O sistema deve registrar automaticamente a origem de um lead (ex: campanha, plataforma). |
| RF32 | O sistema deve permitir a automação do envio de mensagens de follow-up e confirmação aos leads. |
| RF33 | O sistema deve permitir o monitoramento do progresso dos leads atribuídos em cada etapa do funil. |
| RF34 | O sistema deve possuir uma ferramenta de comunicação interna, como comentários nos leads. |
| RF35 | O sistema deve permitir o preenchimento de um questionário para gerar um score para o lead. |
| RF36 | O sistema deve permitir o registro do valor da venda de um negócio ganho. |
| RF37 | O sistema deve ter integração com um provedor de e-mail (ex: via IMAP/SMTP) para registrar automaticamente no histórico do lead os e-mails trocados. |
| RF38 | O sistema deve permitir que o usuário registre manualmente informações de uma ligação telefônica (data, duração, resumo) no histórico do lead.   |
| RF39 | O sistema deve permitir a exportação de dashboards e relatórios para os formatos PDF e Excel. |
| RF40 | O sistema deve permitir que o usuário cadastre campanhas de marketing, informando nome, data de início, data de fim e custo total. |
| RF41 | O sistema deve apresentar um relatório de ROI de Marketing, comparando o custo de uma campanha com a soma dos valores de venda dos leads originados por ela. |
| RF42 | O sistema deve fornecer uma funcionalidade para importação de leads, contatos e oportunidades a partir de um arquivo CSV ou Excel. |
| RF43 | O sistema deve fornecer uma funcionalidade para exportação de leads, contatos e oportunidades para um arquivo CSV ou Excel, respeitando as permissões de acesso do usuário. |

## **7.2 Lista de Requisitos Não Funcionais**

| Código  | Nome | Descrição |
| :---- | :---- | :---- |
| RNF01 | Padronização  | O código escrito é padronizado a fim de aumentar a organização e a manutenibilidade do sistema para a equipe de desenvolvimento. |
| RNF02  | Criptografia de senhas | As senhas dos usuários devem ser armazenadas de forma criptografada, para que as informações pessoais delas permaneçam seguras e privadas. |
| RNF03 | Política de senhas  | As senhas devem ter no mínimo: 8 caracteres, 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial (ex: “.”, “?”, “\#”, “$”, etc). |
| RNF04 | Não-duplicidade de dados | Alguns campos de usuários e leads e usuários devem ser únicos (como o CPF). |
| RNF05 | Conformidade com a LGPD | Um usuário pode solicitar a exportação completa ou a exclusão de seus dados pessoais. |
| RNF06 | Rastreabilidade de ações | O sistema deve registrar (gerar logs) de todas as ações críticas dos usuários, como login, exportação de dados e exclusão de registros. |
| RNF07 | Interface gráfica  | O sistema deve ser intuitivo e responsivo, com baixa curva de aprendizagem. |
| RNF08 | Modularidade | O sistema deve possuir uma arquitetura modular, permitindo a fácil manutenção, a correção de falhas e a implementação de novas funcionalidades.  |
| RNF09 | Suportabilidade | O sistema deve funcionar corretamente em navegadores modernos de desktop. |
| RNF10 | Requisitos de Implementação | O sistema deve ser desenvolvido utilizando a linguagem de programação JavaScript para o frontend e Python para o backend, garantindo compatibilidade com frameworks React e Django. Além disso, deve usar containers do Docker para realizar a comunicação entre o frontend e backend. |