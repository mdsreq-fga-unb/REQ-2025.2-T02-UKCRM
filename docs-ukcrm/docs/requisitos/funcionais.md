
# Levantamento dos Requisitos



O levantamento de <b>requisitos funcionais</b> e <b>não funcionais</b> do sistema foram feitos por meio de entrevistas com o cliente. Por meio dessas entrevista, foi possivel identificar as necessidades do negócio, compreender os processos internos e mapear as funcionalidades desejadas para a solução. 
## Requisitos Funcionais 

| Código | Nome                              | História de Usuário |
|--------|-----------------------------------|----------------------|
| RF01   | Gerenciamento de Organizações     | Como **Administrador**, quero cadastrar, editar e remover organizações, para centralizar leads, contatos e negócios. |
| RF02   | Gerenciamento de Usuários         | Como **Proprietário**, quero atribuir, editar e remover quaisquer usuários de organizações, para definir quem pode trabalhar com os leads, contatos e negócios da organização. |
| RF03   | Personalização de Funis de Vendas | Como **Gerente de Vendas**, quero personalizar funis de vendas, para adaptá-los ao processo comercial da empresa. |
| RF04   | Gerenciamento de Leads            | Como **SDR**, quero cadastrar, editar e remover manualmente novos leads, para realizar a triagem. |
| RF05   | Temperatura de Leads              | Como **SDR**, quero ver a temperatura de um lead (quente, morno, frio), para definir seu nível de prioridade de atendimento e quais decisões tomar. |
| RF06   | Visualização de Leads             | Como **SDR**, quero ver os dados de um lead (nome, telefone, idade, emprego, interesses, etc.) nas etapas iniciais do funil (ex: Prospecção, Qualificação, Repescagem ou Follow Up), para poder negociar com ele efetivamente. |
| RF07   | Visualização de Dashboards        | Como **Usuário**, quero ver dashboards com taxas de conversão e outros dados dos clientes que minha organização possui. |
| RF08   | Envio de mensagens para Leads     | Como **SDR**, quero mandar mensagens no WhatsApp para meus leads. |
| RF09   | Gestão de Funil                   | Como **Coordenador de Vendas**, quero realizar o gerenciamento das etapas dentro do funil, podendo mover leads e monitorar o status. |
| RF10   | Automatização de Informações de Leads | Como **SDR**, quero que as informações de origem do usuário (campanha, plataforma, etc.) sejam registradas automaticamente, para economizar tempo. |
| RF11   | Automatização de Confirmação e Follow-up | Como **SDR**, quero automatizar mensagens de follow-up e confirmação, para reter o lead. |
| RF12   | Gerenciamento de Times            | Como **Gerente de Vendas**, quero cadastrar, editar e remover times de venda, para gerenciar equipes de vendas em diferentes filiais. |
| RF13   | Atribuição e Monitoramento em Times | Como **Gerente de Vendas**, quero atribuir leads a coordenadores ou membros de sua equipe e monitorar o progresso em cada etapa do funil. |
| RF14   | Comunicação Interna               | Como **Coordenador de Vendas**, quero ter acesso a ferramentas internas para comunicação com a equipe (comentários nos leads). |
| RF15   | Mudar o Status do Lead            | Como **SDR**, quero ter a capacidade de marcar o lead como "qualificado" ou "desqualificado" e mover para a próxima etapa ou arquivar. Também é possível preencher um questionário para que o lead tenha um score dentro da ferramenta. |
| RF16   | Visualização de Oportunidades     | Como **Closer**, quero ter acesso às etapas finais do funil (ex: Proposta, Negociação, Fechamento), para poder fechar negócio com o lead. |
| RF17   | Marcar Negócio como “Ganho” ou “Perdido” | Como **Closer**, quero marcar o negócio como "ganho" ou "perdido" e registrar o valor da venda, para que possa ser registrado e utilizado para decisões futuras. |

## Requisitos Não Funcionais 


| Código | Nome             | Histórias de usuário                                                                                                                       |
|--------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| RNF01  | Padronização     | Como **Desenvolvedor**, quero garantir a padronização do código escrito a fim de aumentar a organização e manutenibilidade para a equipe de desenvolvimento. |
| RNF02  | Segurança        | Como **Desenvolvedor**, quero que as senhas dos usuários sejam armazenadas de forma criptografada, para que as informações pessoais delas permaneçam seguras e privadas. |
| RNF03  | Interface gráfica| O Sistema deve ser intuitivo e responsivo, permitindo o fácil e rápido.                                                                    |
| RNF04  | Modularidade     | O sistema deve possuir uma arquitetura modular, permitindo a fácil manutenção, a correção de falhas e a implementação de novas funcionalidades. |
