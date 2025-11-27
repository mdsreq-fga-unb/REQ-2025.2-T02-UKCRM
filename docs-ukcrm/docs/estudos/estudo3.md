# Casos de Uso

## ConnectCare

Em uma comunidade remota chamada **Vila Esperança**, onde o acesso a serviços de saúde é limitado, um grupo de desenvolvedores e ativistas sociais se reuniu para criar o *ConnectCare*. A plataforma foi projetada para superar barreiras, como a falta de transporte e informações, facilitando o acesso dos moradores a cuidados médicos.

O ambiente da **Vila Esperança** é desafiador: infraestrutura básica limitada, baixa penetração de internet e um número reduzido de profissionais de saúde. Apesar disso, a comunidade tem uma forte rede social e um espírito colaborativo, que serviram como base para o desenvolvimento do *ConnectCare*.

## Diagrama de Casos de Uso

O digrama exibe graficamente a relação entre os atores e os casos de uso e também a relação entre os casos de usos (inclusão ou extensão).

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVJlBc1tk=/?embedMode=view_only_without_ui&moveToViewport=-4009,-184,1565,1412&embedId=50812771111" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

## Identificação dos Atores
- **Paciente:** Usuário principal que busca serviços, agenda consultas e gerencia seu histórico.
- **Profissional de Saúde:** Médicos e enfermeiros que gerenciam atendimentos e acessam prontuários.
- **Agente Comunitário:** Realiza visitas domiciliares e relata condições da comunidade.
- **Organização Parceira:** ONGs ou instituições que divulgam campanhas e monitoram impacto.
- **Administrador:** Monitora indicadores, corrige erros e garante a segurança do sistema.

## Mapeamento dos Casos de Uso
Os casos de uso estão separados por Atores nas seções abaixo. Alguns casos de uso foram especificados, eles possuem um link para a página com a especificação.

### Casos de Uso - Paciente
- Manter Perfil do Paciente
- [Localizar Serviços da Saúde](./especificacoes/localizar_servicos.md)
- [Agendar Consulta](./especificacoes/agendar_consulta.md)
- Avaliar Atendimento
- [Registrar dúvidas ou reclamações](./especificacoes/registrar_duvidas.md)
- Visualizar Campanhas de Saúde

### Casos de Uso - Profissional de Saúde
- Consultar Agenda 
- Manter Perfil Profissional
- Gerenciar Prontuário Eletrônico

### Casos de Uso - Agente Comunitário
- [Gerar Relatório de Saúde Comunitária](./especificacoes/gerar_relatorio.md)
- Registrar Visita Domiciliar

### Casos de Uso - Organização Parceira
- [Gerenciar Campanhas](./especificacoes/gerenciar_campanhas.md)
- Monitorar Impacto

### Casos de Uso - Administrador
- Monitorar Painel de Indicadores
- Gerenciar Informações de Colaboradores
- [Responder Dúvidas e/ou Reclamações dos Usuários](./especificacoes/responder_duvidas.md)

## Relacionamento entre os Casos de Uso (Inclusão e Extensão)
* Fazer Login (Include)
    * Relação: Agendar Consulta uses <<\\include>> Fazer Login.   
    * Relação: Consultar Agenda uses <<\\include>> Fazer Login.
    * Relação: Gerenciar Prontuário Eletrônico uses <<\\include>> Fazer Login.
* Visualização de Mapas (Extend)  
    * Relação: Visualizar Mapa uses <<\\extend>> Localizar Serviços de Saúde.
    * Relação: Visualizar uses <<\\extend>> Visualizar Campanhas de Saúde.