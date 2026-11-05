document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTOS PRINCIPAIS
    // =====================================

    const idiomaSelect = document.getElementById("idioma");

    const estadoSelect = document.getElementById("estado");
    const cidadeSelect = document.getElementById("cidade");
    const botaoBuscar = document.getElementById("buscarServicos");

    const mensagemBusca = document.getElementById("mensagemBusca");
    const resultadosServicos = document.getElementById("resultadosServicos");
    const gradeResultados = document.getElementById("gradeResultados");
    const localSelecionado = document.getElementById("localSelecionado");

    const aumentarTexto = document.getElementById("aumentarTexto");
    const diminuirTexto = document.getElementById("diminuirTexto");
    const botaoContraste = document.getElementById("contraste");
    const botaoLeituraSimples = document.getElementById("leituraSimples");

    const botaoAudio = document.getElementById("botaoAudio");
    const painelAudio = document.getElementById("painelAudio");
    const botaoReproduzir = document.getElementById("reproduzir");
    const botaoPausar = document.getElementById("pausar");
    const botaoEncerrar = document.getElementById("encerrar");

    // =====================================
    // IDIOMAS
    // =====================================

    const traducoes = {
        pt: {
            estado: "Selecione um estado",
            cidade: "Selecione primeiro o estado",
            carregandoEstados: "Carregando estados...",
            carregandoCidades: "Carregando municípios...",
            erroEstados: "Não foi possível carregar os estados. Tente novamente.",
            erroCidades: "Não foi possível carregar os municípios. Tente novamente.",
            selecioneCidade: "Selecione um município",
            selecioneLocal: "Selecione o estado e o município para continuar.",
            buscando: "Preparando os resultados...",
            resultadoLocal: "Local selecionado:",
            saude: "Saúde",
            assistencia: "Assistência social",
            energia: "Energia elétrica",
            agua: "Água e saneamento",
            educacao: "Educação",
            outros: "Outros serviços",
            descricaoSaude: "Encontre unidades de saúde, UBS, hospitais e outros atendimentos.",
            descricaoAssistencia: "Procure CRAS, CREAS e locais de atendimento social.",
            descricaoEnergia: "Encontre agências e pontos de atendimento de energia elétrica.",
            descricaoAgua: "Procure locais de atendimento de água e saneamento.",
            descricaoEducacao: "Encontre escolas, instituições de ensino e outros serviços educacionais.",
            descricaoOutros: "Pesquise outros serviços públicos disponíveis no município.",
            abrirMaps: "Ver no Google Maps",
            resultadoCriado: "Escolha uma categoria para consultar os locais no Google Maps.",
            audioAberto: "Abrir leitura em voz alta",
            audioFechado: "Fechar leitura em voz alta"
        },

        en: {
            estado: "Select a state",
            cidade: "Select the state first",
            carregandoEstados: "Loading states...",
            carregandoCidades: "Loading municipalities...",
            erroEstados: "Could not load states. Please try again.",
            erroCidades: "Could not load municipalities. Please try again.",
            selecioneCidade: "Select a municipality",
            selecioneLocal: "Select the state and municipality to continue.",
            buscando: "Preparing results...",
            resultadoLocal: "Selected location:",
            saude: "Healthcare",
            assistencia: "Social assistance",
            energia: "Electricity",
            agua: "Water and sanitation",
            educacao: "Education",
            outros: "Other services",
            descricaoSaude: "Find health centers, clinics, hospitals and other services.",
            descricaoAssistencia: "Find social assistance centers and social services.",
            descricaoEnergia: "Find electricity agencies and service locations.",
            descricaoAgua: "Find water and sanitation service locations.",
            descricaoEducacao: "Find schools, educational institutions and other services.",
            descricaoOutros: "Search for other public services in the municipality.",
            abrirMaps: "View on Google Maps",
            resultadoCriado: "Choose a category to find locations on Google Maps.",
            audioAberto: "Open read aloud",
            audioFechado: "Close read aloud"
        },

        es: {
            estado: "Seleccione un estado",
            cidade: "Seleccione primero el estado",
            carregandoEstados: "Cargando estados...",
            carregandoCidades: "Cargando municipios...",
            erroEstados: "No se pudieron cargar los estados. Inténtelo de nuevo.",
            erroCidades: "No se pudieron cargar los municipios. Inténtelo de nuevo.",
            selecioneCidade: "Seleccione un municipio",
            selecioneLocal: "Seleccione el estado y el municipio para continuar.",
            buscando: "Preparando los resultados...",
            resultadoLocal: "Lugar seleccionado:",
            saude: "Salud",
            assistencia: "Asistencia social",
            energia: "Energía eléctrica",
            agua: "Agua y saneamiento",
            educacao: "Educación",
            outros: "Otros servicios",
            descricaoSaude: "Encuentre centros de salud, hospitales y otros servicios.",
            descricaoAssistencia: "Busque centros de asistencia social y otros servicios.",
            descricaoEnergia: "Encuentre agencias y puntos de atención de energía eléctrica.",
            descricaoAgua: "Busque lugares de atención de agua y saneamiento.",
            descricaoEducacao: "Encuentre escuelas, instituciones educativas y otros servicios.",
            descricaoOutros: "Busque otros servicios públicos disponibles en el municipio.",
            abrirMaps: "Ver en Google Maps",
            resultadoCriado: "Elija una categoría para consultar lugares en Google Maps.",
            audioAberto: "Abrir lectura en voz alta",
            audioFechado: "Cerrar lectura en voz alta"
        }
    };

    let idiomaAtual = localStorage.getItem("idioma") || "pt";

    if (!traducoes[idiomaAtual]) {
        idiomaAtual = "pt";
    }

    // =====================================
    // APLICAR IDIOMA
    // =====================================

    function alterarIdioma(novoIdioma) {

        idiomaAtual = novoIdioma;

        const idioma = traducoes[idiomaAtual];

        document.documentElement.lang =
            idiomaAtual === "pt" ? "pt-BR" : idiomaAtual;

        document.querySelectorAll("[data-pt]").forEach(elemento => {

            const texto = elemento.getAttribute(`data-${idiomaAtual}`);

            if (texto !== null) {
                elemento.textContent = texto;
            }

        });

        if (idiomaSelect) {
            idiomaSelect.value = idiomaAtual;
        }

        localStorage.setItem("idioma", idiomaAtual);

        atualizarOpcoesLocalizacao();

        if (localSelecionado && cidadeSelect && estadoSelect) {
            if (cidadeSelect.value && estadoSelect.value) {
                atualizarTextoLocalSelecionado();
            }
        }

        atualizarBotaoAudio();
    }

    if (idiomaSelect) {

        idiomaSelect.value = idiomaAtual;

        idiomaSelect.addEventListener("change", () => {
            alterarIdioma(idiomaSelect.value);
        });

    }

    // =====================================
    // TRADUÇÃO DOS CAMPOS DE LOCALIZAÇÃO
    // =====================================

    function atualizarOpcoesLocalizacao() {

        if (!estadoSelect || !cidadeSelect) {
            return;
        }

        const idioma = traducoes[idiomaAtual];

        const primeiraOpcaoEstado = estadoSelect.querySelector(
            'option[value=""]'
        );

        const primeiraOpcaoCidade = cidadeSelect.querySelector(
            'option[value=""]'
        );

        if (primeiraOpcaoEstado) {

            if (estadoSelect.disabled) {
                primeiraOpcaoEstado.textContent = idioma.carregandoEstados;
            } else {
                primeiraOpcaoEstado.textContent = idioma.estado;
            }

        }

        if (primeiraOpcaoCidade) {

            if (cidadeSelect.disabled && estadoSelect.value) {
                primeiraOpcaoCidade.textContent = idioma.carregandoCidades;
            } else if (!estadoSelect.value) {
                primeiraOpcaoCidade.textContent = idioma.cidade;
            } else {
                primeiraOpcaoCidade.textContent = idioma.selecioneCidade;
            }

        }

    }

    // =====================================
    // ACESSIBILIDADE - TAMANHO DO TEXTO
    // =====================================

    let escalaTexto = Number(localStorage.getItem("escalaTexto")) || 1;

    function aplicarEscalaTexto() {

        escalaTexto = Math.max(0.8, Math.min(1.5, escalaTexto));

        document.documentElement.style.setProperty(
            "--font-scale",
            escalaTexto
        );

        localStorage.setItem("escalaTexto", escalaTexto);

    }

    aplicarEscalaTexto();

    if (aumentarTexto) {

        aumentarTexto.addEventListener("click", () => {

            escalaTexto += 0.1;
            aplicarEscalaTexto();

        });

    }

    if (diminuirTexto) {

        diminuirTexto.addEventListener("click", () => {

            escalaTexto -= 0.1;
            aplicarEscalaTexto();

        });

    }

    // =====================================
    // ACESSIBILIDADE - ALTO CONTRASTE
    // =====================================

    let contrasteAtivo =
        localStorage.getItem("altoContraste") === "true";

    function aplicarContraste() {

        document.body.classList.toggle(
            "alto-contraste",
            contrasteAtivo
        );

        if (botaoContraste) {
            botaoContraste.setAttribute(
                "aria-pressed",
                contrasteAtivo
            );
        }

        localStorage.setItem("altoContraste", contrasteAtivo);

    }

    aplicarContraste();

    if (botaoContraste) {

        botaoContraste.addEventListener("click", () => {

            contrasteAtivo = !contrasteAtivo;
            aplicarContraste();

        });

    }

    // =====================================
    // ACESSIBILIDADE - LEITURA SIMPLIFICADA
    // =====================================

    let leituraSimplesAtiva =
        localStorage.getItem("leituraSimples") === "true";

    function aplicarLeituraSimples() {

        document.body.classList.toggle(
            "leitura-simples",
            leituraSimplesAtiva
        );

        if (botaoLeituraSimples) {
            botaoLeituraSimples.setAttribute(
                "aria-pressed",
                leituraSimplesAtiva
            );
        }

        localStorage.setItem(
            "leituraSimples",
            leituraSimplesAtiva
        );

    }

    aplicarLeituraSimples();

    if (botaoLeituraSimples) {

        botaoLeituraSimples.addEventListener("click", () => {

            leituraSimplesAtiva = !leituraSimplesAtiva;
            aplicarLeituraSimples();

        });

    }

    // =====================================
    // API DO IBGE - ESTADOS
    // =====================================

    let estadosCarregados = [];
    let cidadesCarregadas = [];
    let numeroRequisicaoCidades = 0;

    async function carregarEstados() {

        if (!estadoSelect || !cidadeSelect) {
            return;
        }

        estadoSelect.disabled = true;
        cidadeSelect.disabled = true;

        estadoSelect.innerHTML = "";
        cidadeSelect.innerHTML = "";

        adicionarOpcao(estadoSelect, "", traducoes[idiomaAtual].carregandoEstados);
        adicionarOpcao(cidadeSelect, "", traducoes[idiomaAtual].cidade);

        try {

            const resposta = await fetch(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
            );

            if (!resposta.ok) {
                throw new Error("Erro ao carregar estados.");
            }

            estadosCarregados = await resposta.json();

            preencherEstados();

            estadoSelect.disabled = false;

        } catch (erro) {

            console.error("Erro ao carregar estados:", erro);

            estadoSelect.innerHTML = "";

            adicionarOpcao(
                estadoSelect,
                "",
                traducoes[idiomaAtual].erroEstados
            );

            if (mensagemBusca) {
                mensagemBusca.textContent =
                    traducoes[idiomaAtual].erroEstados;
            }

        }

    }

    function preencherEstados() {

        if (!estadoSelect) {
            return;
        }

        estadoSelect.innerHTML = "";

        adicionarOpcao(
            estadoSelect,
            "",
            traducoes[idiomaAtual].estado
        );

        estadosCarregados.forEach(estado => {

            const opcao = document.createElement("option");

            opcao.value = estado.id;
            opcao.textContent = estado.nome;
            opcao.dataset.sigla = estado.sigla;

            estadoSelect.appendChild(opcao);

        });

    }

    // =====================================
    // API DO IBGE - MUNICÍPIOS
    // =====================================

    async function carregarCidades(idEstado) {

        if (!cidadeSelect || !botaoBuscar) {
            return;
        }

        const requisicaoAtual = ++numeroRequisicaoCidades;

        cidadeSelect.disabled = true;
        botaoBuscar.disabled = true;

        cidadeSelect.innerHTML = "";

        adicionarOpcao(
            cidadeSelect,
            "",
            traducoes[idiomaAtual].carregandoCidades
        );

        esconderResultados();

        try {

            const resposta = await fetch(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idEstado}/municipios?orderBy=nome`
            );

            if (!resposta.ok) {
                throw new Error("Erro ao carregar municípios.");
            }

            const cidades = await resposta.json();

            // Evita que uma resposta antiga substitua a seleção mais recente.
            if (requisicaoAtual !== numeroRequisicaoCidades) {
                return;
            }

            cidadesCarregadas = cidades;

            cidadeSelect.innerHTML = "";

            adicionarOpcao(
                cidadeSelect,
                "",
                traducoes[idiomaAtual].selecioneCidade
            );

            cidades.forEach(cidade => {

                const opcao = document.createElement("option");

                opcao.value = cidade.id;
                opcao.textContent = cidade.nome;

                cidadeSelect.appendChild(opcao);

            });

            cidadeSelect.disabled = false;

        } catch (erro) {

            if (requisicaoAtual !== numeroRequisicaoCidades) {
                return;
            }

            console.error("Erro ao carregar municípios:", erro);

            cidadeSelect.innerHTML = "";

            adicionarOpcao(
                cidadeSelect,
                "",
                traducoes[idiomaAtual].erroCidades
            );

            if (mensagemBusca) {
                mensagemBusca.textContent =
                    traducoes[idiomaAtual].erroCidades;
            }

        }

    }

    function adicionarOpcao(select, valor, texto) {

        const opcao = document.createElement("option");

        opcao.value = valor;
        opcao.textContent = texto;

        select.appendChild(opcao);

    }

    // =====================================
    // EVENTOS DE ESTADO E MUNICÍPIO
    // =====================================

    if (estadoSelect) {

        estadoSelect.addEventListener("change", () => {

            numeroRequisicaoCidades++;

            const idEstado = estadoSelect.value;

            cidadeSelect.innerHTML = "";

            adicionarOpcao(
                cidadeSelect,
                "",
                traducoes[idiomaAtual].cidade
            );

            cidadeSelect.disabled = true;

            botaoBuscar.disabled = true;

            if (mensagemBusca) {
                mensagemBusca.textContent = "";
            }

            esconderResultados();

            if (idEstado) {
                carregarCidades(idEstado);
            }

        });

    }

    if (cidadeSelect) {

        cidadeSelect.addEventListener("change", () => {

            botaoBuscar.disabled = !cidadeSelect.value;

            esconderResultados();

            if (mensagemBusca) {
                mensagemBusca.textContent = "";
            }

        });

    }

    // =====================================
    // CATEGORIAS DE SERVIÇOS
    // =====================================

    const categorias = [
        {
            chave: "saude",
            busca: "posto de saúde UBS hospital"
        },
        {
            chave: "assistencia",
            busca: "CRAS CREAS assistência social"
        },
        {
            chave: "energia",
            busca: "atendimento companhia de energia elétrica"
        },
        {
            chave: "agua",
            busca: "atendimento água saneamento"
        },
        {
            chave: "educacao",
            busca: "escolas públicas secretaria de educação"
        },
        {
            chave: "outros",
            busca: "serviços públicos prefeitura atendimento"
        }
    ];

    // =====================================
    // ATUALIZAR LOCAL SELECIONADO
    // =====================================

    function atualizarTextoLocalSelecionado() {

        if (!localSelecionado || !estadoSelect || !cidadeSelect) {
            return;
        }

        const opcaoEstado =
            estadoSelect.options[estadoSelect.selectedIndex];

        const opcaoCidade =
            cidadeSelect.options[cidadeSelect.selectedIndex];

        if (!opcaoEstado || !opcaoCidade) {
            return;
        }

        const nomeEstado = opcaoEstado.textContent;
        const siglaEstado = opcaoEstado.dataset.sigla || "";
        const nomeCidade = opcaoCidade.textContent;

        localSelecionado.textContent =
            `${traducoes[idiomaAtual].resultadoLocal} ${nomeCidade} - ${siglaEstado || nomeEstado}`;

    }

    // =====================================
    // CRIAR CARTÕES DE SERVIÇOS
    // =====================================

    function criarCartoesServicos(nomeCidade, siglaEstado) {

        if (!gradeResultados) {
            return;
        }

        gradeResultados.innerHTML = "";

        categorias.forEach(categoria => {

            const textos = traducoes[idiomaAtual];

            const cartao = document.createElement("article");
            cartao.className = "cartao-servico";

            const titulo = document.createElement("h3");
            titulo.textContent = textos[categoria.chave];

            const descricao = document.createElement("p");
            descricao.textContent =
                textos[`descricao${categoria.chave.charAt(0).toUpperCase()}${categoria.chave.slice(1)}`];

            const link = document.createElement("a");

            const pesquisa = `${categoria.busca} ${nomeCidade} ${siglaEstado} Paraná Brasil`;

            link.href =
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pesquisa)}`;

            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = textos.abrirMaps;

            cartao.appendChild(titulo);
            cartao.appendChild(descricao);
            cartao.appendChild(link);

            gradeResultados.appendChild(cartao);

        });

    }

    // =====================================
    // BUSCAR SERVIÇOS
    // =====================================

    if (botaoBuscar) {

        botaoBuscar.addEventListener("click", () => {

            if (!estadoSelect.value || !cidadeSelect.value) {

                if (mensagemBusca) {
                    mensagemBusca.textContent =
                        traducoes[idiomaAtual].selecioneLocal;
                }

                return;

            }

            const opcaoEstado =
                estadoSelect.options[estadoSelect.selectedIndex];

            const opcaoCidade =
                cidadeSelect.options[cidadeSelect.selectedIndex];

            const nomeEstado = opcaoEstado.textContent;
            const siglaEstado = opcaoEstado.dataset.sigla || "";
            const nomeCidade = opcaoCidade.textContent;

            if (mensagemBusca) {
                mensagemBusca.textContent =
                    traducoes[idiomaAtual].buscando;
            }

            criarCartoesServicos(nomeCidade, siglaEstado);

            atualizarTextoLocalSelecionado();

            resultadosServicos.hidden = false;

            if (mensagemBusca) {
                mensagemBusca.textContent =
                    traducoes[idiomaAtual].resultadoCriado;
            }

            resultadosServicos.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }

    // =====================================
    // ESCONDER RESULTADOS
    // =====================================

    function esconderResultados() {

        if (resultadosServicos) {
            resultadosServicos.hidden = true;
        }

        if (gradeResultados) {
            gradeResultados.innerHTML = "";
        }

    }

    // =====================================
    // LEITURA EM VOZ ALTA
    // =====================================

    function atualizarBotaoAudio() {

        if (!botaoAudio) {
            return;
        }

        const painelAberto =
            painelAudio && !painelAudio.hidden;

        botaoAudio.setAttribute(
            "aria-label",
            painelAberto
                ? traducoes[idiomaAtual].audioFechado
                : traducoes[idiomaAtual].audioAberto
        );

    }

    if (botaoAudio && painelAudio) {

        botaoAudio.addEventListener("click", () => {

            painelAudio.hidden = !painelAudio.hidden;

            botaoAudio.setAttribute(
                "aria-expanded",
                !painelAudio.hidden
            );

            atualizarBotaoAudio();

        });

    }

    if (botaoReproduzir) {

        botaoReproduzir.addEventListener("click", () => {

            if (!("speechSynthesis" in window)) {
                alert("Seu navegador não oferece suporte à leitura em voz alta.");
                return;
            }

            window.speechSynthesis.cancel();

            const conteudo = document.querySelector("main");

            if (!conteudo) {
                return;
            }

            const texto = conteudo.innerText;

            const leitura = new SpeechSynthesisUtterance(texto);

            const idiomasVoz = {
                pt: "pt-BR",
                en: "en-US",
                es: "es-ES"
            };

            leitura.lang = idiomasVoz[idiomaAtual];
            leitura.rate = 0.95;

            window.speechSynthesis.speak(leitura);

        });

    }

    if (botaoPausar) {

        botaoPausar.addEventListener("click", () => {

            if ("speechSynthesis" in window) {
                window.speechSynthesis.pause();
            }

        });

    }

    if (botaoEncerrar) {

        botaoEncerrar.addEventListener("click", () => {

            if ("speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }

        });

    }

    // =====================================
    // INICIALIZAÇÃO
    // =====================================

    alterarIdioma(idiomaAtual);

    carregarEstados();

    window.addEventListener("beforeunload", () => {

        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

    });

});