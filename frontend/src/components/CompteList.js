import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
    const [comptes, setComptes] = useState([]);
    const [selectedCompte, setSelectedCompte] = useState(null); // État pour le compte sélectionné pour modification
    const [formData, setFormData] = useState({ solde: '', dateCreation: '', type: '' }); // Formulaire de modification

    // Charger les comptes depuis l'API
    useEffect(() => {
        fetchComptes();
    }, []);

    const fetchComptes = () => {
        axios.get(`${API_BASE_URL}/comptes`)  // Utilisation correcte de backticks
            .then((response) => {
                setComptes(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des comptes:', error);
            });
    };

    // Gérer la suppression d'un compte
    const deleteCompte = (id) => {
        axios.delete(`${API_BASE_URL}/comptes/${id}`)  // Utilisation correcte de backticks
            .then(() => {
                fetchComptes(); // Recharger la liste après suppression
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression du compte:', error);
            });
    };

    // Gérer l'ouverture du formulaire de modification
    const handleEdit = (compte) => {
        setSelectedCompte(compte.id);
        setFormData({
            solde: compte.solde,
            dateCreation: compte.dateCreation,
            type: compte.type,
        });
    };

    // Gérer la soumission du formulaire de modification
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`${API_BASE_URL}/comptes/${selectedCompte}`, formData)  // Utilisation correcte de backticks
            .then(() => {
                setSelectedCompte(null);
                fetchComptes(); // Recharger la liste après modification
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour du compte:', error);
            });
    };

    // Gérer les modifications dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container mt-4">
            <h2>Liste des Comptes</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Solde</th>
                    <th>Date de Création</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {comptes.map((compte) => (
                    <tr key={compte.id}>
                        <td>{compte.id}</td>
                        <td>{compte.solde}</td>
                        <td>{compte.dateCreation}</td>
                        <td>{compte.type}</td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleEdit(compte)}
                            >
                                Modifier
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteCompte(compte.id)}
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Formulaire de modification */}
            {selectedCompte && (
                <div className="mt-4">
                    <h3>Modifier le Compte</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="form-label">Solde</label>
                            <input
                                type="number"
                                className="form-control"
                                name="solde"
                                value={formData.solde}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date de Création</label>
                            <input
                                type="date"
                                className="form-control"
                                name="dateCreation"
                                value={formData.dateCreation}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <input
                                type="text"
                                className="form-control"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Enregistrer</button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => setSelectedCompte(null)}
                        >
                            Annuler
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default CompteList;
