      // Simuler les données des pièces
      let pieces = [
        {
          id: 1,
          numero: "P123456789",
          nomProprietaire: "Dupont",
          prenomProprietaire: "Jean",
          sexe: "Masculin",
          type: "Passeport",
          dateAjout: "2024-04-01",
          statut: "Disponible",
        },
        {
          id: 2,
          numero: "C987654321",
          nomProprietaire: "Martin",
          prenomProprietaire: "Sophie",
          sexe: "Féminin",
          type: "Carte d'Identité",
          dateAjout: "2024-04-02",
          statut: "Expirée",
        },
        // ... autres pièces
      ];

      // Fonction pour afficher les pièces dans le tableau
      function displayPieces() {
        const tableBody = document.getElementById("pieces-table-body");
        tableBody.innerHTML = ""; // Vider le contenu précédent

        pieces.forEach((piece) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${piece.numero}</td>
                    <td>${piece.nomProprietaire}</td>
                    <td>${piece.prenomProprietaire}</td>
                    <td>${piece.sexe}</td>
                    <td>${piece.type}</td>
                    <td>${piece.dateAjout}</td>
                    <td>${piece.statut}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-3" onclick="openEditModal(${piece.id})">Modifier</button>
                        <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${piece.id})">Supprimer</button>
                    </td>
                `;
          tableBody.appendChild(row);
        });
      }

      // Fonction pour ajouter une nouvelle pièce
      function addPiece(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupérer les valeurs du formulaire
        const numero = document.getElementById("piece-numero").value.trim();
        const nomProprietaire = document
          .getElementById("piece-nomProprietaire")
          .value.trim();
        const prenomProprietaire = document
          .getElementById("piece-prenomProprietaire")
          .value.trim();
        const sexe = document.getElementById("piece-sexe").value;
        const type = document.getElementById("piece-type").value.trim();
        const statut = document.getElementById("piece-statut").value;

        // Validation simple (peut être améliorée)
        if (
          !numero ||
          !nomProprietaire ||
          !prenomProprietaire ||
          !type ||
          !statut
        ) {
          alert("Veuillez remplir tous les champs.");
          return;
        }

        // Vérifier si le numéro de pièce est unique
        const exists = pieces.some((piece) => piece.numero === numero);
        if (exists) {
          alert("Le numéro de la pièce existe déjà.");
          return;
        }

        // Créer un nouvel ID unique
        const id = pieces.length > 0 ? pieces[pieces.length - 1].id + 1 : 1;

        // Créer un nouvel objet pièce
        const newPiece = {
          id: id,
          numero: numero,
          nomProprietaire: nomProprietaire,
          prenomProprietaire: prenomProprietaire,
          sexe: sexe,
          type: type,
          dateAjout: new Date().toISOString().split("T")[0], // Date actuelle
          statut: statut,
        };

        // Ajouter la nouvelle pièce à la liste
        pieces.push(newPiece);

        // Réafficher les pièces
        displayPieces();

        // Réinitialiser le formulaire
        document.getElementById("add-piece-form").reset();

        // Fermer le modal
        const addModal = bootstrap.Modal.getInstance(
          document.getElementById("addPieceModal")
        );
        addModal.hide();
      }

      // Fonction pour ouvrir le modal de modification
      function openEditModal(id) {
        const piece = pieces.find((p) => p.id === id);
        if (piece) {
          document.getElementById("edit-piece-id").value = piece.id;
          document.getElementById("edit-piece-numero").value = piece.numero;
          document.getElementById("edit-piece-nomProprietaire").value =
            piece.nomProprietaire;
          document.getElementById("edit-piece-prenomProprietaire").value =
            piece.prenomProprietaire;
          document.getElementById("edit-piece-sexe").value = piece.sexe;
          document.getElementById("edit-piece-type").value = piece.type;
          document.getElementById("edit-piece-statut").value = piece.statut;

          const editModal = new bootstrap.Modal(
            document.getElementById("editPieceModal")
          );
          editModal.show();
        }
      }

      // Fonction pour modifier une pièce
      function editPiece(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const id = parseInt(document.getElementById("edit-piece-id").value);
        const numero = document
          .getElementById("edit-piece-numero")
          .value.trim();
        const nomProprietaire = document
          .getElementById("edit-piece-nomProprietaire")
          .value.trim();
        const prenomProprietaire = document
          .getElementById("edit-piece-prenomProprietaire")
          .value.trim();
        const sexe = document.getElementById("edit-piece-sexe").value;
        const type = document.getElementById("edit-piece-type").value.trim();
        const statut = document.getElementById("edit-piece-statut").value;

        // Validation simple (peut être améliorée)
        if (
          !numero ||
          !nomProprietaire ||
          !prenomProprietaire ||
          !type ||
          !statut
        ) {
          alert("Veuillez remplir tous les champs.");
          return;
        }

        // Vérifier si le numéro de pièce est unique (sauf pour la pièce en cours)
        const exists = pieces.some(
          (piece) => piece.numero === numero && piece.id !== id
        );
        if (exists) {
          alert("Le numéro de la pièce existe déjà.");
          return;
        }

        // Trouver l'index de la pièce à modifier
        const index = pieces.findIndex((p) => p.id === id);
        if (index !== -1) {
          // Mettre à jour les informations de la pièce
          pieces[index].numero = numero;
          pieces[index].nomProprietaire = nomProprietaire;
          pieces[index].prenomProprietaire = prenomProprietaire;
          pieces[index].sexe = sexe;
          pieces[index].type = type;
          pieces[index].statut = statut;

          // Réafficher les pièces
          displayPieces();

          // Fermer le modal
          const editModal = bootstrap.Modal.getInstance(
            document.getElementById("editPieceModal")
          );
          editModal.hide();
        }
      }

      // Fonction pour ouvrir le modal de suppression
      function openDeleteModal(id) {
        document.getElementById("delete-piece-id").value = id;
        const deleteModal = new bootstrap.Modal(
          document.getElementById("deletePieceModal")
        );
        deleteModal.show();
      }

      // Fonction pour supprimer une pièce
      function deletePiece() {
        const id = parseInt(document.getElementById("delete-piece-id").value);

        // Filtrer la pièce à supprimer
        pieces = pieces.filter((p) => p.id !== id);

        // Réafficher les pièces
        displayPieces();

        // Fermer le modal
        const deleteModal = bootstrap.Modal.getInstance(
          document.getElementById("deletePieceModal")
        );
        deleteModal.hide();
      }

      // Fonction pour rechercher des pièces
      function searchPieces() {
        const query = document
          .getElementById("search-pieces")
          .value.toLowerCase();
        const tableBody = document.getElementById("pieces-table-body");
        tableBody.innerHTML = ""; // Vider le contenu précédent

        const filteredPieces = pieces.filter(
          (piece) =>
            piece.numero.toLowerCase().includes(query) ||
            piece.nomProprietaire.toLowerCase().includes(query) ||
            piece.prenomProprietaire.toLowerCase().includes(query) ||
            piece.sexe.toLowerCase().includes(query) ||
            piece.type.toLowerCase().includes(query) ||
            piece.statut.toLowerCase().includes(query)
        );

        filteredPieces.forEach((piece) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${piece.numero}</td>
                    <td>${piece.nomProprietaire}</td>
                    <td>${piece.prenomProprietaire}</td>
                    <td>${piece.sexe}</td>
                    <td>${piece.type}</td>
                    <td>${piece.dateAjout}</td>
                    <td>${piece.statut}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-3" onclick="openEditModal(${piece.id})">Modifier</button>
                        <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${piece.id})">Supprimer</button>
                    </td>
                `;
          tableBody.appendChild(row);
        });
      }

      // Charger les pièces lors du chargement de la page
      document.addEventListener("DOMContentLoaded", displayPieces);

      // Écouter l'événement de soumission du formulaire d'ajout
      document
        .getElementById("add-piece-form")
        .addEventListener("submit", addPiece);

      // Écouter l'événement de soumission du formulaire de modification
      document
        .getElementById("edit-piece-form")
        .addEventListener("submit", editPiece);

      // Écouter l'événement de clic sur le bouton de suppression
      document
        .getElementById("confirm-delete-piece")
        .addEventListener("click", deletePiece);