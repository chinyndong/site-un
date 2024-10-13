
  // Simuler le rôle de l'utilisateur
  const userRole = "admin"; // Changez en 'user' pour masquer les éléments administrateur

  // Afficher ou masquer les éléments admin-only
  if (userRole !== "admin") {
    document.querySelectorAll(".admin-only").forEach((el) => (el.style.display = "none"));
  } else {
    document.querySelectorAll(".admin-only").forEach((el) => (el.style.display = "block"));
  }

  // Liste des sites (simulée ici)
  let sites = [
    {
      id: 1,
      nom: "Site Paris",
      email: "jean.dupont@paris-site.com",
      telephone: "01 23 45 67 89",
      adresse: "123 Rue de la République, Paris, 75001",
      statut: "actif",
    },
    {
      id: 2,
      nom: "Site Lyon",
      email: "marie.curie@lyon-site.com",
      telephone: "04 56 78 90 12",
      adresse: "456 Avenue des Champs, Lyon, 69001",
      statut: "actif",
    },
    // Ajoutez d'autres sites ici
  ];

  // Fonction pour afficher les sites dans la table
  function displaySites(filteredSites = sites) {
    const tableBody = document.getElementById("sites-table-body");
    tableBody.innerHTML = "";
    filteredSites.forEach((site) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${site.nom}</td>
          <td>${site.email}</td>
          <td>${site.telephone}</td>
          <td>${site.adresse}</td>
          <td>${site.statut.charAt(0).toUpperCase() + site.statut.slice(1)}</td>
          <td>
              <button class="btn btn-primary btn-sm me-2" onclick="editSite(${site.id})">
                  <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteSite(${site.id})">
                  <i class="fas fa-trash"></i>
              </button>
          </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Initialiser l'affichage des sites
  displaySites();

  // Ajouter un nouveau site
  document.getElementById("add-site-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const newSite = {
      id: sites.length ? sites[sites.length - 1].id + 1 : 1,
      nom: document.getElementById("site-nom").value,
      email: document.getElementById("site-email").value,
      telephone: document.getElementById("site-telephone").value,
      adresse: document.getElementById("site-adresse").value,
      statut: document.getElementById("site-statuts").value,
    };
    sites.push(newSite);
    displaySites();
    // Réinitialiser le formulaire
    this.reset();
    // Fermer le modal
    const addSiteModal = bootstrap.Modal.getInstance(document.getElementById("addSiteModal"));
    addSiteModal.hide();
  });

  // Modifier un site
  function editSite(id) {
    const site = sites.find((s) => s.id === id);
    if (site) {
      document.getElementById("edit-site-id").value = site.id;
      document.getElementById("edit-site-nom").value = site.nom;
      document.getElementById("edit-site-email").value = site.email;
      document.getElementById("edit-site-telephone").value = site.telephone;
      document.getElementById("edit-site-adresse").value = site.adresse;
      document.getElementById("edit-site-statuts").value = site.statut;
      // Ouvrir le modal d'édition
      const editSiteModal = new bootstrap.Modal(document.getElementById("editSiteModal"));
      editSiteModal.show();
    }
  }

  // Enregistrer les modifications d'un site
  document.getElementById("edit-site-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = parseInt(document.getElementById("edit-site-id").value);
    const siteIndex = sites.findIndex((s) => s.id === id);
    if (siteIndex !== -1) {
      sites[siteIndex] = {
        id: id,
        nom: document.getElementById("edit-site-nom").value,
        email: document.getElementById("edit-site-email").value,
        telephone: document.getElementById("edit-site-telephone").value,
        adresse: document.getElementById("edit-site-adresse").value,
        statut: document.getElementById("edit-site-statuts").value,
      };
      displaySites();
      // Réinitialiser le formulaire
      this.reset();
      // Fermer le modal
      const editSiteModal = bootstrap.Modal.getInstance(document.getElementById("editSiteModal"));
      editSiteModal.hide();
    }
  });

  // Supprimer un site
  function deleteSite(id) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce site ? Cette action est irréversible.")) {
      sites = sites.filter((s) => s.id !== id);
      displaySites();
    }
  }

  // Fonction de recherche
  document.getElementById("search-sites").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredSites = sites.filter(
      (site) =>
        site.nom.toLowerCase().includes(searchTerm) ||
        site.email.toLowerCase().includes(searchTerm) ||
        site.telephone.toLowerCase().includes(searchTerm) ||
        site.adresse.toLowerCase().includes(searchTerm) ||
        site.statut.toLowerCase().includes(searchTerm)
    );
    displaySites(filteredSites);
  });

