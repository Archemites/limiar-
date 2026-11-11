/**
 * LIMIAR+ [ UM RPG DE SOBREVIVÊNCIA AO INDESCRITÍVEL ]
 * Base de Dados Completa Oficial extraída do livro de regras LIMIAR+.pdf
 */

window.LIMIAR_DATA = {
  meta: {
    title: "LIMIAR+",
    subtitle: "[ UM RPG DE SOBREVIVÊNCIA AO INDESCRITÍVEL ]",
    startingAttributePoints: 5,
    minAttributeBase: 0,
    maxAttributeBase: 5,
    psicometriaPenalty: -3
  },

  attributes: [
    {
      id: "vigor",
      name: "Vigor",
      color: "#ff0000",
      shortDesc: "Corpo, Força, Resistência",
      rulesDesc: "Base da Vida (Vigor + 2d6). Soma ao dano desarmado ou com arma cega. Usado no 2º passo da Defesa (1d20 + Vigor) para reduzir o dano pela metade."
    },
    {
      id: "acuidade",
      name: "Acuidade",
      color: "#ffff00",
      shortDesc: "Precisão, reflexos, atenção.",
      rulesDesc: "Usado em Iniciativa (1d20 + Acuidade), Ataques (1d20 + Acuidade) e Bloqueio na Defesa (1d20 + Acuidade)."
    },
    {
      id: "psicometria",
      name: "Psicometria",
      color: "#0000ff",
      shortDesc: "Mente e Trato Social",
      rulesDesc: "Escolha Inteligência ou Sapiência para receber o valor cheio, o outro sub-atributo fica com o valor -3."
    },
    {
      id: "esoterismo",
      name: "Esoterismo",
      color: "#ff00ff",
      shortDesc: "Afinidade com o Indizível",
      rulesDesc: "Compreensão do oculto, rituais, artefatos e fenômenos que atravessam o Véu do Limiar."
    },
    {
      id: "razao",
      name: "Razão",
      color: "#f9cb9c",
      shortDesc: "Resistência Mental",
      rulesDesc: "Base da Sanidade (Razão + 2d6). Testada ao chegar a 0 de Sanidade para evitar ficar Insano e para conter crises de Ansiedade."
    }
  ],

  professions: [
    {
      id: "policial",
      name: "POLICIAL",
      bonuses: { acuidade: 2, razao: 1 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Revólver .38, Distintivo",
      startingWeapons: ["revolver_38"],
      startingItems: [
        { name: "Distintivo Policial", category: "Equipamento", qty: 1, effect: "Identificação oficial de autoridade policial." }
      ],
      avatarPreset: "policial"
    },
    {
      id: "medico",
      name: "MÉDICO",
      bonuses: {},
      subBonuses: { inteligencia: 2, sapiencia: 0, sanidadeMax: 1, vidaMax: 0 },
      specialBonus: "+1 em Sanidade Máxima",
      equipmentText: "Kit Médico",
      startingWeapons: [],
      startingItems: [
        { name: "Kit Médico", category: "Medicinal", qty: 1, effect: "Equipamento médico completo para primeiros socorros e cirurgias de campo." }
      ],
      avatarPreset: "medico"
    },
    {
      id: "jornalista",
      name: "JORNALISTA",
      bonuses: { acuidade: 1 },
      subBonuses: { inteligencia: 0, sapiencia: 2, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Câmera Fotográfica",
      startingWeapons: [],
      startingItems: [
        { name: "Câmera Fotográfica", category: "Equipamento", qty: 1, effect: "Registra evidências visuais e eventos do Limiar." }
      ],
      avatarPreset: "investigador"
    },
    {
      id: "professor",
      name: "PROFESSOR",
      bonuses: { vigor: -1 },
      subBonuses: { inteligencia: 3, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Não começa com nada",
      startingWeapons: [],
      startingItems: [],
      avatarPreset: "academico"
    },
    {
      id: "mecanico",
      name: "MECÂNICO",
      bonuses: { acuidade: 2, vigor: 1 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Grifo (Ferramenta)",
      startingWeapons: ["ferramentas"],
      startingItems: [
        { name: "Chave Grifo Pesada", category: "Equipamento", qty: 1, effect: "Ferramenta mecânica pesada (conta como Ferramenta: 2d6 de dano)." }
      ],
      avatarPreset: "operario"
    },
    {
      id: "bombeiro",
      name: "BOMBEIRO",
      bonuses: { vigor: 2, acuidade: 1 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Machado",
      startingWeapons: ["machados"],
      startingItems: [],
      avatarPreset: "policial"
    },
    {
      id: "artista",
      name: "ARTISTA",
      bonuses: { razao: -1 },
      subBonuses: { inteligencia: 0, sapiencia: 3, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Não começa com nada extra",
      startingWeapons: [],
      startingItems: [],
      avatarPreset: "ocultista"
    },
    {
      id: "sacerdote",
      name: "SACERDOTE",
      bonuses: { razao: 2, esoterismo: 1 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "(HABILIDADE) Sermão",
      equipmentText: "Nenhum",
      startingWeapons: [],
      startingItems: [],
      avatarPreset: "sacerdote"
    },
    {
      id: "carpinteiro",
      name: "CARPINTEIRO",
      bonuses: { vigor: 2, acuidade: 1 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Martelo",
      startingWeapons: ["martelos"],
      startingItems: [],
      avatarPreset: "operario"
    },
    {
      id: "psicologo",
      name: "PSICÓLOGO",
      bonuses: {},
      subBonuses: { inteligencia: 0, sapiencia: 2, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "(HABILIDADE) Sessão de Terapia (Recupera 1d6 Sanidade por Perito, 1x por sessão)",
      equipmentText: "Nenhum",
      startingWeapons: [],
      startingItems: [],
      avatarPreset: "academico"
    },
    {
      id: "comerciante",
      name: "COMERCIANTE",
      bonuses: {},
      subBonuses: { inteligencia: 0, sapiencia: 3, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "5x Itens Psicoativos",
      startingWeapons: [],
      startingItems: [
        { name: "Cigarros de Marca", category: "Psicoativo", qty: 2, effect: "Recupera 1d8 de Sanidade." },
        { name: "Bebidas Alcoólicas", category: "Psicoativo", qty: 2, effect: "Recupera 1d12 de Sanidade (3 seguidas = Embriagado)." },
        { name: "Charuto", category: "Psicoativo", qty: 1, effect: "Recupera 1d12 de Sanidade." }
      ],
      avatarPreset: "investigador"
    },
    {
      id: "coveiro",
      name: "COVEIRO",
      bonuses: { razao: 1, esoterismo: 1 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Pá, Velas",
      startingWeapons: ["ferramentas"],
      startingItems: [
        { name: "Pá de Coveiro", category: "Equipamento", qty: 1, effect: "Ferramenta de escavação (conta como Ferramenta: 2d6 de dano)." },
        { name: "Velas (Maço)", category: "Equipamento", qty: 4, effect: "Iluminação precária no escuro." }
      ],
      avatarPreset: "ocultista"
    },
    {
      id: "eletricista",
      name: "ELETRICISTA",
      bonuses: { acuidade: 2 },
      subBonuses: { inteligencia: 1, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Chave Inglesa",
      startingWeapons: ["ferramentas"],
      startingItems: [
        { name: "Chave Inglesa", category: "Equipamento", qty: 1, effect: "Ferramenta técnica (conta como Ferramenta: 2d6 de dano)." }
      ],
      avatarPreset: "operario"
    },
    {
      id: "advogado",
      name: "ADVOGADO",
      bonuses: {},
      subBonuses: { inteligencia: 0, sapiencia: 2, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "+1 em Testes Sociais",
      equipmentText: "Não começa com nada",
      startingWeapons: [],
      startingItems: [],
      avatarPreset: "academico"
    },
    {
      id: "cacador",
      name: "CAÇADOR",
      bonuses: { vigor: 2, acuidade: 1 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Rifle .30-30, Faca de Caça",
      startingWeapons: ["winchester_30_30", "facas"],
      startingItems: [],
      avatarPreset: "veterano"
    },
    {
      id: "musico",
      name: "MÚSICO",
      bonuses: { razao: -1 },
      subBonuses: { inteligencia: 0, sapiencia: 2, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Instrumento Musical",
      startingWeapons: [],
      startingItems: [
        { name: "Instrumento Musical", category: "Equipamento", qty: 1, effect: "Instrumento acústico ou portátil do Perito." }
      ],
      avatarPreset: "ocultista"
    },
    {
      id: "enfermeiro",
      name: "ENFERMEIRO",
      bonuses: {},
      subBonuses: { inteligencia: 2, sapiencia: 0, sanidadeMax: 1, vidaMax: 0 },
      specialBonus: "+1 em Sanidade Máxima",
      equipmentText: "1x Item Medicinal",
      startingWeapons: [],
      startingItems: [
        { name: "Gaze", category: "Medicinal", qty: 1, effect: "Recupera 1d4 de vida." }
      ],
      avatarPreset: "medico"
    },
    {
      id: "apostador",
      name: "APOSTADOR",
      bonuses: { vigor: -1 },
      subBonuses: { inteligencia: 0, sapiencia: 3, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Canivete Stiletto",
      startingWeapons: ["facas"],
      startingItems: [
        { name: "Canivete Stiletto", category: "Equipamento", qty: 1, effect: "Faca ocultável (1d4 de dano + 1 Tick de Sangramento)." }
      ],
      avatarPreset: "investigador"
    },
    {
      id: "bibliotecario",
      name: "BIBLIOTECÁRIO",
      bonuses: { vigor: -1 },
      subBonuses: { inteligencia: 3, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Livro Raro",
      startingWeapons: [],
      startingItems: [
        { name: "Livro Raro", category: "Equipamento", qty: 1, effect: "Obra antiga com registros históricos ou ocultos." }
      ],
      avatarPreset: "academico"
    },
    {
      id: "veterano",
      name: "VETERANO",
      bonuses: {},
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "Vantagem em RAZÃO e ACUIDADE, +2 em Armas de Fogo",
      equipmentText: "Arma à escolha",
      startingWeapons: ["pistola_9mm"],
      startingItems: [],
      avatarPreset: "veterano"
    },
    {
      id: "pesquisador",
      name: "PESQUISADOR",
      bonuses: { vigor: -1 },
      subBonuses: { inteligencia: 3, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Não começa com nada",
      startingWeapons: [],
      startingItems: [],
      avatarPreset: "academico"
    },
    {
      id: "detetive",
      name: "DETETIVE",
      bonuses: { acuidade: 2 },
      subBonuses: { inteligencia: 0, sapiencia: 1, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Revólver, Distintivo Falso",
      startingWeapons: ["revolver_38"],
      startingItems: [
        { name: "Distintivo Falso", category: "Equipamento", qty: 1, effect: "Credencial forjada para infiltração e interrogatórios." }
      ],
      avatarPreset: "investigador"
    },
    {
      id: "motorista",
      name: "MOTORISTA",
      bonuses: { acuidade: 2, vigor: 1 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Carro, Chaves",
      startingWeapons: [],
      startingItems: [
        { name: "Carro & Chaves", category: "Equipamento", qty: 1, effect: "Veículo automotor funcional para transporte e fuga." }
      ],
      avatarPreset: "operario"
    },
    {
      id: "fotografo",
      name: "FOTÓGRAFO",
      bonuses: { acuidade: 2 },
      subBonuses: { inteligencia: 1, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Câmera com Flash",
      startingWeapons: [],
      startingItems: [
        { name: "Câmera com Flash", category: "Equipamento", qty: 1, effect: "Fotografa no escuro; o flash pode iluminar brevemente ambientes." }
      ],
      avatarPreset: "investigador"
    },
    {
      id: "fazendeiro",
      name: "FAZENDEIRO",
      bonuses: { vigor: 2, razao: 2 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Winchester .22",
      startingWeapons: ["winchester_22"],
      startingItems: [],
      avatarPreset: "veterano"
    },
    {
      id: "farmaceutico",
      name: "FARMACÊUTICO",
      bonuses: {},
      subBonuses: { inteligencia: 2, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "+1 em Recuperação Mental",
      equipmentText: "Conjunto de Tratamento Mental",
      startingWeapons: [],
      startingItems: [
        { name: "Conjunto de Tratamento Mental", category: "Medicinal", qty: 1, effect: "Fármacos psiquiátricos (+1 em Recuperação Mental)." }
      ],
      avatarPreset: "medico"
    },
    {
      id: "historiador",
      name: "HISTORIADOR",
      bonuses: { esoterismo: 1 },
      subBonuses: { inteligencia: 2, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Atlas, Bússola",
      startingWeapons: [],
      startingItems: [
        { name: "Atlas & Bússola", category: "Equipamento", qty: 1, effect: "Mapas detalhados e orientação geográfica." }
      ],
      avatarPreset: "academico"
    },
    {
      id: "criminoso_reformado",
      name: "CRIMINOSO REFORMADO",
      bonuses: { vigor: 2 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "+1 em Esquiva (Bloqueio/Defesa)",
      equipmentText: "Arma Improvisada, Gazuas",
      startingWeapons: ["canos_metal"],
      startingItems: [
        { name: "Gazuas", category: "Equipamento", qty: 1, effect: "Ferramentas para destrancar fechaduras e cadeados." }
      ],
      avatarPreset: "operario"
    },
    {
      id: "ocultista",
      name: "OCULTISTA",
      bonuses: { esoterismo: 3, razao: -1 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "Carta de Prece",
      startingWeapons: [],
      startingItems: [
        { name: "Carta de Prece", category: "Equipamento", qty: 1, effect: "Manuscrito esotérico de proteção contra o Indizível." }
      ],
      avatarPreset: "ocultista"
    },
    {
      id: "atleta",
      name: "ATLETA",
      bonuses: { vigor: 2 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "+2 em testes de Atletismo (correr, lutar, arremessar)",
      equipmentText: "Nenhum equipamento inicial",
      startingWeapons: [],
      startingItems: [],
      avatarPreset: "veterano"
    },
    {
      id: "programador",
      name: "PROGRAMADOR",
      bonuses: {},
      subBonuses: { inteligencia: 2, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "",
      equipmentText: "CYBERDECK",
      startingWeapons: [],
      startingItems: [
        { name: "CYBERDECK", category: "Equipamento", qty: 1, effect: "Terminal portátil de invasão, decodificação e análise de dados." }
      ],
      avatarPreset: "programador"
    },
    {
      id: "bom_pra_nada",
      name: "BOM-PRA-NADA",
      bonuses: { esoterismo: 5 },
      subBonuses: { inteligencia: 0, sapiencia: 0, sanidadeMax: 0, vidaMax: 0 },
      specialBonus: "Afinidade extrema com o Limiar (+5 Esoterismo)",
      equipmentText: "Nada",
      startingWeapons: [],
      startingItems: [],
      avatarPreset: "caveira"
    }
  ],

  medicinalItems: [
    { id: "gaze", name: "Gaze", category: "Medicinal", effect: "Recupera 1d4 de Vida.", dice: "1d4", healType: "vida" },
    { id: "esparadrapos", name: "Esparadrapos", category: "Medicinal", effect: "Remove 1 Tick de Sangramento." },
    { id: "antisseptico", name: "Antisséptico", category: "Medicinal", effect: "Remove 1 Tick de Infecção." },
    { id: "agua_oxigenada", name: "Água Oxigenada", category: "Medicinal", effect: "Remove todos os Ticks de Infecção; causa -1d4 de Vida.", dice: "-1d4" },
    { id: "kit_sutura", name: "Kit de Sutura", category: "Medicinal", effect: "Fecha feridas abertas." },
    { id: "alicate", name: "Alicate", category: "Medicinal", effect: "Remove estilhaços cravados na carne." },
    { id: "prozac", name: "Prozac", category: "Medicinal", effect: "Utilizado para tratamento da Depressão." },
    { id: "zoloft", name: "Zoloft", category: "Medicinal", effect: "Utilizado para tratamento de Depressão Grave." },
    { id: "ziprasidona", name: "Ziprasidona", category: "Medicinal", effect: "Utilizado para controle da Esquizofrenia." },
    { id: "clonazepam", name: "Clonazepam", category: "Medicinal", effect: "Utilizado para controle da Ansiedade." }
  ],

  psychoactiveItems: [
    { id: "cigarros_baratos", name: "Cigarros Baratos", category: "Psicoativo", effect: "Recupera 1d4 de Sanidade.", dice: "1d4", healType: "sanidade" },
    { id: "cigarros_marca", name: "Cigarros de Marca", category: "Psicoativo", effect: "Recupera 1d8 de Sanidade.", dice: "1d8", healType: "sanidade" },
    { id: "charuto", name: "Charuto", category: "Psicoativo", effect: "Recupera 1d12 de Sanidade.", dice: "1d12", healType: "sanidade" },
    { id: "narguile", name: "Narguilé", category: "Psicoativo", effect: "Recupera 3d12 de Sanidade.", dice: "3d12", healType: "sanidade" },
    { id: "balinha_lsd", name: "Balinha de LSD", category: "Psicoativo", effect: "Recupera 2d8 de Sanidade; causa 5 minutos de alucinações.", dice: "2d8", healType: "sanidade" },
    { id: "pino_cocaina", name: "Pino de Cocaína", category: "Psicoativo", effect: "Recupera 1d8 de Sanidade; causa 5 minutos de irritabilidade.", dice: "1d8", healType: "sanidade" },
    { id: "seringa_fentanila", name: "Seringa de Fentanila", category: "Psicoativo", effect: "Recupera 3d12 de Sanidade; 30% de chance de Blackout por 1 minuto.", dice: "3d12", healType: "sanidade" },
    { id: "pedra_crack", name: "Pedra de Crack", category: "Psicoativo", effect: "Recupera a Sanidade inteira; causa alucinação severa por 10 minutos.", healType: "sanidade_full" },
    { id: "pilula_md", name: "Pílula de MD", category: "Psicoativo", effect: "Anula perda de Sanidade por exposição." },
    { id: "adesivo_nicotina", name: "Adesivo de Nicotina", category: "Psicoativo", effect: "Recupera 1d6 de Sanidade, alivia sintomas de ansiedade (demora 1 min).", dice: "1d6", healType: "sanidade" },
    { id: "bebidas_alcoolicas", name: "Bebidas Alcoólicas", category: "Psicoativo", effect: "Recuperam 1d12 de Sanidade; ao consumir 3 seguidas, aplica status Embriagado.", dice: "1d12", healType: "sanidade" }
  ],

  meleeWeapons: [
    { id: "desarmado", name: "Desarmado (Punhos)", type: "Corpo-a-Corpo", damage: "1d4", addVigor: true, shotsPerTurn: "1", notes: "Soma seu Vigor ao dano." },
    { id: "facas", name: "Facas / Canivete", type: "Corpo-a-Corpo", damage: "1d4", addVigor: false, shotsPerTurn: "1", notes: "+ 1 Tick de Sangramento." },
    { id: "martelos", name: "Martelos", type: "Corpo-a-Corpo (Cega)", damage: "1d6", addVigor: true, shotsPerTurn: "1", notes: "Soma Vigor + Chance de Stun por 1 Turno." },
    { id: "ferramentas", name: "Ferramentas (Grifo/Chave)", type: "Corpo-a-Corpo (Cega)", damage: "2d6", addVigor: true, shotsPerTurn: "1", notes: "Arma contundente pesada (soma Vigor)." },
    { id: "machados", name: "Machados", type: "Corpo-a-Corpo", damage: "3d6", addVigor: false, shotsPerTurn: "1", notes: "Lâmina pesada devastadora." },
    { id: "canos_metal", name: "Canos de Metal", type: "Corpo-a-Corpo (Cega)", damage: "3d4", addVigor: true, shotsPerTurn: "1", notes: "Arma cega contundente (soma Vigor)." },
    { id: "cadeiras_mesas", name: "Cadeiras / Mesas", type: "Corpo-a-Corpo (Cega)", damage: "4d4", addVigor: true, shotsPerTurn: "1 (Uso único)", notes: "Quebra após o golpe (Uso único)." },
    { id: "objeto_cenario", name: "Objeto do Cenário", type: "Corpo-a-Corpo", damage: "1d6", addVigor: true, shotsPerTurn: "1", notes: "1d4 peq / 1d6 méd / 1d8 grd + Teste de Integridade." }
  ],

  rangedWeapons: [
    { id: "estilingue", name: "Estilingue", type: "Distância", damage: "1d6", addVigor: false, shotsPerTurn: "Até 4 tiros", maxAmmo: 4, common: true, notes: "Silencioso, até 4 tiros por turno." },
    { id: "pistola_32", name: "Pistola .32", type: "Fogo (Curta)", damage: "2d4", addVigor: false, shotsPerTurn: "Até 5 tiros", maxAmmo: 8, common: true, notes: "Até 5 tiros por turno." },
    { id: "pistola_9mm", name: "Pistola 9mm", type: "Fogo (Curta)", damage: "2d4", addVigor: false, shotsPerTurn: "Até 6 tiros", maxAmmo: 15, common: true, notes: "Até 6 tiros por turno." },
    { id: "revolver_38", name: "Revólver .38", type: "Fogo (Curta)", damage: "1d8", addVigor: false, shotsPerTurn: "Até 6 tiros", maxAmmo: 6, common: true, notes: "Até 6 tiros por turno." },
    { id: "revolver_44", name: "Revólver .44", type: "Fogo (Curta)", damage: "1d12", addVigor: false, shotsPerTurn: "Até 6 tiros", maxAmmo: 6, common: false, notes: "Até 6 tiros por turno." },
    { id: "revolver_45", name: "Revólver .45", type: "Fogo (Curta)", damage: "2d8", addVigor: false, shotsPerTurn: "Até 6 tiros", maxAmmo: 6, common: false, notes: "Até 6 tiros por turno." },
    { id: "revolver_357", name: "Revólver .357", type: "Fogo (Curta)", damage: "2d12", addVigor: false, shotsPerTurn: "Até 5 tiros", maxAmmo: 6, common: false, notes: "Até 5 tiros por turno." },
    { id: "espingarda", name: "Espingarda", type: "Fogo (Longa)", damage: "5d4", addVigor: false, shotsPerTurn: "Apenas 2 tiros", maxAmmo: 2, common: true, notes: "Apenas 2 tiros por turno." },
    { id: "espingarda_ex", name: "Espingarda (EX)", type: "Fogo (Longa)", damage: "3d8", addVigor: false, shotsPerTurn: "Apenas 2 tiros", maxAmmo: 6, common: false, notes: "Apenas 2 tiros por turno." },
    { id: "espingarda_bl", name: "Espingarda (BL)", type: "Fogo (Longa)", damage: "3d12", addVigor: false, shotsPerTurn: "Apenas 1 tiro", maxAmmo: 5, common: false, notes: "Balote pesado; apenas 1 tiro por turno." },
    { id: "mini_metralhadora", name: "Mini-Metralhadora", type: "Automática", damage: "1d4", addVigor: false, shotsPerTurn: "Até 16 tiros", maxAmmo: 32, common: false, notes: "1d4 por tiro, até 16 tiros por turno." },
    { id: "submetralhadora", name: "Submetralhadora", type: "Automática", damage: "1d8", addVigor: false, shotsPerTurn: "Até 16 tiros", maxAmmo: 32, common: false, notes: "1d8 por tiro, até 16 tiros por turno." },
    { id: "metralhadora_pesada", name: "Metralhadora Pesada", type: "Automática", damage: "2d8", addVigor: false, shotsPerTurn: "Até 32 tiros", maxAmmo: 64, common: false, notes: "2d8 por tiro, até 32 tiros por turno." },
    { id: "winchester_22", name: "Winchester .22", type: "Rifle", damage: "3d10", addVigor: false, shotsPerTurn: "Até 5 tiros", maxAmmo: 10, common: true, notes: "3d10 por tiro, até 5 tiros por turno." },
    { id: "winchester_30_30", name: "Winchester .30-30", type: "Rifle", damage: "3d12", addVigor: false, shotsPerTurn: "Apenas 1 tiro", maxAmmo: 6, common: true, notes: "3d12 por tiro, apenas 1 tiro por turno." },
    { id: "remington_30_06", name: "Remington .30-06", type: "Rifle", damage: "4d12", addVigor: false, shotsPerTurn: "Apenas 1 tiro", maxAmmo: 5, common: false, notes: "4d12 por tiro, apenas 1 tiro por turno." },
    { id: "remington_222", name: ".222 Remington", type: "Rifle", damage: "2d20", addVigor: false, shotsPerTurn: "Apenas 1 tiro", maxAmmo: 5, common: false, notes: "2d20 por tiro, apenas 1 tiro por turno." },
    { id: "winchester_270", name: ".270 Winchester", type: "Rifle", damage: "3d20", addVigor: false, shotsPerTurn: "Apenas 1 tiro", maxAmmo: 5, common: false, notes: "3d20 por tiro, apenas 1 tiro por turno." },
    { id: "springfield_30_06", name: "Springfield .30-06", type: "Rifle Pesado", damage: "4d20", addVigor: false, shotsPerTurn: "1 tiro / 2 turnos", maxAmmo: 5, common: false, notes: "4d20 por tiro, 1 tiro a cada 2 TURNOS." },
    { id: "fuzil_caca", name: "Fuzil de Caça", type: "Fuzil", damage: "2d6", addVigor: false, shotsPerTurn: "Até 12 tiros", maxAmmo: 12, common: true, notes: "2d6 por tiro, até 12 tiros por turno." },
    { id: "fuzil_assalto", name: "Fuzil de Assalto", type: "Fuzil", damage: "3d8", addVigor: false, shotsPerTurn: "Até 12 tiros", maxAmmo: 30, common: false, notes: "3d8 por tiro, até 12 tiros por turno." },
    { id: "arcos", name: "Arco", type: "Arquearia", damage: "1d12", addVigor: false, shotsPerTurn: "Até 3 flechas", maxAmmo: 12, common: true, notes: "1d12 por flecha, até 3 flechas por turno." },
    { id: "bestas", name: "Besta", type: "Arquearia", damage: "2d6", addVigor: false, shotsPerTurn: "Até 2 virotes", maxAmmo: 10, common: true, notes: "2d6 por virote, até 2 virotes por turno." }
  ],

  sanityThresholds: [
    { min: 1, max: 999, code: "Acima de 0", label: "<Estável>", effect: "Consciência preservada deste lado do Véu.", color: "#ffffff" },
    { min: 0, max: 0, code: "Chegar a 0", label: "<Teste de Razão: falha = Insano>", effect: "Se falhar, você fica Insano e passa a perder o dobro de Sanidade.", color: "#ff00ff" },
    { min: -10, max: -1, code: "-1 a -10", label: "<Paranoia e Alucinações>", effect: "Vultos, desconfiança aguda. (3 dias entre -5 e 1 pode gerar Distúrbio).", color: "#ffffff" },
    { min: -20, max: -11, code: "-11 a -20", label: "<Psicose grave e agressividade>", effect: "Surtos violentos e perda de contato com a realidade.", color: "#ffffff" },
    { min: -40, max: -21, code: "-21 a -40", label: "<Dificuldade motora(-1 Acuidade) e toques fantasmas>", effect: "Penalidade de -1 em Acuidade; sensação constante de mãos invisíveis.", color: "#ffffff", penaltyAcuidade: -1 },
    { min: -60, max: -41, code: "-41 a -60", label: "<Dano cerebral permanente -5 em todos os testes>", effect: "Colapso neural irreversível: -5 em TODOS os testes.", color: "#ffffff", penaltyAll: -5 },
    { min: -999, max: -61, code: "-61 ou menos", label: "< M O R T E >", effect: "Sua mente foi devorada pelo Limiar.", color: "#85200c" }
  ],

  disorders: [
    {
      id: "depressao",
      name: "Depressão",
      rule: "o Espectador pede teste de Psicometria antes de decisões em grupo. Se falhar, você não segue o combinado",
      treatment: "Terapia + Prozac / Zoloft"
    },
    {
      id: "esquizofrenia",
      name: "Esquizofrenia",
      rule: "sussurros e alucinações. Em combate, você pode perder o turno",
      treatment: "Terapia + Ziprasidona"
    },
    {
      id: "ansiedade",
      name: "Ansiedade",
      rule: "insônia, e o descanso longo recupera só metade. Em combate, pode ter uma crise(teste de razão para evitar)",
      treatment: "Terapia + Clonazepam / Adesivo de Nicotina"
    }
  ],

  statuses: [
    { id: "insano", name: "Insano", rule: "perde Sanidade em dobro", color: "#ff00ff" },
    { id: "sangrando", name: "Sangrando", rule: "1d4 de dano a cada 5 minutos.", color: "#ffffff", hasTicks: true },
    { id: "envenenado", name: "Envenenado", rule: "1d4 de dano a cada 10 minutos.", color: "#ffffff" },
    { id: "em_chamas", name: "Em chamas", rule: "1d8 por turno", color: "#ffffff" },
    { id: "atordoado", name: "Atordoado", rule: "perde o próximo turno", color: "#ffffff" },
    { id: "infeccao", name: "Infecção", rule: "sem tratamento por 1 hora, gangrena e perde um membro. Toma 1d10 de dano.", color: "#ffffff", hasTicks: true },
    { id: "embriagado", name: "Embriagado", rule: "ao consumir 3 bebidas alcoólicas seguidas.", color: "#ffffff" }
  ],

  randomNames: [
    "Arthur Valente", "Helena Vianna", "Dante Moreira", "Beatriz Kovács",
    "César Albuquerque", "Clara Мендес", "Vicente Nogueira", "Lívia Ferraz",
    "Samuel Krauss", "Marta Vasconcelos", "Elias Fontes", "Irene Castel",
    "Heitor Barreto", "Sônia Delacroix", "Rodrigo Bastos", "Camila Siqueira"
  ],

  randomBackstories: [
    "Ex-plantonista do turno da madrugada que encontrou arquivos apagados no porão do hospital municipal.",
    "Perdeu o parceiro de investigação em um galpão trancado por dentro onde o tempo parou por três horas.",
    "Colecionava fitas cassete de estações fantasma até ouvir a própria voz transmitindo de 1984.",
    "Sobreviveu a um incêndio inexplicável onde as chamas eram frias e deixavam cinzas geométricas.",
    "Sempre teve insônia crônica, mas descobriu que só enxerga a cidade real quando passa três dias sem dormir.",
    "Herdou uma chave enferrujada que abre uma porta diferente a cada lua nova no centro velho."
  ],

  randomContacts: [
    "Viu o céu se abrir como um monitor CRT rachado sobre a rodovia BR-116 e algo com olhos demais encarou de volta.",
    "Atendeu uma ocorrência em um apartamento vazio onde as sombras das pessoas ainda caminhavam pelas paredes.",
    "Ouviu uma frequência impossível no rádio que fez todos os espelhos da sala refletirem outro lugar.",
    "Tocou em um artefato úmido dentro de uma vala rasa e sentiu memórias de uma vida que nunca existiu.",
    "Encontrou uma escadaria descendo no meio da mata fechada; no último degrau, viu uma fenda para o Limiar."
  ]
};
