// Simuler des données d'utilisateurs
const users = [
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@example.com",
      telephone: "0123456789",
      statut: "actif",
      role: "admin"
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Sophie",
      email: "sophie.martin@example.com",
      telephone: "0987654321",
      statut: "inactif",
      role: "user"
    },
    // Ajoutez d'autres utilisateurs si nécessaire
  ];


  
  // Fonction pour afficher les utilisateurs dans le tableau
  function displayUsers() {
    const tableBody = document.getElementById("users-table-body");
    tableBody.innerHTML = ""; // Réinitialiser le contenu
    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.nom}</td>
        <td>${user.prenom}</td>
        <td>${user.email}</td>
        <td>${user.telephone}</td>
        <td>${user.statut}</td>
        <td>${user.role}</td>
        <td>
          <button class="btn btn-warning btn-edit" data-id="${user.id}">Modifier</button>
          <button class="btn btn-danger btn-delete" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#deleteUserModal">Supprimer</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Fonction pour ajouter un utilisateur
  document.getElementById("add-user-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Empêcher le rechargement de la page
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;
    const statut = document.getElementById("statut").value;
    const role = document.getElementById("role").value;
    
    const newUser = {
      id: users.length + 1,
      nom,
      prenom,
      email,
      telephone,
      statut,
      role
    };
    
    users.push(newUser); // Ajouter l'utilisateur à la liste
    displayUsers(); // Mettre à jour l'affichage
    $('#addUserModal').modal('hide'); // Fermer le modal
  });
  
  // Fonction pour ouvrir le modal de modification
  $(document).on("click", ".btn-edit", function() {
    const userId = $(this).data("id");
    const user = users.find(u => u.id === userId);
    
    // Remplir les champs du modal avec les données de l'utilisateur
    $("#edit-nom").val(user.nom);
    $("#edit-prenom").val(user.prenom);
    $("#edit-email").val(user.email);
    $("#edit-telephone").val(user.telephone);
    $("#edit-statut").val(user.statut);
    $("#edit-role").val(user.role);
    $("#edit-user-id").val(user.id);
    
    $("#editUserModal").modal("show"); // Afficher le modal
  });
  
  // Fonction pour modifier un utilisateur
  document.getElementById("edit-user-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById("edit-user-id").value);
    const user = users.find(u => u.id === id);
    
    user.nom = document.getElementById("edit-nom").value;
    user.prenom = document.getElementById("edit-prenom").value;
    user.email = document.getElementById("edit-email").value;
    user.telephone = document.getElementById("edit-telephone").value;
    user.statut = document.getElementById("edit-statut").value;
    user.role = document.getElementById("edit-role").value;
  
    displayUsers(); // Mettre à jour l'affichage
    $('#editUserModal').modal('hide'); // Fermer le modal
  });
  
  // Fonction pour gérer la confirmation de suppression
  let userToDeleteId = null;
  $(document).on("click", ".btn-delete", function() {
    userToDeleteId = $(this).data("id"); // Enregistrer l'ID de l'utilisateur à supprimer
  });
  
  // Fonction pour supprimer un utilisateur
  document.getElementById("confirm-delete").addEventListener("click", function() {
    const index = users.findIndex(u => u.id === userToDeleteId);
    if (index !== -1) {
      users.splice(index, 1); // Supprimer l'utilisateur
      displayUsers(); // Mettre à jour l'affichage
    }
    $('#deleteUserModal').modal('hide'); // Fermer le modal
  });
  
  // Appeler la fonction d'affichage des utilisateurs au chargement de la page
  document.addEventListener("DOMContentLoaded", displayUsers);
  
// Gérer le menu burger
const sidebarToggler = document.getElementById("sidebarCollapse");
const bodyWrapper = document.querySelector(".body-wrapper");

sidebarToggler.addEventListener("click", function() {
    // Basculer la classe 'toggled' pour afficher/masquer le menu
    bodyWrapper.classList.toggle("toggled");
});

// Fonction pour filtrer les données
$(document).ready(function() {
    $('#search-users').on('keyup', function() {
        // Get the value from the search input
        const query = $(this).val().toLowerCase();
        
        // Filter table rows based on the input
        $('#users-table-body tr').filter(function() {
            // Check if the row contains the search query
            $(this).toggle(
                $(this).text().toLowerCase().indexOf(query) > -1
            );
        });
    });
});
