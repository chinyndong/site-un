
    $(document).ready(function() {
        // Tableau pour stocker les utilisateurs
        let users = [];
        let userId = 0; // Compteur pour attribuer un ID unique à chaque utilisateur

        // Fonction pour rafraîchir le tableau des utilisateurs
        function refreshUserTable() {
            const $tbody = $('#userTableBody');
            $tbody.empty(); // Vider le tableau avant de le remplir

            users.forEach(user => {
                const userRow = `
                    <tr data-id="${user.id}">
                        <td>${user.nom}</td>
                        <td>${user.prenom}</td>
                        <td>${user.email}</td>
                        <td>${user.telephone}</td>
                        <td>
                            <button class="btn btn-secondary btn-sm edit-user" data-id="${user.id}" data-toggle="modal" data-target="#editUserModal">Modifier</button>
                            <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}" data-toggle="modal" data-target="#deleteUserModal">Supprimer</button>
                        </td>
                    </tr>
                `;
                $tbody.append(userRow);
            });
        }

        // Gestionnaire de soumission du formulaire d'ajout d'utilisateur
        $('#addUserForm').submit(function(event) {
            event.preventDefault(); // Empêcher le rechargement de la page

            // Récupérer les valeurs du formulaire
            const nom = $('#nom').val().trim();
            const prenom = $('#prenom').val().trim();
            const email = $('#email').val().trim();
            const telephone = $('#telephone').val().trim();

            // Valider les champs (déjà en partie géré par les attributs 'required')

            // Créer un nouvel utilisateur
            const newUser = {
                id: ++userId,
                nom: nom,
                prenom: prenom,
                email: email,
                telephone: telephone
            };

            // Ajouter l'utilisateur au tableau
            users.push(newUser);

            // Rafraîchir le tableau
            refreshUserTable();

            // Réinitialiser le formulaire
            $('#addUserForm')[0].reset();

            // Fermer la modale
            $('#addUserModal').modal('hide');
        });

        // Gestionnaire de clic sur le bouton Modifier
        $(document).on('click', '.edit-user', function() {
            const id = $(this).data('id');
            const user = users.find(u => u.id === id);

            if (user) {
                // Remplir le formulaire de modification avec les données de l'utilisateur
                $('#editUserId').val(user.id);
                $('#editNom').val(user.nom);
                $('#editPrenom').val(user.prenom);
                $('#editEmail').val(user.email);
                $('#editTelephone').val(user.telephone);
            }
        });

        // Gestionnaire de soumission du formulaire de modification d'utilisateur
        $('#editUserForm').submit(function(event) {
            event.preventDefault(); // Empêcher le rechargement de la page

            // Récupérer les valeurs du formulaire
            const id = parseInt($('#editUserId').val());
            const nom = $('#editNom').val().trim();
            const prenom = $('#editPrenom').val().trim();
            const email = $('#editEmail').val().trim();
            const telephone = $('#editTelephone').val().trim();

            // Trouver l'utilisateur à modifier
            const userIndex = users.findIndex(u => u.id === id);
            if (userIndex !== -1) {
                // Mettre à jour les informations de l'utilisateur
                users[userIndex].nom = nom;
                users[userIndex].prenom = prenom;
                users[userIndex].email = email;
                users[userIndex].telephone = telephone;

                // Rafraîchir le tableau
                refreshUserTable();

                // Fermer la modale
                $('#editUserModal').modal('hide');
            }
        });

        // Variable pour stocker l'ID de l'utilisateur à supprimer
        let deleteUserId = null;

        // Gestionnaire de clic sur le bouton Supprimer
        $(document).on('click', '.delete-user', function() {
            deleteUserId = $(this).data('id');
        });

        // Gestionnaire de confirmation de suppression
        $('#confirmDelete').click(function() {
            if (deleteUserId !== null) {
                // Filtrer le tableau pour supprimer l'utilisateur
                users = users.filter(u => u.id !== deleteUserId);

                // Rafraîchir le tableau
                refreshUserTable();

                // Réinitialiser l'ID de suppression
                deleteUserId = null;

                // Fermer la modale
                $('#deleteUserModal').modal('hide');
            }
        });

        // Optionnel : Pré-remplir avec quelques utilisateurs pour tester
        /*
        users.push({id: ++userId, nom: 'Doe', prenom: 'John', email: 'john.doe@example.com', telephone: '0123456789'});
        users.push({id: ++userId, nom: 'Smith', prenom: 'Jane', email: 'jane.smith@example.com', telephone: '0987654321'});
        refreshUserTable();
        */
    });

