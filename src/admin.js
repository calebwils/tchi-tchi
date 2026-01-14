/**
 * Core Logic for Tchi Tchi Africa - Admin System
 */

const AdminApp = {
    init() {
        console.log("Admin Interface Initialized");
        this.loadStats();
        this.renderExpirationList();
    },

    /**
     * Simulation of data loading
     */
    loadStats() {
        // In a real app, this would fetch from an API
    },

    /**
     * Calculate expiration based on pick-up date and duration
     * @param {string} dateStr - YYYY-MM-DD
     * @param {number} durationMonths - 12, 18, 24
     */
    calculateExpiration(dateStr, durationMonths) {
        const date = new Date(dateStr);
        date.setMonth(date.getMonth() + durationMonths);
        return date;
    },

    /**
     * Get visual status based on expiration date
     */
    getExpirationStatus(expDate) {
        const now = new Date();
        const diffDays = Math.ceil((expDate - now) / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { label: 'Expiré', class: 'badge-danger' };
        if (diffDays <= 60) return { label: 'Expire bientôt', class: 'badge-warning' };
        return { label: 'Valide', class: 'badge-success' };
    }
};

document.addEventListener('DOMContentLoaded', () => AdminApp.init());
