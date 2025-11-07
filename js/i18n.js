/**
 * Internationalization (i18n)
 * Language detection and translations
 */

const i18n = {
    pt: {
        appTitle: '💰 Simulador de Aportes Periódicos',
        adjustInitial: 'Ajustar Aporte Inicial',
        adjustPrice: 'Ajustar Cotação Inicial',
        import: 'Importar Dados',
        export: 'Exportar Dados',
        addScenario: 'Adicionar Cenário',
        reset: 'Reiniciar Simulação',
        initialConfig: '⚙️ Configuração Inicial',
        initialInvestmentLabel: '💰 Aporte Inicial (investimento de entrada)',
        initialInvestmentHelper: 'Digite um valor inteiro positivo maior que zero',
        initialPriceLabel: '📊 Cotação Inicial do Ativo (preço por cota)',
        initialPriceHelper: 'Digite um valor decimal positivo',
        startSimulation: '✅ Iniciar Simulação',
        emptyState: 'Adicione cenários para visualizar a análise do portfolio',
        exportTitle: '💾 Escolha o Formato de Exportação',
        exportCsvTitle: 'Excel (CSV)',
        exportCsvDesc: 'Compatível com Excel, Google Sheets e outras planilhas',
        exportMdTitle: 'Markdown',
        exportMdDesc: 'Formato de texto para documentação e relatórios',
        cancel: 'Cancelar',
        addScenarioTitle: '➕ Adicionar Cenário de Aportes',
        scenarioPeriodsLabel: '📅 Quantos períodos (meses) deseja simular?',
        scenarioPeriodsHelper: 'Digite um número inteiro positivo',
        scenarioContributionLabel: '💵 Aporte Recorrente Mensal',
        scenarioContributionHelper: 'Deixe em branco para não realizar aportes neste período',
        scenarioVariationLabel: '📈 Variação da Cotação por Período',
        scenarioVariationHelper: 'Pode ser um valor positivo ou negativo',
        add: '✅ Adicionar',
        adjustInitialTitle: '💰 Ajustar Aporte Inicial',
        adjustInitialLabel: '💰 Novo Aporte Inicial',
        currentValue: 'Valor atual',
        update: '✅ Atualizar',
        adjustPriceTitle: '📊 Ajustar Cotação Inicial',
        adjustPriceLabel: '📊 Nova Cotação Inicial',
        currentPrice: 'Cotação atual',
        initialInvestment: 'Aporte Inicial',
        initialPrice: 'Cotação Inicial',
        balance: 'Saldo Patrimonial',
        capitalInvested: 'Capital Investido',
        shares: 'Cotas Acumuladas',
        profitability: 'Rentabilidade',
        period: 'Período',
        contribution: '💵 Aporte',
        price: '📊 Cotação',
        capital: '💰 Capital',
        quotas: '📈 Cotas',
        dataRestored: '📂 Dados restaurados com sucesso!',
        simulationStarted: '✅ Simulação iniciada com sucesso!',
        scenarioAdded: '✅ Cenário adicionado',
        periods: 'período(s)',
        initialAdjusted: '✅ Aporte inicial ajustado!',
        priceAdjusted: '✅ Cotação inicial ajustada!',
        simulationReset: '🧹 Simulação reiniciada!',
        csvExported: '📊 Arquivo CSV exportado com sucesso!',
        mdExported: '📝 Arquivo Markdown exportado com sucesso!',
        dataImported: '✅ Dados importados com sucesso!',
        errorInitSimulation: '⚠️ Inicie a simulação primeiro',
        errorAddScenarios: '⚠️ Adicione cenários antes de exportar',
        errorInitialInteger: '❌ O aporte inicial deve ser um número inteiro positivo!',
        errorInitialPositive: '❌ A cotação inicial deve ser um número positivo!',
        errorPeriodsInvalid: '❌ Quantidade de períodos inválida!',
        errorContributionInvalid: '❌ Valor de aporte inválido!',
        errorVariationInvalid: '❌ Variação da cotação inválida!',
        errorValueInvalid: '❌ Valor inválido!',
        errorImport: '❌ Erro ao importar arquivo',
        confirmReset: '🧹 Deseja realmente reiniciar a simulação? Todos os dados serão perdidos.',
        noValidDataCsv: 'Nenhum dado válido encontrado no arquivo CSV',
        noValidDataMd: 'Nenhum dado válido encontrado no arquivo Markdown',
        unsupportedFormat: 'Formato de arquivo não suportado'
    },
    en: {
        appTitle: '💰 Periodic Contributions Simulator',
        adjustInitial: 'Adjust Initial Investment',
        adjustPrice: 'Adjust Initial Price',
        import: 'Import Data',
        export: 'Export Data',
        addScenario: 'Add Scenario',
        reset: 'Reset Simulation',
        initialConfig: '⚙️ Initial Configuration',
        initialInvestmentLabel: '💰 Initial Investment (entry investment)',
        initialInvestmentHelper: 'Enter a positive integer value greater than zero',
        initialPriceLabel: '📊 Initial Asset Price (price per share)',
        initialPriceHelper: 'Enter a positive decimal value',
        startSimulation: '✅ Start Simulation',
        emptyState: 'Add scenarios to view portfolio analysis',
        exportTitle: '💾 Choose Export Format',
        exportCsvTitle: 'Excel (CSV)',
        exportCsvDesc: 'Compatible with Excel, Google Sheets and other spreadsheets',
        exportMdTitle: 'Markdown',
        exportMdDesc: 'Text format for documentation and reports',
        cancel: 'Cancel',
        addScenarioTitle: '➕ Add Contribution Scenario',
        scenarioPeriodsLabel: '📅 How many periods (months) do you want to simulate?',
        scenarioPeriodsHelper: 'Enter a positive integer',
        scenarioContributionLabel: '💵 Monthly Recurring Contribution',
        scenarioContributionHelper: 'Leave blank to not make contributions in this period',
        scenarioVariationLabel: '📈 Price Variation per Period',
        scenarioVariationHelper: 'Can be a positive or negative value',
        add: '✅ Add',
        adjustInitialTitle: '💰 Adjust Initial Investment',
        adjustInitialLabel: '💰 New Initial Investment',
        currentValue: 'Current value',
        update: '✅ Update',
        adjustPriceTitle: '📊 Adjust Initial Price',
        adjustPriceLabel: '📊 New Initial Price',
        currentPrice: 'Current price',
        initialInvestment: 'Initial Investment',
        initialPrice: 'Initial Price',
        balance: 'Net Worth',
        capitalInvested: 'Capital Invested',
        shares: 'Accumulated Shares',
        profitability: 'Profitability',
        period: 'Period',
        contribution: '💵 Contribution',
        price: '📊 Price',
        capital: '💰 Capital',
        quotas: '📈 Shares',
        dataRestored: '📂 Data restored successfully!',
        simulationStarted: '✅ Simulation started successfully!',
        scenarioAdded: '✅ Scenario added',
        periods: 'period(s)',
        initialAdjusted: '✅ Initial investment adjusted!',
        priceAdjusted: '✅ Initial price adjusted!',
        simulationReset: '🧹 Simulation reset!',
        csvExported: '📊 CSV file exported successfully!',
        mdExported: '📝 Markdown file exported successfully!',
        dataImported: '✅ Data imported successfully!',
        errorInitSimulation: '⚠️ Start the simulation first',
        errorAddScenarios: '⚠️ Add scenarios before exporting',
        errorInitialInteger: '❌ Initial investment must be a positive integer!',
        errorInitialPositive: '❌ Initial price must be a positive number!',
        errorPeriodsInvalid: '❌ Invalid number of periods!',
        errorContributionInvalid: '❌ Invalid contribution value!',
        errorVariationInvalid: '❌ Invalid price variation!',
        errorValueInvalid: '❌ Invalid value!',
        errorImport: '❌ Error importing file',
        confirmReset: '🧹 Do you really want to reset the simulation? All data will be lost.',
        noValidDataCsv: 'No valid data found in CSV file',
        noValidDataMd: 'No valid data found in Markdown file',
        unsupportedFormat: 'Unsupported file format'
    }
};

// Detect browser language
const browserLang = navigator.language || navigator.userLanguage;
const lang = browserLang.startsWith('pt') ? 'pt' : 'en';
const t = i18n[lang];

// Apply translations on load
function applyTranslations() {
    document.getElementById('app-title').textContent = t.appTitle;
    document.getElementById('btn-adjust-initial').title = t.adjustInitial;
    document.getElementById('btn-adjust-price').title = t.adjustPrice;
    document.getElementById('btn-import').title = t.import;
    document.getElementById('btn-export').title = t.export;
    document.getElementById('fab-add').title = t.addScenario;
    document.getElementById('fab-reset').title = t.reset;
    document.getElementById('initial-card-header').textContent = t.initialConfig;
    document.getElementById('label-initial-investment').textContent = t.initialInvestmentLabel;
    document.getElementById('helper-initial-investment').textContent = t.initialInvestmentHelper;
    document.getElementById('label-initial-price').textContent = t.initialPriceLabel;
    document.getElementById('helper-initial-price').textContent = t.initialPriceHelper;
    document.getElementById('btn-start-simulation').textContent = t.startSimulation;
    document.getElementById('empty-state-text').textContent = t.emptyState;
    document.getElementById('dialog-export-title').textContent = t.exportTitle;
    document.getElementById('export-csv-title').textContent = t.exportCsvTitle;
    document.getElementById('export-csv-desc').textContent = t.exportCsvDesc;
    document.getElementById('export-md-title').textContent = t.exportMdTitle;
    document.getElementById('export-md-desc').textContent = t.exportMdDesc;
    document.getElementById('btn-cancel-export').textContent = t.cancel;
    document.getElementById('dialog-add-scenario-title').textContent = t.addScenarioTitle;
    document.getElementById('label-scenario-periods').textContent = t.scenarioPeriodsLabel;
    document.getElementById('helper-scenario-periods').textContent = t.scenarioPeriodsHelper;
    document.getElementById('label-scenario-contribution').textContent = t.scenarioContributionLabel;
    document.getElementById('helper-scenario-contribution').textContent = t.scenarioContributionHelper;
    document.getElementById('label-scenario-variation').textContent = t.scenarioVariationLabel;
    document.getElementById('helper-scenario-variation').textContent = t.scenarioVariationHelper;
    document.getElementById('btn-cancel-scenario').textContent = t.cancel;
    document.getElementById('btn-submit-scenario').textContent = t.add;
    document.getElementById('dialog-adjust-initial-title').textContent = t.adjustInitialTitle;
    document.getElementById('label-adjust-initial').textContent = t.adjustInitialLabel;
    document.getElementById('btn-cancel-adjust-initial').textContent = t.cancel;
    document.getElementById('btn-submit-adjust-initial').textContent = t.update;
    document.getElementById('dialog-adjust-price-title').textContent = t.adjustPriceTitle;
    document.getElementById('label-adjust-price').textContent = t.adjustPriceLabel;
    document.getElementById('btn-cancel-adjust-price').textContent = t.cancel;
    document.getElementById('btn-submit-adjust-price').textContent = t.update;
}
