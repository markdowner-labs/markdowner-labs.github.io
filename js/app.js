/**
 * Main Application Logic
 * Handles all UI interactions and state management
 */

const app = {
    state: {
        X: null,
        I: null,
        lineBlocks: [],
        isInitialized: false
    },

    init() {
        applyTranslations();

        const savedState = storage.load();
        if (savedState && savedState.isInitialized) {
            this.state = savedState;
            this.restoreState();
            this.showSnackbar(t.dataRestored, 'success');
        }

        this.setupEventListeners();
    },

    setupEventListeners() {
        // Close dialogs on overlay click
        document.querySelectorAll('.dialog-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closeDialog(overlay.id);
                }
            });
        });

        // Hide FABs initially
        if (!this.state.isInitialized) {
            document.getElementById('fab-container').style.display = 'none';
        }
    },

    restoreState() {
        if (this.state.isInitialized) {
            document.getElementById('initial-screen').classList.add('hidden');
            document.getElementById('main-screen').classList.remove('hidden');
            document.getElementById('fab-container').style.display = 'flex';
            this.updatePreview();
        }
    },

    saveState() {
        storage.save(this.state);
    },

    togglePeriodCard(index) {
        const card = document.getElementById(`period-card-${index}`);
        if (card) {
            card.classList.toggle('expanded');
        }
    },

    showExportDialog() {
        if (!this.state.isInitialized) {
            this.showSnackbar(t.errorInitSimulation, 'error');
            return;
        }

        if (this.state.lineBlocks.length === 0) {
            this.showSnackbar(t.errorAddScenarios, 'error');
            return;
        }

        this.openDialog('dialog-export');
    },

    exportAsExcel() {
        const table = calculator.calculateTable(this.state.X, this.state.I, this.state.lineBlocks);

        let csv = 'Período;Aporte Mensal;Preço do Ativo;Capital Acumulado;Quantidade de Cotas;Saldo Patrimonial\n';

        table.forEach((line, index) => {
            const [a, b, c, d, e] = line;
            csv += `${index + 1};${a.toFixed(2).replace('.', ',')};${b.toFixed(2).replace('.', ',')};${c.toFixed(2).replace('.', ',')};${d.toFixed(6).replace('.', ',')};${e.toFixed(2).replace('.', ',')}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio_investimentos.csv';
        a.click();
        URL.revokeObjectURL(url);

        this.closeDialog('dialog-export');
        this.showSnackbar(t.csvExported, 'success');
    },

    exportAsMarkdown() {
        const table = calculator.calculateTable(this.state.X, this.state.I, this.state.lineBlocks);
        let markdown = '# Análise de Portfolio - Estratégia de Aportes Periódicos\n\n';
        markdown += '| Período | Aporte Mensal | Preço do Ativo | Capital Acumulado | Quantidade de Cotas | Saldo Patrimonial |\n';
        markdown += '|---------|---------------|----------------|-------------------|---------------------|-------------------|\n';

        table.forEach((line, index) => {
            const [a, b, c, d, e] = line;
            markdown += `| ${index + 1} | ${formatCurrency(a)} | ${formatCurrency(b)} | ${formatCurrency(c)} | ${formatDecimal(d, 6)} | ${formatCurrency(e)} |\n`;
        });

        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio_investimentos.md';
        a.click();
        URL.revokeObjectURL(url);

        this.closeDialog('dialog-export');
        this.showSnackbar(t.mdExported, 'success');
    },

    importData() {
        document.getElementById('file-import').click();
    },

    handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target.result;

                if (fileExtension === 'csv') {
                    this.parseCSV(content);
                } else if (fileExtension === 'md' || fileExtension === 'markdown') {
                    this.parseMarkdown(content);
                } else {
                    throw new Error(t.unsupportedFormat);
                }
            } catch (error) {
                this.showSnackbar(`${t.errorImport}: ${error.message}`, 'error');
            }
        };

        reader.readAsText(file);
        event.target.value = '';
    },

    parseCSV(csv) {
        const lines = csv.split('\n');
        const tableData = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const cells = line.split(';');
            if (cells.length === 6) {
                tableData.push({
                    period: parseInt(cells[0]),
                    aporte: parseFloat(cells[1].replace(',', '.')),
                    preco: parseFloat(cells[2].replace(',', '.')),
                    capital: parseFloat(cells[3].replace(',', '.')),
                    cotas: parseFloat(cells[4].replace(',', '.')),
                    saldo: parseFloat(cells[5].replace(',', '.'))
                });
            }
        }

        if (tableData.length === 0) {
            throw new Error(t.noValidDataCsv);
        }

        this.reconstructStateFromTable(tableData);
    },

    parseMarkdown(markdown) {
        const lines = markdown.split('\n');
        const tableData = [];

        let inTable = false;
        for (const line of lines) {
            if (line.startsWith('|---')) {
                inTable = true;
                continue;
            }
            if (inTable && line.startsWith('|')) {
                const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
                if (cells.length === 6) {
                    tableData.push({
                        period: parseInt(cells[0]),
                        aporte: parseCurrency(cells[1]),
                        preco: parseCurrency(cells[2]),
                        capital: parseCurrency(cells[3]),
                        cotas: parseDecimal(cells[4]),
                        saldo: parseCurrency(cells[5])
                    });
                }
            }
        }

        if (tableData.length === 0) {
            throw new Error(t.noValidDataMd);
        }

        this.reconstructStateFromTable(tableData);
    },

    reconstructStateFromTable(tableData) {
        const { X, I, lineBlocks } = calculator.reconstructStateFromTable(tableData);

        this.state.X = X;
        this.state.I = I;
        this.state.lineBlocks = lineBlocks;
        this.state.isInitialized = true;

        document.getElementById('initial-screen').classList.add('hidden');
        document.getElementById('main-screen').classList.remove('hidden');
        document.getElementById('fab-container').style.display = 'flex';

        this.updatePreview();
        this.saveState();
        this.showSnackbar(t.dataImported, 'success');
    },

    initializeSimulation(event) {
        event.preventDefault();

        const X = parseFloat(document.getElementById('initial-investment').value);
        const I = parseFloat(document.getElementById('initial-price').value);

        if (!X || X <= 0 || !Number.isInteger(X)) {
            this.showSnackbar(t.errorInitialInteger, 'error');
            return;
        }

        if (!I || I <= 0) {
            this.showSnackbar(t.errorInitialPositive, 'error');
            return;
        }

        this.state.X = X;
        this.state.I = I;
        this.state.lineBlocks = [];
        this.state.isInitialized = true;

        document.getElementById('initial-screen').classList.add('hidden');
        document.getElementById('main-screen').classList.remove('hidden');
        document.getElementById('fab-container').style.display = 'flex';

        this.updatePreview();
        this.saveState();
        this.showSnackbar(t.simulationStarted, 'success');
    },

    updatePreview() {
        const previewContent = document.getElementById('preview-content');

        if (this.state.lineBlocks.length === 0) {
            previewContent.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📊</div>
                    <div class="empty-state-text">${t.emptyState}</div>
                </div>
            `;
            return;
        }

        const table = calculator.calculateTable(this.state.X, this.state.I, this.state.lineBlocks);
        this.renderCardsView(table, previewContent);
    },

    renderCardsView(table, container) {
        const lastPeriod = table[table.length - 1];

        const totalInvested = lastPeriod[2];
        const totalShares = lastPeriod[3];
        const currentValue = lastPeriod[4];
        const profitLoss = currentValue;
        const profitPercentage = (profitLoss / totalInvested) * 100;

        let html = `
            <div class="summary-grid">
                <div class="summary-card info">
                    <div class="summary-icon">💰</div>
                    <div class="summary-label">${t.initialInvestment}</div>
                    <div class="summary-value">${formatCurrency(this.state.X)}</div>
                </div>
                <div class="summary-card accent">
                    <div class="summary-icon">📊</div>
                    <div class="summary-label">${t.initialPrice}</div>
                    <div class="summary-value">${formatCurrency(this.state.I)}</div>
                </div>
                <div class="summary-card ${profitLoss >= 0 ? 'success' : 'error'}">
                    <div class="summary-icon">${profitLoss >= 0 ? '📈' : '📉'}</div>
                    <div class="summary-label">${t.balance}</div>
                    <div class="summary-value">${formatCurrency(currentValue)}</div>
                </div>
                <div class="summary-card">
                    <div class="summary-icon">💎</div>
                    <div class="summary-label">${t.capitalInvested}</div>
                    <div class="summary-value">${formatCurrency(totalInvested)}</div>
                </div>
                <div class="summary-card warning">
                    <div class="summary-icon">📊</div>
                    <div class="summary-label">${t.shares}</div>
                    <div class="summary-value">${formatDecimal(totalShares, 2)}</div>
                </div>
                <div class="summary-card ${profitPercentage >= 0 ? 'success' : 'error'}">
                    <div class="summary-icon">${profitPercentage >= 0 ? '✅' : '❌'}</div>
                    <div class="summary-label">${t.profitability}</div>
                    <div class="summary-value">${profitPercentage >= 0 ? '+' : ''}${profitPercentage.toFixed(2)}%</div>
                </div>
            </div>
            <div class="period-cards-container">
        `;

        table.forEach((line, periodIndex) => {
            const [a, b, c, d, e] = line;
            const valueClass = e >= 0 ? 'positive' : 'negative';

            html += `
                <div class="period-card" id="period-card-${periodIndex}" onclick="app.togglePeriodCard(${periodIndex})">
                    <div class="period-card-header">
                        <div>
                            <span class="period-badge">${t.period} ${periodIndex + 1}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <span class="period-value ${valueClass}">${formatCurrency(e)}</span>
                            <span class="expand-icon">▼</span>
                        </div>
                    </div>
                    <div class="period-card-details">
                        <div class="detail-item">
                            <span class="detail-label">${t.contribution}</span>
                            <span class="detail-value">${formatCurrency(a)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">${t.price}</span>
                            <span class="detail-value">${formatCurrency(b)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">${t.capital}</span>
                            <span class="detail-value">${formatCurrency(c)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">${t.quotas}</span>
                            <span class="detail-value">${formatDecimal(d, 4)}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;
    },

    showAddScenarioDialog() {
        document.getElementById('form-add-scenario').reset();
        this.openDialog('dialog-add-scenario');
    },

    submitAddScenario(event) {
        event.preventDefault();

        const quantity = parseInt(document.getElementById('scenario-periods').value);
        const contributionValue = document.getElementById('scenario-contribution').value;
        const Y = contributionValue === '' ? null : parseFloat(contributionValue);
        const J = parseFloat(document.getElementById('scenario-variation').value);

        if (isNaN(quantity) || quantity <= 0) {
            this.showSnackbar(t.errorPeriodsInvalid, 'error');
            return;
        }

        if (contributionValue !== '' && (isNaN(Y) || Y === null)) {
            this.showSnackbar(t.errorContributionInvalid, 'error');
            return;
        }

        if (isNaN(J)) {
            this.showSnackbar(t.errorVariationInvalid, 'error');
            return;
        }

        this.state.lineBlocks.push([Y, J, quantity]);
        this.closeDialog('dialog-add-scenario');
        this.updatePreview();
        this.saveState();
        this.showSnackbar(`${t.scenarioAdded}: ${quantity} ${t.periods}`, 'success');
    },

    showAdjustInitialDialog() {
        if (!this.state.isInitialized) {
            this.showSnackbar(t.errorInitSimulation, 'error');
            return;
        }

        document.getElementById('adjust-initial-value').value = this.state.X;
        document.getElementById('adjust-initial-current').textContent =
            `${t.currentValue}: ${formatCurrency(this.state.X)}`;
        this.openDialog('dialog-adjust-initial');
    },

    submitAdjustInitial(event) {
        event.preventDefault();

        const newX = parseFloat(document.getElementById('adjust-initial-value').value);

        if (isNaN(newX) || newX <= 0 || !Number.isInteger(newX)) {
            this.showSnackbar(t.errorValueInvalid, 'error');
            return;
        }

        this.state.X = newX;
        this.closeDialog('dialog-adjust-initial');
        this.updatePreview();
        this.saveState();
        this.showSnackbar(t.initialAdjusted, 'success');
    },

    showAdjustPriceDialog() {
        if (!this.state.isInitialized) {
            this.showSnackbar(t.errorInitSimulation, 'error');
            return;
        }

        document.getElementById('adjust-price-value').value = this.state.I;
        document.getElementById('adjust-price-current').textContent =
            `${t.currentPrice}: ${formatCurrency(this.state.I)}`;
        this.openDialog('dialog-adjust-price');
    },

    submitAdjustPrice(event) {
        event.preventDefault();

        const newI = parseFloat(document.getElementById('adjust-price-value').value);

        if (isNaN(newI) || newI <= 0) {
            this.showSnackbar(t.errorValueInvalid, 'error');
            return;
        }

        this.state.I = newI;
        this.closeDialog('dialog-adjust-price');
        this.updatePreview();
        this.saveState();
        this.showSnackbar(t.priceAdjusted, 'success');
    },

    resetSimulation() {
        if (!confirm(t.confirmReset)) {
            return;
        }

        this.state.X = null;
        this.state.I = null;
        this.state.lineBlocks = [];
        this.state.isInitialized = false;

        document.getElementById('initial-form').reset();
        document.getElementById('initial-screen').classList.remove('hidden');
        document.getElementById('main-screen').classList.add('hidden');
        document.getElementById('fab-container').style.display = 'none';

        storage.clear();
        this.showSnackbar(t.simulationReset, 'success');
    },

    openDialog(dialogId) {
        document.getElementById(dialogId).classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeDialog(dialogId) {
        document.getElementById(dialogId).classList.remove('active');
        document.body.style.overflow = 'auto';
    },

    showSnackbar(message, type = 'success') {
        const snackbar = document.getElementById('snackbar');
        snackbar.textContent = message;
        snackbar.className = `snackbar ${type}`;
        snackbar.classList.add('show');

        setTimeout(() => {
            snackbar.classList.remove('show');
        }, 3000);
    }
};

// Initialize app on page load
window.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Install prompt for PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installBtn = document.createElement('button');
    installBtn.className = 'icon-button';
    installBtn.innerHTML = '📲';
    installBtn.title = lang === 'pt' ? 'Instalar App' : 'Install App';
    installBtn.onclick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            deferredPrompt = null;
            installBtn.remove();
        }
    };
    document.querySelector('.app-bar-actions').prepend(installBtn);
});
