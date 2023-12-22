// types.ts
export type DataItem = {
    annee_publication: string;
    code_departement: string;
    nom_departement: string;
    code_region: string;
    nom_region: string;
    nombre_d_habitants: number;
    densite_de_population_au_km2: number;
    variation_de_la_population_sur_10_ans_en: number;
    dont_contribution_du_solde_naturel_en: number;
    dont_contribution_du_solde_migratoire_en: number;
    population_de_moins_de_20_ans: number;
    population_de_60_ans_et_plus: number;
    taux_de_chomage_au_t4_en: number;
    taux_de_pauvrete_en: number;
    nombre_de_logements: number;
    nombre_de_residences_principales: number;
    taux_de_logements_sociaux_en: number;
    taux_de_logements_vacants_en: number;
    taux_de_logements_individuels_en: number;
    moyenne_annuelle_de_la_construction_neuve_sur_10_ans: number;
    construction: number;
    parc_social_nombre_de_logements: number;
    parc_social_logements_mis_en_location: number;
    parc_social_logements_demolis: number;
    parc_social_ventes_a_des_personnes_physiques: number;
    parc_social_taux_de_logements_vacants_en: number;
    parc_social_taux_de_logements_individuels_en: number;
    parc_social_loyer_moyen_en_eur_m2_mois: number;
    parc_social_age_moyen_du_parc_en_annees: number;
    parc_social_taux_de_logements_energivores_e_f_g_en: number;
  };
  