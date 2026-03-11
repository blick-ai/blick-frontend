🖥️ BLICK Frontend (Dashboard & Monitoramento)
Bem-vindo ao repositório do frontend do BLICK, a interface inteligente para visualização e controle do ecossistema de detecção precoce de pragas agrícolas.

🎯 Sobre este Repositório
Este repositório é responsável pela interface do usuário (UI) e pela experiência de monitoramento (UX) do sistema BLICK. Ele atua como a ponte entre o produtor rural e os dados coletados no campo, permitindo:

Monitoramento em Tempo Real: Visualização de dashboards interativos com o status de saúde da plantação.

Alertas de Pragas: Interface intuitiva para identificação imediata de focos de infestação detectados pela IA.

Gestão de Dispositivos: Controle e verificação dos nós IoT (Edge) espalhados pela fazenda.

⚙️ Arquitetura de Software
Este projeto foi construído utilizando React 19 com o novo React Compiler para performance otimizada. A organização segue o padrão de Feature-Based Architecture:

Features: Cada funcionalidade principal (ex: Dashboards, Monitoramento de Sensores) contém seus próprios componentes e lógica isolada.

Services: Camada dedicada à comunicação com a API RESTful do BLICK Backend.

Hooks: Lógica compartilhada para consumo de dados em tempo real e estados complexos.

🚀 Tecnologias Utilizadas
React 19 (Compiler): UI de última geração com memoização automática.

Vite: Ferramenta de build rápida para uma experiência de desenvolvimento ágil.

ESLint: Padronização de código para garantir qualidade e evitar erros comuns.

Vitest: Ambiente de testes unitários integrado ao fluxo de CI/CD.