/**
 * LocalStorage Manager
 * Handles data persistence
 */

const storage = {
    STORAGE_KEY: 'aportes-periodicos-data',

    save(state) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
            console.log('✅ Dados salvos no localStorage');
        } catch (error) {
            console.error('❌ Erro ao salvar dados:', error);
        }
    },

    load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const state = JSON.parse(data);
                console.log('✅ Dados carregados do localStorage');
                return state;
            }
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);
        }
        return null;
    },

    clear() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            console.log('✅ Dados removidos do localStorage');
        } catch (error) {
            console.error('❌ Erro ao limpar dados:', error);
        }
    }
};
