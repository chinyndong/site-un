      // Simuler les données d'abonnement
      const subscriptions = [
        {
          type: "Mensuel",
          prix: "30€",
          durée: "1 mois",
          dateDebut: "2024-01-01",
          dateFin: "2024-01-31",
          statut: "Actif",
        },
        {
          type: "Annuel",
          prix: "300€",
          durée: "12 mois",
          dateDebut: "2024-02-01",
          dateFin: "2025-01-31",
          statut: "Inactif",
        },
      ];

      // Fonction pour afficher les abonnements dans le tableau
      function displaySubscriptions() {
        const tableBody = document.getElementById("subscriptions-table-body");
        tableBody.innerHTML = ""; // Vider le contenu précédent

        subscriptions.forEach((subscription, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${subscription.type}</td>
                    <td>${subscription.prix}</td>
                    <td>${subscription.durée}</td>
                    <td>${subscription.dateDebut}</td>
                    <td>${subscription.dateFin}</td>
                    <td>${subscription.statut}</td>
                    <td>
                        <button class="btn btn-primary" onclick="renewSubscription(${index})">Renouveler</button>
                    </td>
                `;
          tableBody.appendChild(row);
        });
      }

      // Fonction pour renouveler un abonnement (simulée)
      function renewSubscription(index) {
        alert(`Renouvellement de l'abonnement: ${subscriptions[index].type}`);
      }

      // Fonction pour ajouter un nouvel abonnement
      function addSubscription(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupérer les valeurs du formulaire
        const subscriptionType =
          document.getElementById("subscription-type").value;
        const prix = document.getElementById("price").value;
        const durée = document.getElementById("duration").value;
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;

        // Créer un nouvel abonnement
        const newSubscription = {
          type: subscriptionType,
          prix: prix,
          durée: durée,
          dateDebut: startDate,
          dateFin: endDate,
          statut: "Actif", // Statut par défaut lors de l'ajout
        };

        // Ajouter le nouvel abonnement à la liste
        subscriptions.push(newSubscription);

        // Réafficher les abonnements
        displaySubscriptions();

        // Réinitialiser le formulaire
        document.getElementById("add-subscription-form").reset();
        // Fermer le modal
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("addSubscriptionModal")
        );
        modal.hide();
      }

      // Charger les abonnements lors du chargement de la page
      document.addEventListener("DOMContentLoaded", displaySubscriptions);

      // Écouter l'événement de soumission du formulaire
      document
        .getElementById("add-subscription-form")
        .addEventListener("submit", addSubscription);