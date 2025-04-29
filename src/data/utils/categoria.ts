export const categorias = {
    ["loja-de-roupas"]: {
        nome: "Loja de Roupas",
        cadastroDeProduto: [
            {
                id: 'nome',
                tipo: 'text',
                textoLabel: 'Informe o nome do produto:'
            },
            {
                id: 'categoria',
                tipo: 'select',
                options: [{ valor: '', texto: 'Selecione' }, { valor: 'camisa', texto: 'Camisas' }, { valor: 'bone', texto: 'Bonés' }, { valor: 'agasalhos', texto: 'Agasalhos' }],
                textoLabel: 'Selecione a categoria do produto:'
            },
            {
                id: 'quantidade',
                tipo: 'text',
                textoLabel: 'Informe quantidade do produto:'
            },
            {
                id: 'tamanho',
                tipo: 'select',
                options: [{ valor: '', texto: 'Selecione' }, { valor: 'pp', texto: 'PP' }, { valor: 'p', texto: 'P' }, { valor: 'm', texto: 'M' }, { valor: 'g', texto: 'G' }, { valor: 'GG', texto: 'GG' }, { valor: 'un', texto: 'UN' }],
                textoLabel: 'Selecione o tamanho:'
            },
            {
                id: 'precoUnitario',
                tipo: 'text',
                textoLabel: 'Informe o preço unitário:'
            },
            {
                id: 'precoUnitarioVenda',
                tipo: 'text',
                textoLabel: 'Informe o valor de venda:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Informe a data:'
            },
        ],
        cadastroDeVenda: [
            {
                id: 'precoUnitario',
                tipo: 'text',
                textoLabel: 'Preço Unitário:'
            },
            {
                id: 'precoUnitarioVenda',
                tipo: 'text',
                textoLabel: 'Preço Unitário de Venda:'
            },
            {
                id: 'desconto',
                tipo: 'text',
                textoLabel: 'Desconto:'
            },
            {
                id: 'valorFinalDaVenda',
                tipo: 'text',
                textoLabel: 'Valor final da venda:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data da venda:'
            },
        ],
        cadastroDeDespesa: [
            {
                id: 'nome',
                tipo: 'text',
                textoLabel: 'Nome da despesa:'
            },
            {
                id: 'valorDaDespesa',
                tipo: 'text',
                textoLabel: 'Valor da despesa:'
            },
            {
                id: 'formaDePagamento',
                tipo: 'text',
                textoLabel: 'Forma de pagamento:'
            },
            {
                id: 'funcionarioQuePagou',
                tipo: 'text',
                textoLabel: 'Funcionário que pagou:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data da venda:'
            },
            {
                id: 'categoriaDaDespesa',
                tipo: 'select',
                options: [{ valor: '', texto: 'Selecione' }, { valor: 'fixo', texto: 'Fixo' }, { valor: 'variavel', texto: 'Variavel' },],
                textoLabel: 'Categoria da despesa:'
            },
        ]
    },
    eletronicos: {
        nome: "Loja de Eletrônicos",
        cadastroDeProduto: [
            {
                id: 'nome',
                tipo: 'text',
                textoLabel: 'Informe o nome do produto:'
            },
            {
                id: 'categoria',
                tipo: 'select',
                options: [
                    { valor: '', texto: 'Selecione' },
                    { valor: 'smartphone', texto: 'Smartphone' },
                    { valor: 'notebook', texto: 'Notebook' },
                    { valor: 'tablet', texto: 'Tablet' },
                    { valor: 'acessorio', texto: 'Acessório' },
                    { valor: 'televisao', texto: 'Televisão' }
                ],
                textoLabel: 'Selecione a categoria do produto:'
            },
            {
                id: 'marca',
                tipo: 'text',
                textoLabel: 'Informe a marca do produto:'
            },
            {
                id: 'modelo',
                tipo: 'text',
                textoLabel: 'Informe o modelo do produto:'
            },
            {
                id: 'quantidade',
                tipo: 'text',
                textoLabel: 'Informe a quantidade do produto:'
            },
            {
                id: 'precoUnitario',
                tipo: 'text',
                textoLabel: 'Informe o preço unitário:'
            },
            {
                id: 'precoUnitarioVenda',
                tipo: 'text',
                textoLabel: 'Informe o valor de venda:'
            },
            {
                id: 'garantia',
                tipo: 'text',
                textoLabel: 'Informe o tempo de garantia (meses):'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Informe a data de cadastro:'
            },
        ],
        cadastroDeVenda: [
            {
                id: 'precoUnitario',
                tipo: 'text',
                textoLabel: 'Preço Unitário:'
            },
            {
                id: 'precoUnitarioVenda',
                tipo: 'text',
                textoLabel: 'Preço Unitário de Venda:'
            },
            {
                id: 'desconto',
                tipo: 'text',
                textoLabel: 'Desconto aplicado:'
            },
            {
                id: 'valorFinalDaVenda',
                tipo: 'text',
                textoLabel: 'Valor final da venda:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data da venda:'
            },
        ],
        cadastroDeDespesa: [
            {
                id: 'nome',
                tipo: 'text',
                textoLabel: 'Nome da despesa:'
            },
            {
                id: 'valorDaDespesa',
                tipo: 'text',
                textoLabel: 'Valor da despesa:'
            },
            {
                id: 'formaDePagamento',
                tipo: 'text',
                textoLabel: 'Forma de pagamento:'
            },
            {
                id: 'funcionarioQuePagou',
                tipo: 'text',
                textoLabel: 'Funcionário que realizou o pagamento:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data da despesa:'
            },
            {
                id: 'categoriaDaDespesa',
                tipo: 'select',
                options: [
                    { valor: '', texto: 'Selecione' },
                    { valor: 'fixo', texto: 'Fixo' },
                    { valor: 'variavel', texto: 'Variável' }
                ],
                textoLabel: 'Categoria da despesa:'
            },
        ]
    },
    alimentacao: {
        nome: "Loja de Alimentação",
        cadastroDeProduto: [
            {
                id: 'nome',
                tipo: 'text',
                textoLabel: 'Informe o nome do produto:'
            },
            {
                id: 'categoria',
                tipo: 'select',
                options: [
                    { valor: '', texto: 'Selecione' },
                    { valor: 'bebidas', texto: 'Bebidas' },
                    { valor: 'frios', texto: 'Frios' },
                    { valor: 'padaria', texto: 'Padaria' },
                    { valor: 'mercearia', texto: 'Mercearia' },
                    { valor: 'hortifruti', texto: 'Hortifruti' }
                ],
                textoLabel: 'Selecione a categoria do produto:'
            },
            {
                id: 'marca',
                tipo: 'text',
                textoLabel: 'Informe a marca do produto:'
            },
            {
                id: 'pesoOuVolume',
                tipo: 'text',
                textoLabel: 'Informe o peso ou volume (ex: 1kg, 500ml):'
            },
            {
                id: 'quantidade',
                tipo: 'text',
                textoLabel: 'Informe a quantidade do produto:'
            },
            {
                id: 'precoUnitario',
                tipo: 'text',
                textoLabel: 'Informe o preço unitário:'
            },
            {
                id: 'precoUnitarioVenda',
                tipo: 'text',
                textoLabel: 'Informe o valor de venda:'
            },
            {
                id: 'validade',
                tipo: 'date',
                textoLabel: 'Data de validade:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data de cadastro:'
            },
        ],
        cadastroDeVenda: [
            {
                id: 'nomeProduto',
                tipo: 'text',
                textoLabel: 'Nome do produto vendido:'
            },
            {
                id: 'quantidadeVendida',
                tipo: 'text',
                textoLabel: 'Informe a quantidade vendida:'
            },
            {
                id: 'precoUnitario',
                tipo: 'text',
                textoLabel: 'Preço Unitário:'
            },
            {
                id: 'precoUnitarioVenda',
                tipo: 'text',
                textoLabel: 'Preço Unitário de Venda:'
            },
            {
                id: 'desconto',
                tipo: 'text',
                textoLabel: 'Desconto aplicado:'
            },
            {
                id: 'valorFinalDaVenda',
                tipo: 'text',
                textoLabel: 'Valor final da venda:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data da venda:'
            },
        ],
        cadastroDeDespesa: [
            {
                id: 'nome',
                tipo: 'text',
                textoLabel: 'Nome da despesa:'
            },
            {
                id: 'valorDaDespesa',
                tipo: 'text',
                textoLabel: 'Valor da despesa:'
            },
            {
                id: 'formaDePagamento',
                tipo: 'text',
                textoLabel: 'Forma de pagamento:'
            },
            {
                id: 'funcionarioQuePagou',
                tipo: 'text',
                textoLabel: 'Funcionário que realizou o pagamento:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data da despesa:'
            },
            {
                id: 'categoriaDaDespesa',
                tipo: 'select',
                options: [
                    { valor: '', texto: 'Selecione' },
                    { valor: 'fixo', texto: 'Fixo' },
                    { valor: 'variavel', texto: 'Variável' }
                ],
                textoLabel: 'Categoria da despesa:'
            },
        ]
    },
    papelaria: {
        nome: "Loja de Papelaria",
        cadastroDeProduto: [
            {
                id: 'nome',
                tipo: 'text',
                textoLabel: 'Informe o nome do produto:'
            },
            {
                id: 'categoria',
                tipo: 'select',
                options: [
                    { valor: '', texto: 'Selecione' },
                    { valor: 'cadernos', texto: 'Cadernos' },
                    { valor: 'canetas', texto: 'Canetas' },
                    { valor: 'mochilas', texto: 'Mochilas' },
                    { valor: 'papelaria', texto: 'Papelaria em geral' },
                    { valor: 'organizacao', texto: 'Organização' }
                ],
                textoLabel: 'Selecione a categoria do produto:'
            },
            {
                id: 'marca',
                tipo: 'text',
                textoLabel: 'Informe a marca do produto:'
            },
            {
                id: 'cor',
                tipo: 'text',
                textoLabel: 'Informe a cor (se aplicável):'
            },
            {
                id: 'quantidade',
                tipo: 'text',
                textoLabel: 'Informe a quantidade do produto:'
            },
            {
                id: 'precoUnitario',
                tipo: 'text',
                textoLabel: 'Informe o preço unitário:'
            },
            {
                id: 'precoUnitarioVenda',
                tipo: 'text',
                textoLabel: 'Informe o valor de venda:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data de cadastro:'
            },
        ],
        cadastroDeVenda: [
            {
                id: 'nomeProduto',
                tipo: 'text',
                textoLabel: 'Nome do produto vendido:'
            },
            {
                id: 'quantidadeVendida',
                tipo: 'text',
                textoLabel: 'Informe a quantidade vendida:'
            },
            {
                id: 'precoUnitario',
                tipo: 'text',
                textoLabel: 'Preço Unitário:'
            },
            {
                id: 'precoUnitarioVenda',
                tipo: 'text',
                textoLabel: 'Preço Unitário de Venda:'
            },
            {
                id: 'desconto',
                tipo: 'text',
                textoLabel: 'Desconto aplicado:'
            },
            {
                id: 'valorFinalDaVenda',
                tipo: 'text',
                textoLabel: 'Valor final da venda:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data da venda:'
            },
        ],
        cadastroDeDespesa: [
            {
                id: 'nome',
                tipo: 'text',
                textoLabel: 'Nome da despesa:'
            },
            {
                id: 'valorDaDespesa',
                tipo: 'text',
                textoLabel: 'Valor da despesa:'
            },
            {
                id: 'formaDePagamento',
                tipo: 'text',
                textoLabel: 'Forma de pagamento:'
            },
            {
                id: 'funcionarioQuePagou',
                tipo: 'text',
                textoLabel: 'Funcionário que realizou o pagamento:'
            },
            {
                id: 'data',
                tipo: 'date',
                textoLabel: 'Data da despesa:'
            },
            {
                id: 'categoriaDaDespesa',
                tipo: 'select',
                options: [
                    { valor: '', texto: 'Selecione' },
                    { valor: 'fixo', texto: 'Fixo' },
                    { valor: 'variavel', texto: 'Variável' }
                ],
                textoLabel: 'Categoria da despesa:'
            },
        ]
    },
};
